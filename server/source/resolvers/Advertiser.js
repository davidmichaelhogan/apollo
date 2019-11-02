// ----------------------------------------------------------------------------------//
// Advertiser Resolver | Apollo Graph
// Apollo V2
// David Michael Hogan | November 1, 2019 | Updated:
// ----------------------------------------------------------------------------------//

import {
  errorHandler,
  errorSender
} from "./utils.js";

const Advertiser = {
  Query: {
    advertiser: async (parent, { id }, { dataSources: { Advertiser } }) => {
      if (id) {
        return await Advertiser.findAll({ where: { id } });
      }
      return await Advertiser.findAll();
    },
    advertisers: async (parent, args, { dataSources: { Advertiser } }) => {
      return await Advertiser.findAll();
    }
  },

  Mutation: {
    createAdvertiser: async (
      parent,
      { input },
      { dataSources: { Advertiser } }
    ) => {
      return await Advertiser.create({ isActive: true, ...input });
    },
    updateAdvertiser: async (
      parent,
      { id, input },
      { dataSources: { Advertiser, Campaign } }
    ) => {
      try {
        const { campaigns, ...data } = input;
        if (campaigns) {
          await Campaign.update({ AdvertiserId: id }, { where: { id: campaigns } });
        }
        const updateAdvertiser = await Advertiser.update(data, { where: { id } });
        errorHandler(updateAdvertiser[0] < 1, input, "COULD NOT UPDATE ADVERTISER");
        return await Advertiser.findOne({ where: { id } });
      } catch (error) {
        errorSender(error);
      }
    }
  },

  Advertiser: {
    campaigns: async (parent, args, { dataSources: { Campaign } }) => {
      return await Campaign.findAll({ where: { AdvertiserId: parent.id } });
    },
    ads: async (parent, args, { dataSources: { Campaign, Ad } }) => {
      const campaigns = await Campaign.findAll({ where: { AdvertiserId: parent.id }, include: [{ model: Ad }] });
      const ads = [];
      campaigns.forEach(campaign => {
        ads.push(...campaign.Ads);
      });
      return ads;
    }
  }
};

export default Advertiser;
