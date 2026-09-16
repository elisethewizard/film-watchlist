import { BrowserRouter, Routes, Route } from "react-router"
import Layout from './pages/Layout.tsx'
import Search from './pages/Search.tsx'
import MyWatchlist from './pages/MyWatchlist.tsx'
import ContextLogic from "./ContextLogic.tsx"

function App() {
    return (
        <ContextLogic>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Search />} />
                        <Route path='watchlist' element={<MyWatchlist />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ContextLogic>
    )
}

export default App