import { BrowserRouter, Routes, Route } from "react-router"
import { useReducer, useEffect, useRef } from "react"
import type { Film } from './types.ts'
import Layout from './pages/Layout.tsx'
import Search from './pages/Search.tsx'
import MyWatchlist from './pages/MyWatchlist.tsx'
import watchlistReducer from './watchlistReducer.js'
import { WatchlistContext, WatchlistDispatchContext } from './WatchlistContext.js'

function App() {
    const [watchlist, dispatch] = useReducer(watchlistReducer, null, createInitState)
    const firstUpdate = useRef(true)

    function createInitState(): Film[] {
        return localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')!) : []
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return
        }
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
        return () => {
            firstUpdate.current = true
        }
    }, [watchlist])

    return (
        <WatchlistContext value={watchlist}>
            <WatchlistDispatchContext value={dispatch}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Search />} />
                            <Route path='watchlist' element={<MyWatchlist />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </WatchlistDispatchContext>
        </WatchlistContext>
    )
}

export default App