import { useContext } from "react"
import { TbCirclePlusFilled, TbCircleMinus } from "react-icons/tb"
import { WatchlistContext, WatchlistDispatchContext } from "../ContextLogic"

function WatchlistButton({ id }: { id: string }) {
    const watchlist = useContext(WatchlistContext)
    const dispatch = useContext(WatchlistDispatchContext)!

    const isAdded = watchlist.some((idInWatchlist) => idInWatchlist === id)

    function toggleWatchlist() {
        const action = isAdded ? 'remove' : 'add'
        dispatch({ type: action, id: id })
    }

    return (
        <div 
            className='watchlist'
            role="button"
            onClick={toggleWatchlist}
        >
            {isAdded ?   
            <>
                <TbCircleMinus className="icon" size={18} />
                Remove
            </> :
            <>
                <TbCirclePlusFilled className="icon" size={18} />
                Watchlist
            </>}
        </div>
    )
}

export default WatchlistButton