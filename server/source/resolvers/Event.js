// ----------------------------------------------------------------------------------//
// Event Resolver | Apollo Graph
// Apollo V2
// David Michael Hogan | November 1, 2019 | Updated:
// ----------------------------------------------------------------------------------//

import {
  dateRange,
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
      try {
        const { date, site, ad, ...data } = input;
        if (date) data.date = dateRange(date);
        if (site) data.SiteId = site;
        if (ad) data.AdId = ad;

        const result = await Event.findAll({ where: { ...data } });
        if (!result, input, "NO EVENTS FOUND");
        return result;
        } catch (error) {
          errorSender(error);
        }
    }
  },

  Mutation: {
    createEvent: async (
      parent,
      { input },
      { dataSources: { Event } }
    ) => {
      try {
        const { site, ad, ...data } = input;
        data.date = new Date();
        if (site) data.SiteId = site;
        if (ad) data.AdId = ad;
        const result = await Event.create(data);
        errorHandler(!result, input, "COULD NOT CREATE EVENT");
        return result;
        } catch (error) {
          errorSender(error);
        }
    }
  }
};

export default Event;
