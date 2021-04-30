import React, { useState } from "react"
import { SEARCH_MOVIES } from "../apollo/query"
import { useQuery } from "@apollo/client"

import styled from "styled-components"

const Movies = () => {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [favorite, setFavorite] = useState([])
  const [button, setButton] = useState([])
  // const [valid, setValid] = useState(false)

  const { data } = useQuery(SEARCH_MOVIES, {
    variables: { search, page },
  })
  const handleChange = event => {
    event.preventDefault()
    setSearch(event.target.value)
    setPage(1)
  }

  let movies = data?.movies?.Search?.map(movie => {
    return { title: movie.Title, id: movie.imdbID, year: movie.Year }
  })

  const results = movies?.filter(movie => {
    let title = movie.title
    let filterTitle = [title]
    return filterTitle.filter(title => title.toLowerCase().includes(search))
  })

  const validateFav = (title, id) => {
    favorite.length <= 4
      ? setFavorite(
          [...favorite, { title: title, id: id }],
          setButton([...button, id])
        )
      : console.log("nope")
  }

  const removeFav = title => {
    setButton(...button)
    const array = [...favorite]
    const index = array.indexOf(title)
    if (index === -1) {
      array.splice(index, 1)
      setFavorite(array)
    }
  }

  return (
    <>
      <Nominated>
        {favorite?.length >= 5 ? (
          <NomTitle>You can't add anymore to favorites!</NomTitle>
        ) : (
          <NomTitle>Choose 5 movies to nominate! </NomTitle>
        )}

        {favorite.map(favs =>
          favs.id ? (
            <FavCard key={favs.id}>
              <FavButton
                key={favs.id}
                onClick={() => removeFav(favs.title, favs.id)}
              >
                -
              </FavButton>
              <FavTitle> {favs.title} </FavTitle>
            </FavCard>
          ) : (
            <div></div>
          )
        )}
      </Nominated>
      <h3>You're on page {page} </h3>

      <input
        type="text"
        aria-label="Search"
        placeholder="Type to filter posts..."
        value={search}
        onChange={handleChange}
      />
      {page <= 1 ? (
        <button onClick={() => setPage(page + 1)}>Next</button>
      ) : (
        <div>
          <button onClick={() => setPage(page - 1)}>Previous</button>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}

      {results?.map(item => {
        return (
          <Card key={item.id}>
            <div>Title: {item.title}</div>
            <div>Released: {item.year}</div>

            <Button
              disabled={button.indexOf(item.id) !== -1}
              onClick={() => validateFav(item.title, item.id)}
            >
              +
            </Button>
          </Card>
        )
      })}
    </>
  )
}

export default Movies

const FavCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  background-color: white;
`
const FavTitle = styled.div`
  margin-left: 50px;
`

const FavButton = styled.div`
  width: 3em;
  height: 1em;
  background-color: red;
  border-radius: 2px;
  cursor: pointer;
  text-align: center;
`

const NomTitle = styled.h2`
  font-size: 30px;
  top: 30px;
  margin-bottom: 1em;
  text-align: center;
`
const Button = styled.button`
  width: 5em;
  height: 2em;
`

const Card = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  flex-direction: column;
  height: 5em;
  justify-content: flex-start;
`

const Nominated = styled.div`
  display: flex;
  height: 100px;
  top: 50px;
  flex-direction: column;
  z-index: 100;
  margin-bottom: 12em;
`
