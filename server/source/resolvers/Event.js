import {
  dateRange,
  intRange,
  errorHandler,
  errorSender
} from "./utils.js";

const Event = {
  Query: {
    event: async (parent, { id }, { dataSources: { Event } }) => {
      if (id) {
        return await Event.findAll({ where: { id } });
      }
      return await Event.findAll();
    },
    events: async (parent, { input }, { dataSources: { Event } }) => {
      const { date, site, ad, ...data } = input;
      if (date) data.date = dateRange(date);
      if (site) data.SiteId = site;
      if (ad) data.AdId = ad;

      return await Event.findAll({ where: { ...data } });
    }
  },

  Mutation: {
    createEvent: async (
      parent,
      { input },
      { dataSources: { Event } }
    ) => {
      const { site, ad, ...data } = input;
      data.date = new Date();
      if (site) data.SiteId = site;
      if (ad) data.AdId = ad;
      return await Event.create(data);
    }
  }
};

export default Event;
