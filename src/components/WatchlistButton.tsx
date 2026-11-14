import { useContext } from "react"
import { TbCirclePlusFilled, TbCircleMinus } from "react-icons/tb"
import { WatchlistContext, WatchlistDispatchContext } from "../ContextProviders"

function WatchlistButton({ id }: { id: string }) {
    const watchlist = useContext(WatchlistContext)
    const dispatch = useContext(WatchlistDispatchContext)!

    const isAdded = watchlist.some((idInWatchlist) => idInWatchlist === id)

    function toggleWatchlist() {
        const action = isAdded ? 'remove' : 'add'
        dispatch({ type: action, id: id })
    }

    return (
        <button 
            className='watchlist color-secondary'
            onClick={toggleWatchlist}
        >
            {isAdded ?   
            <>
                <TbCircleMinus size={18} color="currentColor" aria-hidden />
                Remove
            </> :
            <>
                <TbCirclePlusFilled size={18} color="currentColor" aria-hidden />
                Watchlist
            </>}
        </button>
    )
}

export default WatchlistButton