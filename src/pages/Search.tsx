import { useEffect, useState } from 'react'
import Searchbar from '../components/Searchbar.tsx'
import { getIdsOptions } from '../api.ts'
import List from '../components/List.tsx'
import PlaceholderSearch from '../components/SearchPlaceholder.tsx'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Error from '../components/Error.tsx'
import Loading from '../components/Loading.tsx'

function Search() {
    const queryClient = useQueryClient()
    const [queryFinal, setQueryFinal] = useState('')
    const [ids, setIds] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const { data, error, isPending, isPlaceholderData } = useQuery(getIdsOptions(queryFinal, page))

    useEffect(() => {
        if (data?.ids) {
            setIds(data.ids)
        }
    }, [data])

    useEffect(() => {
        queryClient.query(getIdsOptions(queryFinal, page))
    }, [page])

    return (
        <main className='search-cont'>
            <Searchbar setQueryFinal={setQueryFinal} />

            { isPending || isPlaceholderData ? <Loading type='search' /> :
            error ? <Error message={error.message} /> : 
            ids.length ? <List ids={ids} pageData={{ page, setPage, hasMore: data.hasMore, isPlaceholderData }} /> :
            <PlaceholderSearch /> }

        </main>
    )
}

export default Search