import Sequelize, { Model } from "sequelize";
import {
  parseInput,
  selectAdDataSource,
  createIdArrays,
  getAdIds,
  toDates,
  errorHandler,
  errorSender
} from "./utils.js";
import { Module } from "module";

const Op = Sequelize.Op;

const Ad = {
  Query: {
    ad: async (parent, { id }, { dataSources: { Ad } }) => {
      return Ad.findOne({ where: { id } });
    },
    ads: async (parent, { input }, { dataSources: { Ad, Category, Geo } }) => {
      const { category, geo, campaign: CampaignId, ...data } = input;
      const include = [];
      if (category) {
        include.push({
          model: Category,
          through: { where: { CategoryId: category } },
          required: true
        });
      }
      if (geo) {
        include.push({
          model: Geo,
          through: { where: { GeoId: geo } },
          required: true
        });
      }

      const result = await Ad.findAll({
        where: {
          [Op.and]: { CampaignId, ...data }
        },
        include
      });
      return result;
    }
  },

  Mutation: {
    displayAd: async (
      parent,
      { input },
      { dataSources: { Ad, Campaign, Category, Geo } }
    ) => {
      const { category: CategoryId, geo: GeoId } = input;
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
              // all: true,
              // nested: true
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
          id: campaignId,
          cost,
          cpm,
          startDate,
          endDate,
          deliveryDate
        } = ad.Campaign;
        const campaignAds = cost / cpm;
        const campaignTime = endDate.getTime() - startDate.getTime();
        const displayInterval = campaignTime / campaignAds;
        const newDeliveryDate = new Date(
          deliveryDate.getTime() + displayInterval
        );

        const updateDeliveryDate = await Campaign.update(
          { deliveryDate: newDeliveryDate },
          { where: { id: campaignId } }
        );

        errorHandler(
          updateDeliveryDate[0] < 1,
          input,
          "COULD NOT UPDATE DELIVERY DATE"
        );

        // create ad event

        // left off right here ! need to make ad event on ad show... everything else is working fine. thank god.

        return ad;
      } catch (error) {
        errorSender(error);
      }
    }
    // nope: async (
    //   parent,
    //   { input },
    //   { dataSources: { AdSearch, AdHistory, Campaigns, Sequelize } }
    // ) => {
    //   try {
    //     // UPDATE SEARCH TABLE
    //     const displayAd = search.Ad[0];
    //     const { adDeliveryInterval } = search;
    //     const newDeliveryDate = new Date(
    //       new Date(dateShown).getTime() + adDeliveryInterval * 1000
    //     );
    //     const updateAdSearchResult = await AdSearch.update(
    //       { adDeliveryDate: newDeliveryDate, adDateShown: dateShown },
    //       { where: { adId: displayAd.adId } }
    //     );
    //     errorHandler(
    //       updateAdSearchResult[0] < 1,
    //       input,
    //       "COULD NOT UPDATE ADSEARCH TABLE"
    //     );
    //     // CREATE AD HISTORY RECORD
    //     const { id, createdAt, updatedAt, ...newAd } = displayAd.dataValues;
    //     const adHistory = { adDateShown: dateShown, ...newAd };
    //     const createAdHistoryResult = await AdHistory.create(adHistory);
    //     errorHandler(
    //       !createAdHistoryResult.adId,
    //       adHistory,
    //       "COULD NOT CREATE AD HISTORY"
    //     );
    //     return displayAd;
    //   } catch (error) {
    //     errorSender(error);
    //   }
    // },
    // updateAd: async (
    //   parent,
    //   { adId, status, input },
    //   { dataSources: { AdSearch, AdHistory } }
    // ) => {
    //   const data = parseInput(input);
    //   const database = status === "ACTIVE" ? AdSearch : AdHistory;
    //   await database.update(data, { where: { adId } });
    //   return await database.findOne({ where: { adId } });
    // }
  },

  Ad: {
    // status: async (parent, args, { dataSources: { AdSearch, AdHistory } }) => {
    //   const dataName = parent._modelOptions.name.singular;
    //   return dataName === "AdSearch" ? "ACTIVE" : "INACTIVE";
    // },
    // advertiser: async (parent, args, { dataSources: { Advertisers } }) => {
    //   return Advertisers.findOne({ where: { id: parent.advertiserId } });
    // },
    // campaign: async (parent, args, { dataSources: { Campaigns } }) => {
    //   return Campaigns.findOne({ where: { id: parent.campaignId } });
    // },
    // categories: async (parent, args, { dataSources: { Categories } }) => {
    //   const categoryIds = parent.categoryIds;
    //   return await Categories.findAll({ where: { id: categoryIds } });
    // },
    // geos: async (parent, args, { dataSources: { Geo } }) => {
    //   const geoIds = parent.geoIds;
    //   return await Geo.findAll({ where: { id: geoIds } });
    // },
    // sitesShown: async (parent, args, { dataSources: { Sites } }) => {
    //   const siteIds = parent.siteIds;
    //   return await Sites.findAll({ where: { id: siteIds } });
    // }
  }
};

export default Ad;
