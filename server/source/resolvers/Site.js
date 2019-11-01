import {
  errorHandler,
  errorSender
} from "./utils.js";

const Site = {
  Query: {
    site: async (parent, { id }, { dataSources: { Site } }) => {
      if (id) {
        return await Site.findAll({ where: { id } });
      }
      return await Site.findAll();
    },
    publisherSites: async (parent, { publisher: PublisherId }, { dataSources: { Site } }) => {
      return await Site.findAll({ where: { PublisherId } });
    }
  },

  Mutation: {
    createSite: async (parent, { input }, { dataSources: { Site } }) => {
      return await Site.create({ isActive: true, ...input });
    },
    updateSite: async (
      parent,
      { id, input },
      { dataSources: { Site, Publisher, Category } }
    ) => {
      try {
        const {
          categories,
          publisher,
          ...update
        } = input;

        const data = {};
        if (categories) data.setCategories = categories;
        if (publisher) data.setPublisher = publisher;
        if (update) data.update = update;
        errorHandler(Object.entries(data).length === 0, input, "NO INPUT GIVEN");

        const site = await Site.findOne({
          where: { id },
          include: [{ model: Category }],
        });

        const result = await Promise.all(Object.getOwnPropertyNames(data).map(async key => {
          return await site[key](data[key]);
        }));
        errorHandler(result.length === 0, input, "SEQUELIZE FAILURE");

        return site;
      } catch (error) {
        errorSender(error);
      }
    }
  },

  Site: {
    categories: async (parent, args, { dataSources: { Site, Category } }) => {
      const site = await Site.findOne({ where: { id: parent.id }, include: [{ model: Category }]});
      return site.Categories;
    },
    publisher: async (parent, args, { dataSources: { Publisher } }) => {
      return await Publisher.findOne({ where: { id: parent.PublisherId } });
    }
  }
};

export default Site;
