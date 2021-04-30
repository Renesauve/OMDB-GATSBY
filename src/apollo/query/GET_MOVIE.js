import { gql } from "@apollo/client"

const GET_MOVIE = gql`
  query retrieveTitle($titleId: String) {
    ByTitle(imdbID: $titleId) {
      Title
      Year
      Released
      Rated
      Runtime
      Plot
      Poster
      Genre
      Director
      Writer
      imdbID
      Language
      Awards
    }
  }
`

export default GET_MOVIE
