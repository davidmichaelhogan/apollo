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
      const updatedGeo = await Geo.update(input, { where: { id }});
      return await Geo.findOne({ where: { id } });
    }
  }
};

export default Geo;
