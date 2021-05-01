import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"

const fetch = require("node-fetch")
// global.Headers = fetch.Headers

const uri = process.env.GATSBY_GRAPHQL_URL

const link = createHttpLink({
  fetch,
  uri,
})
const client = new ApolloClient({
  cache: new InMemoryCache({}),
  link,
})

export default client
