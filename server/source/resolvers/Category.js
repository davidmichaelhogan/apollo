import Sequelize, { Model } from "sequelize";
import {
  errorHandler,
  errorSender
} from "./utils.js";

const Op = Sequelize.Op;

const Category = {
  Query: {
    category: async (parent, { id }, { dataSources: { Category } }) => {
      return await Category.findOne({ where: { id } });
    },
    categories: async (parent, { id, name }, { dataSources: { Category } }) => {
      try {
        const data = {};
        if (id) data.id = id;
        if (name) data.name = { [Op.like]: `%${name}%` };
        const category = await Category.findAll({ where: data });
        errorHandler(!category, data, "NO CATEGORY WAS FOUND");
        return category;
      } catch (error) {
        errorSender(error);
      }
    }
  },

  Mutation: {
    createCategories: async (
      parent,
      { names },
      { dataSources: { Category } }
    ) => {
      try {
        const data = names.map(name => { return ({ name: name })});
        const categories = await Category.bulkCreate(data, {returning: true})
        errorHandler(!categories[0], names, "COULD NOT CREATE CATEGORIES");
        return categories;
      } catch (error) {
        errorSender(error);
      }
    }
  }
};

export default Category;
