import { parseInput } from "./utils.js";

const Publisher = {
  Query: {
    publisher: async (parent, { id }, { dataSources: { Publishers } }) => {
      return await Publishers.findOne({ where: { id } });
    },
    publishers: async (parent, args, { dataSources: { Publishers } }) => {
      return await Publishers.findAll();
    }
  },

  Mutation: {
    createPublisher: async (
      parent,
      { input },
      { dataSources: { Publishers } }
    ) => {
      const data = parseInput(input);
      return await Publishers.create({ isActive: true, ...data });
    },
    updatePublisher: async (
      parent,
      { id, input },
      { dataSources: { Publishers } }
    ) => {
      const data = parseInput(input);
      await Publishers.update(data, { where: { id } });
      return await Publishers.findOne({ where: { id } });
    },
    cancelPublisher: async (
      parent,
      { id },
      { dataSources: { Publishers } }
    ) => {
      await Publishers.update({ isActive: false }, { where: { id } });
      return await Publishers.findOne({ where: { id } });
    },
    addPublisherPayment: async (
      parent,
      { publisherId: id, input },
      { dataSources: { Publishers, PaymentInfo } }
    ) => {
      const data = parseInput(input);
      const payment = await PaymentInfo.create(data);
      await Publishers.update({ PaymentInfoId: payment.id }, { where: { id } });
      return await Publishers.findOne({ where: { id } });
    }
  },

  Publisher: {
    sites: async (parent, args, { dataSources: { Sites } }) => {
      return await Sites.findAll({ where: { publisherId: parent.id } });
    },
    paymentInfo: async (parent, args, { dataSources: { PaymentInfo } }) => {
      return await PaymentInfo.findOne({
        where: { id: parent.paymentInfoId }
      });
    }
  }
};

export default Publisher;
