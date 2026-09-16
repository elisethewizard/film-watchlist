import { useState } from 'react'
import Searchbar from '../components/Searchbar.tsx'
import { fetchIds } from '../api.ts'
import List from '../components/List.tsx'
import PlaceholderSearch from '../components/SearchPlaceholder.tsx'

function Search() {
    const [ids, setIds] = useState<string[]>([])

    async function searchFilms(query: string) {
        const data = await fetchIds(query)
        setIds(data)
    }
    
    return (
        <main className='search-cont'>
            <Searchbar searchFilms={searchFilms} />
            { ids.length ? <List ids={ids} /> : <PlaceholderSearch /> }
        </main>
    )
}

export default Search