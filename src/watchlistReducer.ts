export default function watchlistReducer(state: string[], action: { type: 'add' | 'remove', id: string }): string[] {
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