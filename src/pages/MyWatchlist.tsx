import { useContext, useState } from 'react'
import WatchlistPlaceholder from '../components/WatchlistPlaceholder.tsx'
import List from '../components/List.tsx'
import { WatchlistContext } from '../ContextProviders.tsx'

function MyWatchlist() {
    const watchlist = useContext(WatchlistContext)
    const [page, setPage] = useState(1)

    return (
        <main>
            { watchlist.length ? 
            <List 
                ids={watchlist.slice(10 * (page - 1), 10 * page)} 
                pageData={{ page, setPage, hasMore: watchlist.length > (10 * page), isPlaceholderData: false }}
            /> :
            <WatchlistPlaceholder /> }
        </main>
    )
}

export default MyWatchlist