import { useEffect, useState } from 'react'
import Searchbar from '../components/Searchbar.tsx'
import { getIdsOptions } from '../api.ts'
import List from '../components/List.tsx'
import PlaceholderSearch from '../components/SearchPlaceholder.tsx'
import { useQuery } from '@tanstack/react-query'
import Error from '../components/Error.tsx'
import Loading from '../components/Loading.tsx'

function Search() {
    const [queryFinal, setQueryFinal] = useState('')
    const [ids, setIds] = useState<string[]>([])
    const { data, error, isPending } = useQuery(getIdsOptions(queryFinal))

    useEffect(() => {
        if (data) {
            setIds(data)
        }
    }, [data])

    return (
        <main className='search-cont'>
            <Searchbar setQueryFinal={setQueryFinal} />

            { isPending ? <Loading type='search' /> :
            error ? <Error message={error.message} /> : 
            ids.length ? <List ids={ids} /> : 
            <PlaceholderSearch /> }
            
        </main>
    )
}

export default Search