import React, { useState } from "react"
import { SEARCH_MOVIES } from "../apollo/query"
import { useQuery } from "@apollo/client"
import { Button } from "@material-ui/core"
import styled from "styled-components"
import AddIcon from "@material-ui/icons/Add"

const Movies = () => {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [favorite, setFavorite] = useState([])
  const [button, setButton] = useState([])

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

  const removeFav = (title, id) => {
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
        <h3>You're on page {page} </h3>
        <input
          type="text"
          aria-label="Search"
          placeholder="Type to filter posts..."
          value={search}
          onChange={handleChange}
        />

        {page <= 1 ? (
          <PrevNextBut>
            <Button
              disabled
              variant="contained"
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <Button variant="contained" onClick={() => setPage(page + 1)}>
              Next
            </Button>
          </PrevNextBut>
        ) : (
          <PrevNextBut>
            <Button variant="contained" onClick={() => setPage(page - 1)}>
              Previous
            </Button>
            <Button variant="contained" onClick={() => setPage(page + 1)}>
              Next
            </Button>
          </PrevNextBut>
        )}
        {favorite.map(fav => (
          <FavCard key={fav.id}>
            <FavButton
              disabled={button.indexOf(fav.id) === -1}
              variant="contained"
              onClick={() => removeFav(fav.title, fav.id)}
            >
              Remove
            </FavButton>
            <FavTitle> {fav.title} </FavTitle>
          </FavCard>
        ))}
      </Nominated>

      {results?.map(item => {
        return (
          <Card key={item.id}>
            <div>Title: {item.title}</div>
            <div>Released: {item.year}</div>

            <Button
              startIcon={<AddIcon />}
              color="primary"
              variant="contained"
              disabled={button.indexOf(item.id) !== -1}
              onClick={() => validateFav(item.title, item.id)}
            >
              Add to Favorites
            </Button>
          </Card>
        )
      })}
    </>
  )
}

export default Movies

const PrevNextBut = styled.div`
  padding: 10px, 0, 20px, 0;
  position: relative;
  margin-bottom: 20px;
  margin-top: 10px;
`
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

const FavButton = styled(Button)`
  border-radius: 2px;
  cursor: pointer;
  text-align: center;
`

const NomTitle = styled.h2`
  font-size: 30px;

  margin-bottom: 1em;
  text-align: center;
`

const Card = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  flex-direction: column;
  height: 3em;
  justify-content: flex-start;
`

const Nominated = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 100;
  margin-bottom: 2em;
  height: 100%;
`
