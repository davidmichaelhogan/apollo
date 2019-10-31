import Sequelize, { Model } from "sequelize";
import {
  dateRange,
  intRange,
  errorHandler,
  errorSender
} from "./utils.js";

const Op = Sequelize.Op;

const Campaign = {
  Query: {
    campaign: async (parent, { id }, { dataSources: { Campaign } }) => {
      return await Campaign.findOne({ where: { id } });
    },
    campaigns: async (parent, { input }, { dataSources: { Campaign } }) => {
      const { startDate, endDate, deliveryDate, cost, cpm, balance, advertiser, ...data } = input;
      try {
        if (startDate) data.startDate = dateRange(startDate);
        if (endDate) data.endDate = dateRange(endDate);
        if (deliveryDate) data.deliveryDate = dateRange(deliveryDate);
        if (cost) data.cost = intRange(cost)
        if (cpm) data.cpm = intRange(cpm)
        if (balance) data.balance = intRange(balance)
        if (advertiser) data.AdvertiserId = advertiser;


        return await Campaign.findAll({ where: data });
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
      return await Campaign.create({ isActive: true, ...input });
    },
    updateCampaign: async (
      parent,
      { id, input },
      { dataSources: { Campaign } }
    ) => {
      await Campaign.update(data, { where: { id } });
      return await Campaign.findOne({ where: { id } });
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
