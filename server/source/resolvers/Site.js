import { parseInput, encodeJSON, parseIdArray } from "./utils.js";

const Site = {
  Query: {
    site: async (parent, { id }, { dataSources: { Sites } }) => {
      return await Sites.findOne({ where: { id } });
    },
    sites: async (parent, { publisherId }, { dataSources: { Sites } }) => {
      const argument = publisherId ? { where: { publisherId } } : {};
      return await Sites.findAll(argument);
    }
  },

  Mutation: {
    createSite: async (parent, { input }, { dataSources: { Sites } }) => {
      const data = parseInput(input);
      return await Sites.create({ isActive: true, ...data });
    },
    updateSite: async (parent, { id, input }, { dataSources: { Sites } }) => {
      const data = parseInput(input);
      const categoryIds = encodeJSON(data.categoryIds);
      await Sites.update({ ...data, categoryIds }, { where: { id } });
      return await Sites.findOne({ where: { id } });
    },
    cancelSite: async (parent, { id }, { dataSources: { Sites } }) => {
      await Sites.update({ isActive: false }, { where: { id } });
      return await Sites.findOne({ where: { id } });
    }
  },

  Site: {
    categories: async (parent, args, { dataSources: { Categories } }) => {
      const categoryIds = parseIdArray(parent.categoryIds);
      return await Categories.findAll({ where: { id: categoryIds } });
    }
  }
};

export default Site;
