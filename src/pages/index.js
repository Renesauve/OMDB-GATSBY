import * as React from "react"

// import { GET_MOVIE } from "../apollo/query"

// GET_MOVIE_LIST
// import { useQuery } from "@apollo/client"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Movies from "../components/Movies"

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />

      <Movies />
    </Layout>
  )
}

export default IndexPage
