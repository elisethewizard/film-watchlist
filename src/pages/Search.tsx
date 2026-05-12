import { useState } from 'react'
import List from '../components/List.tsx'
import Searchbar from '../components/Searchbar.tsx'
import { TbMovie } from "react-icons/tb"
import type { Film } from '../types.ts'

function Search() {
    const [details, setDetails] = useState<Film[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<any>(null)

    async function getFilmRequest(req: string) {
        setDetails([])
        setIsLoading(true) 
        setError(null)
        try {
            const url = `https://www.omdbapi.com/?apikey=38d99a91&s=${req}`
            const res = await fetch(url)
            const resJson = await res.json()
            const ids = resJson.Search.map((item: any) => item.imdbID)
            if (!ids) {
                setError('Fetch finished with invalid response.')
                return
            }
            await getDetils(ids)
        } catch(err) {
            setError(err)
        } finally {
            setIsLoading(false)
        }
    }

    async function getDetils(ids: string[]) {
        ids.forEach(async (id: string) => {
            const detailUrl = `https://www.omdbapi.com/?apikey=38d99a91&plot=short&i=${id}`
            const detailRes = await fetch(detailUrl)
            const detailJson = await detailRes.json()

            if (!detailJson || !(detailJson.Response)) {
                setError('Detail fetch finished with invalid response.')
                return
            }

            const { imdbID, Title, Poster, imdbRating, Runtime, Genre, Plot } = detailJson
            const newFilm: Film = {
                id: imdbID,
                title: Title,
                poster: Poster !== 'N/A' ? Poster : null,
                rating: imdbRating !== 'N/A' ? imdbRating : null,
                duration: Runtime !== 'N/A' ? Runtime : null,
                genres: Genre !== 'N/A' ? Genre : null,
                description: Plot !== 'N/A' ? Plot : null,
            }
            setDetails(prevDetails => [...prevDetails, newFilm])
        })
    }

    function PageContent() {
        const pageContentType = error ? 'error' :
            isLoading ? 'loading' :
                details.length ? 'search results' :
                    'explore'
        
        switch (pageContentType) {
            case 'error':
                return (
                    <h1 className='main-content error'>There was an error: {error}</h1>
                )
            case 'loading':
                return (
                    <h1 className='main-content loading'>Loading...</h1>
                )
            case 'search results':
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
               setError(`This is the default clause of the page content switch statement. It should never happen.`)
               return (
                    <h1 className='main-content error'>There was an error: {error}</h1>
                )
        }
    }

    return (
        <main className='search-cont'>
            <Searchbar getFilmRequest={getFilmRequest} />
            <PageContent />
        </main>
    )
}

export default Search