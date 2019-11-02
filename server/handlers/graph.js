// ----------------------------------------------------------------------------------//
// Graph Handler | Apollo Graph
// Apollo V2
// David Michael Hogan | November 2, 2019 | Updated:
// ----------------------------------------------------------------------------------//

import { ApolloServer } from "apollo-server-lambda";
import resolvers from "../source/resolvers";
import types from "../source/types";
import database from "../source/data/models";

const server = new ApolloServer({
  typeDefs: types,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  }),
  dataSources: () => {
    return database;
  }
});

export const handler = (event, context, callback) => {
  const handler = server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  });
  context.callbackWaitsForEmptyEventLoop = false;
  return handler(event, context, callback);
};