import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";

const link = from([new HttpLink({ uri: "https://data.objkt.com/v3/graphql" })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default client;
