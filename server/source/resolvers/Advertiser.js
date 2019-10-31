const Advertiser = {
  Query: {
    advertiser: async (parent, { id }, { dataSources: { Advertiser } }) => {
      return await Advertiser.findOne({ where: { id } });
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
      const { campaigns, ...data } = input;
      if (campaigns) {
        await Campaign.update({ AdvertiserId: id }, { where: { id: campaigns } });
      }
      await Advertiser.update(data, { where: { id } });
      return await Advertiser.findOne({ where: { id } });
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
