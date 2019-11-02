// ----------------------------------------------------------------------------------//
// Resolver Index | Apollo Graph
// Apollo V2
// David Michael Hogan | November 1, 2019 | Updated:
// ----------------------------------------------------------------------------------//

import { mergeResolvers } from "merge-graphql-schemas";

import Ad from "./Ad";
import Advertiser from "./Advertiser";
import Campaign from "./Campaign";
import Category from "./Category";
import Event from "./Event";
import Geo from "./Geo";
import Publisher from "./Publisher";
import Site from "./Site";

const resolvers = [Ad, Advertiser, Campaign, Category, Event, Geo, Publisher, Site];

export default mergeResolvers(resolvers);
