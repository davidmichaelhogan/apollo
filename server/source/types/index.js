import { mergeTypes } from "merge-graphql-schemas";

import Publisher from "./Publisher.graphql";
import Site from "./Site.graphql";
import Category from "./Category.graphql";
import Advertiser from "./Advertiser.graphql";
import Campaign from "./Campaign.graphql";
import Ad from "./Ad.graphql";
import Geo from "./Geo.graphql";

import Inputs from "./utils/Inputs.graphql";
import Date from "./utils/Scalars.graphql";
import JSON from "./utils/Scalars.graphql";

export default mergeTypes(
  [
    Publisher,
    Category,
    Site,
    Advertiser,
    Campaign,
    Ad,
    Geo,
    Inputs,
    Date,
    JSON
  ],
  {
    all: true
  }
);
