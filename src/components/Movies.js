import React, { useState, useEffect } from "react"
import { SEARCH_MOVIES } from "../apollo/query"
import { useQuery } from "@apollo/client"
import { Button, Typography, TextField, Tooltip } from "@material-ui/core"
import styled from "styled-components"
import AddIcon from "@material-ui/icons/Add"
import { useSnackbar } from "notistack"

import getLocalStorage from "../utils/getLocalStorage"
import setLocalStorage from "../utils/setLocalStorage"

const storageKey = "omdb-favs"

const Movies = () => {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const { enqueueSnackbar } = useSnackbar()

  const storageFavs = getLocalStorage(storageKey)

  const [favorites, setFavorites] = useState(storageFavs || [])

  useEffect(() => {
    favorites && setLocalStorage(storageKey, favorites)
  }, [favorites])

  const { data } = useQuery(SEARCH_MOVIES, {
    variables: { search, page },
  })

  const handleChange = event => {
    event.preventDefault()
    setSearch(event.target.value)
    setPage(1)
  }

  const movies = data?.movies?.Search?.map(movie => {
    return { title: movie.Title, id: movie.imdbID, year: movie.Year }
  })

  const results = movies?.filter(movie => {
    const title = movie.title
    const filterTitle = [title]
    return filterTitle.filter(title => title.toLowerCase().includes(search))
  })

  const addFav = ({ title, id, year }) => {
    const existingItem = favorites && favorites.find(item => item.id === id)

    if (!existingItem && favorites.length <= 4) {
      setFavorites([...favorites, { title, id, year }])
      enqueueSnackbar(`Added ${title} to favorites`, {
        iconVariant: "success",
        variant: "success",
      })
    }
  }

  const removeFav = ({ title, id }) => {
    const filteredFavs = favorites && favorites.filter(item => item.id !== id)
    setFavorites(filteredFavs)

    if (title) {
      enqueueSnackbar(`Removed ${title} from favorites`, { variant: "error" })
    }
  }

  const hasMaximumFavs = favorites?.length >= 5

  return (
    <Container>
      <BannerContainer>
        {hasMaximumFavs ? (
          <Typography color="inherit" variant="h4">
            Thanks for participating{" "}
            <span role="img" aria-label="heart">
              😍
            </span>
          </Typography>
        ) : (
          <Typography color="inherit" variant="h4">
            Choose 5 movies to nominate
          </Typography>
        )}
      </BannerContainer>

      <Typography variant="h6" gutterBottom>
        Page {page}
      </Typography>

      <TextField
        label="Search"
        aria-label="Search"
        placeholder="Type to filter movies..."
        value={search}
        onChange={handleChange}
      />

      <PrevNextBut>
        <Button
          disabled={page <= 1}
          variant="contained"
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <Button variant="contained" onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </PrevNextBut>

      {favorites &&
        favorites.map(fav => (
          <FavCard key={fav.id}>
            <Typography>
              {fav.title} {fav.year}
            </Typography>
            <FavButton
              variant="contained"
              color="secondary"
              onClick={() => removeFav({ ...fav })}
            >
              Remove
            </FavButton>
          </FavCard>
        ))}

      {results &&
        results?.map(item => {
          return (
            <Card key={item.id}>
              <div>
                <Typography>
                  {item.title} ({item.year})
                </Typography>
              </div>

              <Tooltip
                title="You already have maximum 5 favorites"
                placement="left"
                disableFocusListener={!hasMaximumFavs}
                disableTouchListener={!hasMaximumFavs}
                disableHoverListener={!hasMaximumFavs}
              >
                <div>
                  <Button
                    startIcon={<AddIcon />}
                    color="primary"
                    variant="contained"
                    disabled={
                      (!!favorites &&
                        !!favorites.find(({ id }) => id === item.id)) ||
                      hasMaximumFavs
                    }
                    onClick={() => addFav({ ...item })}
                  >
                    Add to Favorites
                  </Button>
                </div>
              </Tooltip>
            </Card>
          )
        })}
    </Container>
  )
}

export default Movies

const Container = styled.div``

const BannerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
`

const PrevNextBut = styled.div`
  padding: 10px, 0, 20px, 0;
  position: relative;
  margin: 10px 0;

  .MuiButton-root {
    margin-right: 20px;
  }
`
const FavCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #fff;
`

const FavButton = styled(Button)`
  border-radius: 2px;
  cursor: pointer;
  text-align: center;
`

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`
