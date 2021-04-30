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
      ? setFavorite([...favorite, { title: title, id: id }])
      : console.log("nope")
    setButton([...button, id])
  }

  const removeFav = (title, id) => {
    setButton(...button, id)
    const array = [...favorite]
    const index = array.indexOf(title)
    if (index === -1) {
      array.splice(index, 1)
      setFavorite(array)
    }
  }

  return (
    <>
      <h1 style={{ textAlign: `center` }}>Writing</h1>
      <h3>You're on page {page} </h3>
      <input
        type="text"
        aria-label="Search"
        placeholder="Type to filter posts..."
        value={search}
        onChange={handleChange}
      />

      {results?.map(item => {
        return (
          <Card key={item.id}>
            <div>Title: {item.title}</div>
            <div>Released: {item.year}</div>

            <Button
              disabled={button.indexOf(item.id) !== -1}
              key={item.id}
              onClick={() => validateFav(item.title, item.id)}
            >
              +
            </Button>
          </Card>
        )
      })}

      {page <= 1 ? (
        <button onClick={() => setPage(page + 1)}>Next</button>
      ) : (
        <div>
          <button onClick={() => setPage(page - 1)}>Previous</button>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
      <Nominated>
        <div>
          {favorite.map(favs =>
            favs.id ? (
              <div key={favs.id}>
                <div> {favs.title} </div>
                <button
                  key={favs.id}
                  onClick={() => removeFav(favs.title, favs.id)}
                >
                  -
                </button>
              </div>
            ) : (
              <div></div>
            )
          )}
        </div>

        {favorite?.length >= 5 ? (
          <div>You can't add anymore to favorites!</div>
        ) : (
          <div>Choose 5 titles to nominate </div>
        )}
      </Nominated>
    </>
  )
}

export default Movies

const Button = styled.button`
  width: 5em;
  height: 2em;
`

const Card = styled.ul`
  flex-direction: row;
  justify-content: space-around;
  height: 5em;
`

const Nominated = styled.div`
  width: 400px;
  height: 100vh;
  right: 0;
  top: 0;
  position: fixed;
  background-color: purple;
`
