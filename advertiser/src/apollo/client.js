// ----------------------------------------------------------------------------------//
// Apollo Client Config | Apollo Advertiser Dashboard
// Apollo V2
// David Michael Hogan | November 2, 2019 | Updated:
// ----------------------------------------------------------------------------------//

import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://apz8jilqj7.execute-api.us-east-1.amazonaws.com/dev/graphql',
});

export default client;