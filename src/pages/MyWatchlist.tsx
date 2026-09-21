import { useContext } from 'react'
import WatchlistPlaceholder from '../components/WatchlistPlaceholder.tsx'
import List from '../components/List.tsx'
import { WatchlistContext } from '../ContextProviders.tsx'

function MyWatchlist() {
    const watchlist = useContext(WatchlistContext)

    return (
        <main>
            { watchlist.length ? <List ids={watchlist} /> :
                <WatchlistPlaceholder /> }
        </main>
    )
}

export default MyWatchlist