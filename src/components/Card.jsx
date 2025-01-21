import React from 'react'
import { IconCirclePlusFilled, IconCircleMinus, IconStarFilled } from "@tabler/icons-react"

export default function Card(props){
    const [, forceUpdate] = React.useReducer(x => x + 1, 0)

    const isAdded = props.watchlistState.some(film => film.imdbID === props.id)

    const handleClick = () => {
        props.toggleWatchlist(props.id) 
        forceUpdate()
    }

    return (
        <div className='card-cont'>

            <img className='poster' src={props.poster !== 'N/A' ? props.poster : 'src/assets/poster-placeholder.png'}/> 

            <div className='header'>
                <h1 className='title'>{props.title}</h1>
                {props.rating !== 'N/A' && <div className='rating'>
                    <IconStarFilled color='#FEC654' size={15} />
                    <p>{props.rating}</p>
                </div>}
            </div>

            <p className='duration'>{props.duration !== 'N/A' ? props.duration : 'no data'}</p>
            {props.genres !== 'N/A' && <p className='genres'>{props.genres}</p>}

            <div className='watchlist' onClick={handleClick}>
                {isAdded ?
                <p>
                    <IconCircleMinus size={16} />
                    Remove
                </p> :
                <p>
                    <IconCirclePlusFilled size={16} />
                    Watchlist
                </p>}
            </div>

            {props.description.length > 230 ? (() => {
                let descShort = props.description.slice(0, 230).split('. ')
                if (descShort.length > 1) {
                    let removed = descShort.pop()
                    descShort = descShort.join('. ').concat('.')
                    let descExtra = [removed, props.description.slice(230)].join('')
                    return (
                        <div className='desc'>
                            <p className='desc-short'>{descShort} </p>
                            <span className='desc-dots'>... </span>
                            <p className='desc-extra'>{descExtra} </p>
                            <input type='checkbox' className='desc-checkbox' id={`desc-checkbox-${props.id}`} />
                            <label className='desc-label' htmlFor={`desc-checkbox-${props.id}`}></label>
                        </div>
                    )
                } else {
                    return <div className='desc'>{props.description}</div>
                }         
            })() : 
            props.description !== 'N/A' ? <div className='desc'>{props.description}</div> :
            <div className='desc'>Description unavailable.</div>}

        </div>
        
    )
}