import { ApolloClient, InMemoryCache } from "@apollo/client"
import { RestLink } from "apollo-link-rest"
const fetch = require("node-fetch")
global.Headers = fetch.Headers

const uri = process.env.OMDB_API

const restLink = new RestLink({
  uri: uri,
  credentials: "same-origin",
  // Extra code to be added:
  typePatcher: {
    Movies: data => {
      if (data.Search != null) {
        data.Search = data.Search.map(search => ({
          __typename: "Movie",
          ...search,
        }))
      }

      return data
    },
  },
})
const client = new ApolloClient({
  cache: new InMemoryCache({}),
  link: restLink,
})

export default client
