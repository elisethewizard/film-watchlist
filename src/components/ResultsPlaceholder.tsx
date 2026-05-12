import { Link } from 'react-router'
import { TbCirclePlusFilled } from "react-icons/tb"

function ResultsPlaceholder() {
    return (
        <div className='main-content results-placeholder-cont'>
            <h2>Your watchlist is looking a little empty...</h2>
            <Link to='/' className='link'>
                <TbCirclePlusFilled size={18} />
                Let's add some movies!
            </Link>
        </div>
    )
}

export default ResultsPlaceholder