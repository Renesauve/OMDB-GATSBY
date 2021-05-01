import { gql } from "@apollo/client"

const SEARCH_MOVIES = gql`
  query retrieveSearch($search: String!, $page: Int!) {
    movies(search: $search, page: $page)
      @rest(type: "Movies", path: "&s={args.search}&page={args.page}") {
      Error
      totalResults
      Search @type(name: "Movie") {
        Title
        Year
        imdbID
        Poster
      }
    }
  }
`

export default SEARCH_MOVIES
