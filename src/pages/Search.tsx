import { useState } from 'react'
import Searchbar from '../components/Searchbar.tsx'
import { fetchIds } from '../api.tsx'
import PageContent from '../components/PageContent.tsx'

function Search() {
    const [searchQuery, setSearchQuery] = useState('')
    const [ids, setIds] = useState<string[]>([])

    async function searchFilms(s: string) {
        const data = await fetchIds(s)
        setIds(data)
    }
    
    return (
        <main className='search-cont'>
            <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchFilms={searchFilms} />
            <PageContent page='search' ids={ids} />
        </main>
    )
}

export default Search