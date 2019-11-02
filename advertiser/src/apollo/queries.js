import { gql } from "apollo-boost";

export const ad = gql`
  {
    ad {
      id
      attributes
    }
  }
`;