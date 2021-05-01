import React from "react"

import { useQuery } from "@apollo/client"
import { GET_HERO } from "../apollo/query"

export const Hero = () => {
  const { data, loading, error } = useQuery(GET_HERO)
  console.log({ data, loading, error })
  return console.log({ data, loading, error })
}

export default Hero
