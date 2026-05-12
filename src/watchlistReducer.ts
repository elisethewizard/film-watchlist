import type { Film } from "./types"

export default function watchlistReducer(state: Film[], action: { type: 'add' | 'remove', film: Film }): Film[] {
    switch (action.type) {
        case 'add': {
            return [...state, action.film];
        }
        case 'remove': {
            return state.filter((film: Film) => film.id !== action.film.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}