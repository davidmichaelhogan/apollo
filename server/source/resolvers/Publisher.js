// ----------------------------------------------------------------------------------//
// Publisher Resolver | Apollo Graph
// Apollo V2
// David Michael Hogan | November 1, 2019 | Updated:
// ----------------------------------------------------------------------------------//

import {
  errorHandler,
  errorSender
} from "./utils.js";

const Publisher = {
  Query: {
    publisher: async (parent, { id }, { dataSources: { Publisher } }) => {
      if (id) {
        return await Publisher.findAll({ where: { id } });
      }
      return await Publisher.findAll();
    },
    publishers: async (parent, { sites }, { dataSources: { Publisher, Site } }) => {
      try {
        if (sites) {
          return await Publisher.findAll({
            include: [
              { model: Site, where: { id: sites } }
            ]})
        }
        const result = await Publisher.findAll();
        errorHandler(!result, sites, "COULD NOT FIND PUBLISHER");
        return result;
      } catch (error) {
        errorSender(error);
      }
    }
  },

  Mutation: {
    createPublisher: async (
      parent,
      { input },
      { dataSources: { Publisher } }
    ) => {
      return await Publisher.create({ isActive: true, ...input });
    },
    updatePublisher: async (
      parent,
      { id, input },
      { dataSources: { Publisher } }
    ) => {
      try {
        const updatePublisher = await Publisher.update(input, { where: { id } });
        errorHandler(updatePublisher[0] < 1, input, "COULD NOT UPDATE PUBLISHER");
        return await Publisher.findOne({ where: { id } });
      } catch (error) {
        errorSender(error);
      }
    }
  },

  Publisher: {
    sites: async (parent, args, { dataSources: { Site } }) => {
      return await Site.findAll({ where: { PublisherId: parent.id } });
    }
  }
};

export default Publisher;
