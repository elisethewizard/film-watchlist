import React from 'react'
import List from './List.jsx'
import { flushSync } from 'react-dom'
import { IconSearch, IconMovie } from "@tabler/icons-react"

const App = () => {
  const [query, setQuery] = React.useState('')
  const [details, setDetails] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const [watchlistState, setWatchlistState] = localStorage.getItem('watchlist') ? 
  React.useState(JSON.parse(localStorage.getItem('watchlist'))) :
  React.useState([])
    
  const getMovieRequest = async (req) => {
    setIsLoading(true)
    let data = []
    const url = `http://www.omdbapi.com/?apikey=38d99a91&s=${req}`
    const res = await fetch(url)
    const resJson = await res.json()
    if (resJson.Search) {
      for (let i = 0; i < resJson.Search.length; i++) {
        if (resJson.Search[i]) {
          const res2 = await fetch(`http://www.omdbapi.com/?apikey=38d99a91&plot=short&i=${resJson.Search[i].imdbID}`)
          const res2Json = await res2.json()
          data.push(res2Json)
        }  
      }
      setDetails(data)
    }
    setIsLoading(false)         
  }

  const search = () => {
    if (query) {
      getMovieRequest(query)
    } 
  }

  const toggle = (array, item) => {
    if (array.includes(item)) {
        array.splice((array.indexOf(item)), 1)
    } else {
        array.push(item)
    }
  }

  const toggleWatchlist = (id) => {
    let chosenFilm = details.filter(film => film.imdbID === id)[0]
    flushSync(() => {
      setWatchlistState(prevWatchlist => {
        let newWatchlist = prevWatchlist
        toggle(newWatchlist, chosenFilm)
        return newWatchlist
      })
    })
    localStorage.setItem('watchlist', JSON.stringify(watchlistState))
  }

  return (
    <div className='app-cont'>

      <div className='header-cont'>

        <header>
          <h1>Find your film</h1>
          <a href='../watchlist.html'>My Watchlist</a>
        </header>

        <div className='search-cont'>
          <div className='search-subcont'>
            <label htmlFor='search-input'>
              <IconSearch stroke={2} size={16} color='black' />
            </label>
            <input 
              placeholder='Search for a movie' 
              id='search-input' 
              value={query} 
              onChange={(e) => {setQuery(e.target.value)}} 
            />
          </div>
          <button onClick={search}>Search</button>
        </div>

      </div>

      <main>

        {isLoading ? 
          <h1 className='loading'>Loading...</h1> :
          <List data={details} watchlistState={watchlistState} toggleWatchlist={toggleWatchlist} />
        }

        {!details.length && !isLoading && <div className='results-placeholder-cont'>
            <IconMovie stroke={1.5} size={74} />
            <h2>Start exploring</h2>
          </div>
        }

      </main>

    </div>
  )
}

export default App