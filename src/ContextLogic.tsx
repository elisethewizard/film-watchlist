import { createContext, useEffect, useReducer, useRef, type ActionDispatch, type ReactNode } from "react"

export const WatchlistContext = createContext<string[]>([])
export const WatchlistDispatchContext = createContext<ActionDispatch<[action: { type: "add" | "remove"; id: string; }]> | null>(null)

function watchlistReducer(state: string[], action: { type: 'add' | 'remove', id: string }): string[] {
    switch (action.type) {
        case 'add': {
            return [...state, action.id];
        }
        case 'remove': {
            return state.filter((id: string) => id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

export default function ContextLogic({ children }: { children: ReactNode }) {
    const firstUpdate = useRef(true)
    const [watchlist, dispatch] = useReducer(watchlistReducer, null, createInitState)

    function createInitState(): string[] {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')!) : []
        }
        return []
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return
        }
        if (typeof window !== 'undefined') {
            localStorage.setItem('watchlist', JSON.stringify(watchlist))
        }
        return () => {
            firstUpdate.current = true
        }
    }, [watchlist])

    return (
        <WatchlistContext value={watchlist}>
            <WatchlistDispatchContext value={dispatch}>
                {children}
            </WatchlistDispatchContext>
        </WatchlistContext>
    )
}