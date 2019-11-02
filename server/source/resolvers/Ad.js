// ----------------------------------------------------------------------------------//
// Ad Resolver | Apollo Graph
// Apollo V2
// David Michael Hogan | November 1, 2019 | Updated:
// ----------------------------------------------------------------------------------//

import Sequelize, { Model } from "sequelize";
import {
  errorHandler,
  errorSender
} from "./utils.js";

const Op = Sequelize.Op;

const Ad = {
  Query: {
    ad: async (parent, { id }, { dataSources: { Ad } }) => {
      if (id) {
        return await Ad.findAll({ where: { id } });
      }
      return await Ad.findAll();
    },
    ads: async (parent, { input }, { dataSources: { Ad, Category, Geo } }) => {
      try {
        const { category: CategoryId, geo: GeoId, campaign: CampaignId, ...data } = input;
        if (CampaignId) data.CampaignId = CampaignId;

        const include = [];
        if (CategoryId) {
          include.push({
            model: Category,
            through: { where: { CategoryId } },
            required: true
          });
        }
        if (GeoId) {
          include.push({
            model: Geo,
            through: { where: { GeoId } },
            required: true
          });
        }

        const result = await Ad.findAll({
          where: {
            [Op.and]: { ...data }
          },
          include
        });
        errorHandler(!result, input, "COULD NOT FIND AD");
        return result;
      } catch (error) {
        errorSender(error);
      }
    }
  },

  Mutation: {
    displayAd: async (
      parent,
      { input },
      { dataSources: { Ad, Campaign, Category, Geo, Event } }
    ) => {
      const { category: CategoryId, geo: GeoId, site: SiteId } = input;
      const date = new Date();
      try {
        // FIND AD
        const ad = await Ad.findOne({
          include: [
            {
              model: Campaign,
              where: {
                isActive: true,
                startDate: { [Op.lte]: date },
                endDate: { [Op.gte]: date },
                deliveryDate: { [Op.lte]: date }
              },
              required: true
            },
            {
              model: Category,
              through: { where: { CategoryId } },
              required: true
            },
            {
              model: Geo,
              through: { where: { GeoId } },
              required: true
            }
          ]
        });
        errorHandler(!ad, input, "NO AD FOUND");

        // update Delivery Date
        const {
          id,
          cost,
          cpm,
          startDate,
          endDate,
          deliveryDate,
          balance
        } = ad.Campaign;

        const campaignAds = cost / cpm;
        const campaignTime = endDate.getTime() - startDate.getTime();
        const displayInterval = campaignTime / campaignAds;
        const newDeliveryDate = new Date(
          deliveryDate.getTime() + displayInterval
        );

        const newBalance = balance - (cpm / 1000);

        const updateDeliveryDate = await Campaign.update(
          { deliveryDate: newDeliveryDate, balance: newBalance },
          { where: { id } }
        );

        errorHandler(
          updateDeliveryDate[0] < 1,
          input,
          "COULD NOT UPDATE DELIVERY DATE"
        );

        // create event
        const data = {};
        data.type = "IMPRESSION"
        data.date = date;
        data.AdId = ad.id;
        if (SiteId) data.SiteId = SiteId;
        data.data = {};
        const createEvent = await Event.create(data);

        errorHandler(
          createEvent[0] < 1,
          data,
          "COULD NOT CREATE EVENT IN DISPLAYAD"
        );

        return ad;
      } catch (error) {
        errorSender(error);
      }
    },
    updateAd: async (
      parent,
      { id, input },
      { dataSources: { Ad, Campaign, Category, Geo } }
    ) => {
      try {
        const {
          categories,
          geos,
          campaign,
          ...update
        } = input;

        const data = {};
        if (categories) data.setCategories = categories;
        if (geos) data.setGeos = geos;
        if (campaign) data.setCampaign = campaign;
        if (update) data.update = update;
        errorHandler(Object.entries(data).length === 0, input, "NO INPUT GIVEN");

        const ad = await Ad.findOne({
          where: { id },
          include: [{ model: Campaign }],
          include: [{ model: Category }],
          include: [{ model: Geo }]
        });

        const result = await Promise.all(Object.getOwnPropertyNames(data).map(async key => {
          return await ad[key](data[key]);
        }));
        errorHandler(result.length === 0, input, "SEQUELIZE FAILURE");

        return ad;
      } catch (error) {
        errorSender(error);
      }
    }
  },

  Ad: {
    advertiser: async (parent, args, { dataSources: { Campaign, Advertiser } }) => {
      const campaign = await Campaign.findOne({ where: { id: parent.CampaignId } });
      return Advertiser.findOne({ where: { id: campaign.AdvertiserId } });
    },
    campaign: async (parent, args, { dataSources: { Campaign } }) => {
      return Campaign.findOne({ where: { id: parent.CampaignId } });
    },
    categories: async (parent, args, { dataSources: { Ad, Category } }) => {
      const ad = await Ad.findOne({ where: { id: parent.id }, include: [{ model: Category }]});
      return ad.Categories;
    },
    geos: async (parent, args, { dataSources: { Ad, Geo } }) => {
      const ad = await Ad.findOne({ where: { id: parent.id }, include: [{ model: Geo }]});
      return ad.Geos;
    }
  }
};

export default Ad;
