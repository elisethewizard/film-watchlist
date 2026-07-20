import { useEffect, useState } from 'react'
import type { Film } from '../types.ts'
import { getFilmsAll } from '../api.tsx'
import List from './List.tsx'
import { TbMovie } from 'react-icons/tb'

function PageContent(props: { page: 'search'|'watchlist', ids: string[] }) {
    const { page, ids } = props

    const [details, setDetails] = useState<Film[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        async function getFilms(ids: string[]) {
            setDetails([])
            setIsLoading(true) 
            setError(null)
            try {
                const data = await getFilmsAll(ids)
                setDetails(data)
            } catch(err) {
                setError(err)
            } finally {
                setIsLoading(false)
            }
        }

        if (!ids) {
            return
        }
        getFilms(ids)
    }, [ids])

    const pageContentType = error ? 'error' :
        isLoading ? 'loading' :
            details.length ? 'list' :
                'explore'

    switch (pageContentType) {
        case 'error':
            return (
                <h1 className='main-content error'>There was an error: {error || error.message}</h1>
            )
        case 'loading':
            return (
                <h1 className='main-content loading'>Loading...</h1>
            )
        case 'list':
            return (
                <List data={details} />
            )
        case 'explore':
            return (
                <div className='main-content results-placeholder-cont'>
                    <TbMovie size={74} strokeWidth={'1.5'} />
                    <h2>Start exploring</h2>
                </div>
            )
        default:
            throw new Error(`This is the default clause of the page content switch statement. It should never happen.`)
    }
}

export default PageContent