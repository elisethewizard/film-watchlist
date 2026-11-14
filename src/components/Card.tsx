import { TbStarFilled } from "react-icons/tb"
import type { Film } from '../types.ts'
import Description from "./Description.tsx"
import WatchlistButton from "./WatchlistButton.tsx"

function Card(props: { film: Film }) {
    const { id, title, poster, rating, duration, genres, description } = props.film

    return (
        <li className='card-cont'>

            <img
                className='poster'
                src={poster ? poster : '/assets/poster-placeholder.png'}
                alt={`Poster of ${title}.`}
            />

            <div className='header'>
                <h1 className='title'>{title}</h1>
                {rating && <div className='rating'>
                    <TbStarFilled color='#FEC654' size={16} aria-hidden />
                    <p>{rating}</p>
                </div>}
            </div>

            <p className='duration'>{duration ? duration : 'no data'}</p>
            {genres && <p className='genres'>{genres}</p>}
            <WatchlistButton id={id} />
            <Description desc={description} />

        </li>
    )
}

export default Card