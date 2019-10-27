import {
  parseInput,
  selectAdDataSource,
  createIdArrays,
  getAdIds,
  toDates,
  errorHandler,
  errorSender
} from "./utils.js";

const Ad = {
  Query: {
    ad: async (
      parent,
      { adId, status },
      { dataSources: { AdSearch, AdHistory } }
    ) => {
      const allAds =
        status === "ACTIVE"
          ? await AdSearch.findAll({ where: { adId } })
          : await AdHistory.findAll({ where: { adId } });
      return createIdArrays(allAds)[0];
    },
    ads: async (
      parent,
      { status, input },
      { dataSources: { AdSearch, AdHistory, Sequelize } }
    ) => {
      const Op = Sequelize.Op;
      const database = selectAdDataSource(status, { AdSearch, AdHistory });
      const { deliveryDate, dateShown, ...data } = input;
      const dataKey = deliveryDate
        ? "adDeliveryDate"
        : dateShown
        ? "adDateShown"
        : null;
      if (dataKey)
        data[dataKey] = {
          [Op.between]: toDates(Object.values(deliveryDate || dateShown))
        };
      const adIds = getAdIds(await database.findAll({ where: data }));
      return createIdArrays(await database.findAll({ where: { adId: adIds } }));
    }
  },

  Mutation: {
    displayAd: async (
      parent,
      { input },
      { dataSources: { AdSearch, AdHistory, Campaigns, Sequelize } }
    ) => {
      try {
        const Op = Sequelize.Op;
        const dateShown = new Date();
        // CREATE INPUTS
        const { geoId, categoryId, siteId } = parseInput(input);

        // FIND AD
        const search = await Campaigns.findOne({
          where: {
            isActive: true,
            startDate: { [Op.lte]: dateShown },
            endDate: { [Op.gte]: dateShown }
          },
          include: [
            {
              model: AdSearch,
              where: {
                geoId,
                categoryId,
                include: [
                  {
                    model: AdPool,
                    as: "Ad",
                    where: {
                      adDeliveryDate: { [Op.lte]: dateShown }
                    }
                  }
                ]
              }
            }
          ]
        });
        errorHandler(!search, input, "NO AD FOUND");

        // UPDATE SEARCH TABLE
        const displayAd = search.Ad[0];
        const { adDeliveryInterval } = search;
        const newDeliveryDate = new Date(
          new Date(dateShown).getTime() + adDeliveryInterval * 1000
        );
        const updateAdSearchResult = await AdSearch.update(
          { adDeliveryDate: newDeliveryDate, adDateShown: dateShown },
          { where: { adId: displayAd.adId } }
        );
        errorHandler(
          updateAdSearchResult[0] < 1,
          input,
          "COULD NOT UPDATE ADSEARCH TABLE"
        );

        // CREATE AD HISTORY RECORD
        const { id, createdAt, updatedAt, ...newAd } = displayAd.dataValues;
        const adHistory = { adDateShown: dateShown, ...newAd };
        const createAdHistoryResult = await AdHistory.create(adHistory);
        errorHandler(
          !createAdHistoryResult.adId,
          adHistory,
          "COULD NOT CREATE AD HISTORY"
        );
        return displayAd;
      } catch (error) {
        errorSender(error);
      }
    },
    updateAd: async (
      parent,
      { adId, status, input },
      { dataSources: { AdSearch, AdHistory } }
    ) => {
      const data = parseInput(input);
      const database = status === "ACTIVE" ? AdSearch : AdHistory;
      await database.update(data, { where: { adId } });
      return await database.findOne({ where: { adId } });
    }
  },

  Ad: {
    status: async (parent, args, { dataSources: { AdSearch, AdHistory } }) => {
      const dataName = parent._modelOptions.name.singular;
      return dataName === "AdSearch" ? "ACTIVE" : "INACTIVE";
    },
    advertiser: async (parent, args, { dataSources: { Advertisers } }) => {
      return Advertisers.findOne({ where: { id: parent.advertiserId } });
    },
    campaign: async (parent, args, { dataSources: { Campaigns } }) => {
      return Campaigns.findOne({ where: { id: parent.campaignId } });
    },
    categories: async (parent, args, { dataSources: { Categories } }) => {
      const categoryIds = parent.categoryIds;
      return await Categories.findAll({ where: { id: categoryIds } });
    },
    geos: async (parent, args, { dataSources: { Geo } }) => {
      const geoIds = parent.geoIds;
      return await Geo.findAll({ where: { id: geoIds } });
    },
    sitesShown: async (parent, args, { dataSources: { Sites } }) => {
      const siteIds = parent.siteIds;
      return await Sites.findAll({ where: { id: siteIds } });
    }
  }
};

export default Ad;
