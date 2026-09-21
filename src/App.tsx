import { BrowserRouter, Routes, Route } from "react-router"
import Layout from './pages/Layout.tsx'
import Search from './pages/Search.tsx'
import MyWatchlist from './pages/MyWatchlist.tsx'
import ContextProviders from "./ContextProviders.tsx"

function App() {
    return (
        <ContextProviders>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Search />} />
                        <Route path='watchlist' element={<MyWatchlist />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ContextProviders>
    )
}

export default App