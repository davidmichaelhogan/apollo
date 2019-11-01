const Publisher = {
  Query: {
    publisher: async (parent, { id }, { dataSources: { Publisher } }) => {
      return await Publisher.findOne({ where: { id } });
    },
    publishers: async (parent, { sites }, { dataSources: { Publisher, Site } }) => {
      if (sites) {
        return await Publisher.findAll({
          include: [
            { model: Site, where: { id: sites } }
          ]})
      }
      return await Publisher.findAll();
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
      await Publisher.update(input, { where: { id } });
      return await Publisher.findOne({ where: { id } });
    }
  },

  Publisher: {
    sites: async (parent, args, { dataSources: { Site } }) => {
      return await Site.findAll({ where: { PublisherId: parent.id } });
    }
  }
};

export default Publisher;
