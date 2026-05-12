import { Outlet, Link } from "react-router-dom"

function Layout() {
    return (
        <div className='app-cont'>
            <nav>
                <Link to='/'>Find your film</Link>
                <Link to='/watchlist'>My Watchlist</Link>
            </nav>

            <Outlet />
        </div>
    )
}

export default Layout