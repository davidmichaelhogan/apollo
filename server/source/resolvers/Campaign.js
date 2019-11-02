// ----------------------------------------------------------------------------------//
// Campaign Resolver | Apollo Graph
// Apollo V2
// David Michael Hogan | November 1, 2019 | Updated:
// ----------------------------------------------------------------------------------//

import Sequelize, { Model } from "sequelize";
import {
  dateRange,
  intRange,
  errorHandler,
  errorSender
} from "./utils.js";

const Campaign = {
  Query: {
    campaign: async (parent, { id }, { dataSources: { Campaign } }) => {
      if (id) {
        return await Campaign.findAll({ where: { id } });
      }
      return await Campaign.findAll();
    },
    campaigns: async (parent, { input }, { dataSources: { Campaign } }) => {
      try {
        const { startDate, endDate, deliveryDate, cost, cpm, balance, advertiser, ...data } = input;
        if (startDate) data.startDate = dateRange(startDate);
        if (endDate) data.endDate = dateRange(endDate);
        if (deliveryDate) data.deliveryDate = dateRange(deliveryDate);
        if (cost) data.cost = intRange(cost)
        if (cpm) data.cpm = intRange(cpm)
        if (balance) data.balance = intRange(balance)
        if (advertiser) data.AdvertiserId = advertiser;

        const campaign = await Campaign.findAll({ where: data });
        errorHandler(!campaign, input, "NO CAMPAIGN WAS FOUND");
        return campaign;
      } catch (error) {
        errorSender(error);
      }
    }
  },

  Mutation: {
    createCampaign: async (
      parent,
      { input },
      { dataSources: { Campaign } }
    ) => {
      try {
        const { advertiser: AdvertiserId, ...data } = input;
        const { cost, cpm, startDate, endDate } = input;
        const now = new Date();
        const campaignAds = cost / cpm;
        const campaignTime = new Date(endDate).getTime() - new Date(startDate).getTime();
        const displayInterval = campaignTime / campaignAds;
        const deliveryDate = new Date(
          now.getTime() + displayInterval
        );

        const campaign = await Campaign.create({ isActive: true, AdvertiserId, deliveryDate, balance: cost, ...data });
        errorHandler(!campaign, input, "CAMPAIGN COULD NOT BE CREATED");
        return campaign;
      } catch (error) {
        errorSender(error);
      }
    },
    updateCampaign: async (
      parent,
      { id, input },
      { dataSources: { Campaign, Ad } }
    ) => {
      try {
        const { advertiser, ads, ...data } = input;
        if (advertiser) data.AdvertiserId = advertiser;
        if (ads) {
          const updateAds = await Ad.update({ CampaignId: id }, { where: { id: ads } });
          errorHandler(updateAds.length === 0, input, "COULD NOT UPDATE ADS IN CAMPAIGN UPDATE");
        }

        const { cost, cpm, startDate, endDate } = input;
        if (cost || cpm || startDate || endDate) {
          const campaign = await Campaign.findOne({ where: { id } });
          if (cpm) campaign.cpm = cpm;
          if (cost) campaign.cost = cost;
          if (startDate) campaign.startDate = startDate;
          if (endDate) campaign.endDate = endDate;
          const now = new Date();
          const campaignAds = campaign.cost / campaign.cpm;
          const campaignTime = new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime();
          const displayInterval = campaignTime / campaignAds;
          data.deliveryDate = new Date(
            now.getTime() + displayInterval
          );
        }

        const updateCampaign = await Campaign.update(data, { where: { id } });
        errorHandler(updateCampaign.length === 0, input, "COULD NOT UPDATE CAMPAIGN");
        return await Campaign.findOne({ where: { id } });
      } catch (error) {
        errorSender(error);
      }
    }
  },

  Campaign: {
    ads: async (parent, args, { dataSources: { Ad } }) => {
      return await Ad.findAll({ where: { CampaignId: parent.id } });
    },
    advertiser: async (parent, args, { dataSources: { Advertiser } }) => {
      return await Advertiser.findOne({ where: { id: parent.AdvertiserId } });
    }
  }
};

export default Campaign;
