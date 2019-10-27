import { ApolloServer } from "apollo-server-lambda";
import resolvers from "../source/resolvers";
import types from "../source/types";
import database from "../source/data/db/models";

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
  const handler = server.createHandler();
  context.callbackWaitsForEmptyEventLoop = false;
  return handler(event, context, callback);
};
