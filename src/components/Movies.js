import React, { useState } from "react"
import { SEARCH_MOVIES } from "../apollo/query"
import { useQuery } from "@apollo/client"

import styled from "styled-components"

const Movies = () => {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const [favorite, setFavorite] = useState([])

  const handleChange = event => {
    event.preventDefault()
    setSearch(event.target.value)
    setPage(1)
  }

  const { data } = useQuery(SEARCH_MOVIES, {
    variables: { search, page },
  })

  let movies = data?.movies?.Search?.map(movie => {
    return { title: movie.Title, id: movie.imdbID, year: movie.Year }
  })
  const results = movies?.filter(movie => {
    let title = movie.title

    let filterTitle = [title]

    return filterTitle.filter(title => title.toLowerCase().includes(search))
  })

  const checkListLength = (title, id) => {
    return favorite.length <= 4
      ? favorite => [...favorite, { title: title, id: id }]
      : favorite
  }

  // const checkFavExst = (title, id) => {
  //   console.log(title, id)
  // }

  const validateFav = (title, id) => {
    return checkListLength(title, id)
    // checkFavExst(title, id)
  }
  // const removeFav = title => {
  //   return favorite.map(favorites => {
  //     const filtered = [favorites].filter(e => (e.title = !title))

  //     return filtered
  //   })
  // }

  const removeFav = title => {
    return favorite.filter(e => (e.title = !title))
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

      <Container>
        {results?.map(item => (
          <Card key={item.id}>
            <div>Title: {item.title}</div>
            <div>Released: {item.year}</div>

            <Button
              onClick={() => setFavorite(validateFav(item.title, item.id))}
            >
              Favorite
            </Button>
          </Card>
        ))}
      </Container>
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
                <button onClick={() => setFavorite(removeFav(favs.title))}>
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
      {console.log(favorite)}
    </>
  )
}

export default Movies

const Button = styled.button`
  width: 5em;
  height: 2em;
`

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
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
