import { mergeResolvers } from "merge-graphql-schemas";

import Publisher from "./Publisher";
import Site from "./Site";
import Ad from "./Ad";

const resolvers = [Publisher, Site, Ad];

export default mergeResolvers(resolvers);
