import { createContext, type ActionDispatch } from "react"
import type { Film } from "./types"

export const WatchlistContext = createContext<Film[]>([])
export const WatchlistDispatchContext = createContext<ActionDispatch<[action: { type: "add" | "remove"; film: Film; }]> | null>(null)