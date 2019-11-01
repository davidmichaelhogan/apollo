const Event = {
  Query: {
    event: async (parent, { id }, { dataSources: { Event } }) => {
      if (id) {
        return await Event.findAll({ where: { id } });
      }
      return await Event.findAll();
    },
    events: async (parent, { address }, { dataSources: { Event } }) => {
      return await Geo.findOne();
    }
  },

  Mutation: {
    createEvent: async (
      parent,
      { input },
      { dataSources: { Event } }
    ) => {
      return await Event.create(input);
    },
    updateGeo: async ( parent, { id, input }, { dataSources: { Geo } }) => {
      const updatedGeo = await Geo.update(input, { where: { id }});
      return await Geo.findOne({ where: { id } });
    }
  }
};

export default Event;

// register an impression
// const createEvent = await Event.create({
//   AdId: ad.id,
//   SiteId,
//   type: "IMPRESSION",
//   date,
//   data
// });
// errorHandler(!createEvent, input, "COULD NOT REGISTER IMPRESSION");
// return ad;
