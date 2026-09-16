import { useEffect, useState } from "react"
import { fetchFilms } from "../api"
import type { Film } from "../types"
import Card from "./Card"

function List({ ids }: { ids: string[] }) {
    const [data, setData] = useState<Film[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        async function getFilms(ids: string[]) {
            setIsLoading(true)

            // clear previous data
            if (data) {
                setData([])
            }

            setError(null)
            try {
                const data = await fetchFilms(ids)
                setData(data)
            } catch (err) {
                setError(err)
            } finally {
                setIsLoading(false)
            }
        }
        getFilms(ids)
    }, [ids])
    
    if (error) {
        return (
            <h1 className='main-content error'>There was an error: {error || error.message}</h1>
        )
    }

    if (isLoading || !data.length) {
        return (
            <h1 className='main-content loading'>Loading...</h1>
        )
    }

    return (
        <div className='main-content list-cont'>
            { data.map(element => <Card film={element} key={element.id} />) }
        </div>
    )
}

export default List