import { TbCirclePlusFilled, TbCircleMinus, TbStarFilled } from "react-icons/tb"
import type { Film } from '../types.ts'
import { WatchlistContext, WatchlistDispatchContext } from "../WatchlistContext.ts"
import { useContext, useState } from "react"

function Card(props: { film: Film }) {
    const dispatch = useContext(WatchlistDispatchContext)!
    const watchlist = useContext(WatchlistContext)
    const { film } = props
    const { id, title, poster, rating, duration, genres, description } = film
    const [readMore, setReadMore] = useState(false)

    const isAdded = watchlist.some(idInWatchlist => idInWatchlist === id)

    function getDesc() {
        { /* ↓ Previous version for reference. */
        /* const descIsLong = description.length > 230 && description.slice(0, 230).split('. ').length > 1 */
        /* const descShort = description.slice(0, 230).split('. ')
        const removed = descShort.pop()
        const descStart = descShort.join('. ')
        const descEnd = [removed, description.slice(230)].join('') */ }
        if (!description) {
            return (
                <>Description unavailable.</>
            )
        }
        const descIsLong = description.length > 250
        if (!descIsLong) {
            return (
                <>{description}</>
            )
        }
        const descShort = description.slice(0, 230)
        return (
            <p>
                {readMore ? description : `${descShort.trim()}..`}
                <span
                    className='desc-span'
                    role="button"
                    onClick={() => setReadMore(prev => !prev)}
                >
                    {readMore ? 'Hide' : 'Read more'}
                </span>
            </p>
        )
    }

    function toggleWatchlist() {
        const action = isAdded ? 'remove' : 'add'
        dispatch({ type: action, id: id })
    }

    return (
        <div className='card-cont'>

            <img className='poster' src={poster ? poster : '/assets/poster-placeholder.png'} />

            <div className='header'>
                <h1 className='title'>{title}</h1>
                {
                    rating && <div className='rating'>
                        <TbStarFilled color='#FEC654' size={16} />
                        <p>{rating}</p>
                    </div>
                }
            </div>

            <p className='duration'>{ duration ? duration : 'no data' }</p>

            { genres && <p className='genres'>{genres}</p> }

            <div className='watchlist' onClick={toggleWatchlist}>
                {
                    isAdded ? <>
                        <TbCircleMinus className="icon" size={18} />
                        Remove
                    </> :
                        <>
                            <TbCirclePlusFilled className="icon" size={18} />
                            Watchlist
                        </>
                }
            </div>

            <div className='desc'>{ getDesc() }</div>

        </div>

    )
}

export default Card