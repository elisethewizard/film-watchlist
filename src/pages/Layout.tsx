import { Outlet } from "react-router"
import Nav from "../components/Nav"

function Layout() {
    return (
        <div className='app-cont'>
            <Nav />
            <Outlet />
        </div>
    )
}

export default Layout