// ----------------------------------------------------------------------------------//
// Graph Queries | Apollo Advertiser Dashboard
// Apollo V2
// David Michael Hogan | November 2, 2019 | Updated:
// ----------------------------------------------------------------------------------//

import { gql } from "apollo-boost";

export const ad = gql`
  {
    ad {
      id
      attributes
    }
  }
`;