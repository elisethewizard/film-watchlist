import React from 'react'
import List from './List.jsx'
import { IconCirclePlusFilled } from "@tabler/icons-react"
import { flushSync } from 'react-dom'

const WatchlistPage = () => {

    const [watchlistState, setWatchlistState] = localStorage.getItem('watchlist') ? 
    React.useState(JSON.parse(localStorage.getItem('watchlist'))) :
    React.useState([])

    const toggle = (array, item) => {
        if (array.includes(item)) {
            array.splice((array.indexOf(item)), 1)
        } else {
            array.push(item)
        }
    }
        
    const toggleWatchlist = (id) => {
        let chosenFilm = watchlistState.filter(film => film.imdbID === id)[0]
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
                    <h1>My Watchlist</h1>
                    <a href='../index.html'>Search for movies</a>
                </header>
            </div>

            <main>

                {watchlistState.length ? 
                <List data={watchlistState} watchlistState={watchlistState} toggleWatchlist={toggleWatchlist} /> :
                <div className='results-placeholder-cont'>
                    <h2>Your watchlist is looking a little empty...</h2>
                    <a href='../index.html'>
                        <IconCirclePlusFilled size={18} color='#363636' />
                        Let's add some movies!
                    </a>
                </div>}

            </main>
        </div>
    )
}

export default WatchlistPage