import { useContext } from 'react'
import { WatchlistContext } from '../WatchlistContext.ts'
import ResultsPlaceholder from '../components/ResultsPlaceholder.tsx'
import PageContent from '../components/PageContent.tsx'

function MyWatchlist() {
    const watchlist = useContext(WatchlistContext)

    return (
        <main>
            { watchlist.length ? <PageContent page='watchlist' ids={watchlist} /> :
                <ResultsPlaceholder /> }
        </main>
    )
}

export default MyWatchlist