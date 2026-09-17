function Loading({ type }: { type: 'search'|'films' }) {
    return (
        <h1 className='main-content loading'>{ type === 'search' ? 'Searching' : 'Loading films' }...</h1>
    )
}

export default Loading