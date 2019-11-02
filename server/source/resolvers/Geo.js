// ----------------------------------------------------------------------------------//
// Geo Resolver | Apollo Graph
// Apollo V2
// David Michael Hogan | November 1, 2019 | Updated:
// ----------------------------------------------------------------------------------//

import {
  errorHandler,
  errorSender
} from "./utils.js";

  const Geo = {
  Query: {
    geo: async (parent, { id }, { dataSources: { Geo } }) => {
      if (id) {
        return await Geo.findAll({ where: { id } });
      }
      return await Geo.findAll();
    },
    getGeoByIP: async (parent, { address }, { dataSources: { Geo } }) => {
      return await Geo.findOne();
    }
  },

  Mutation: {
    createGeo: async (
      parent,
      { input },
      { dataSources: { Geo } }
    ) => {
      return await Geo.create(input);
    },
    updateGeo: async ( parent, { id, input }, { dataSources: { Geo } }) => {
      try {
        const updatedGeo = await Geo.update(input, { where: { id }});
        errorHandler(updatedGeo[0] < 1, input, "COULD NOT UPDATE GEO");
        return await Geo.findOne({ where: { id } });
        } catch (error) {
          errorSender(error);
        }
    }
  }
};

export default Geo;
