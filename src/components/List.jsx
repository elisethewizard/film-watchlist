import React from 'react'
import Card from './Card.jsx'

const List = (props) => {
    return (
        <div className='results-cont'>
            {props.data.map(film => (
                <Card 
                    key={film.imdbID} 
                    id={film.imdbID} 
                    poster={film.Poster} 
                    title={film.Title} 
                    rating={film.imdbRating} 
                    duration={film.Runtime} 
                    genres={film.Genre} 
                    description={film.Plot}
                    toggleWatchlist={props.toggleWatchlist}
                    watchlistState={props.watchlistState}/>
                )
            )}
        </div>
    )
}

export default List