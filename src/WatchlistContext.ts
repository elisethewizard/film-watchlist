import { createContext, type ActionDispatch } from "react"

export const WatchlistContext = createContext<string[]>([])
export const WatchlistDispatchContext = createContext<ActionDispatch<[action: { type: "add" | "remove"; id: string; }]> | null>(null)