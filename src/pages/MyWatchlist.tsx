import { useContext } from 'react'
import { WatchlistContext } from '../WatchlistContext.ts'
import List from '../components/List.tsx'
import ResultsPlaceholder from '../components/ResultsPlaceholder.tsx'

function MyWatchlist() {
    const watchlist = useContext(WatchlistContext)

    return (
        <main>
            { watchlist.length ? <List data={watchlist} /> :
                <ResultsPlaceholder /> }
        </main>
    )
}

export default MyWatchlist