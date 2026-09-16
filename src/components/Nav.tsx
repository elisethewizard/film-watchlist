import { Link } from "react-router"

function Nav() {
    return (
        <nav>
            <Link to='/'>Find your film</Link>
            <Link to='/watchlist'>My Watchlist</Link>
        </nav>
    )
}

export default Nav