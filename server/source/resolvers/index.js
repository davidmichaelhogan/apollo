import { mergeResolvers } from "merge-graphql-schemas";

// import Publisher from "./Publisher";
// import Site from "./Site";
import Ad from "./Ad";
import Advertiser from "./Advertiser";
import Campaign from "./Campaign";

const resolvers = [Ad, Advertiser, Campaign];

export default mergeResolvers(resolvers);
