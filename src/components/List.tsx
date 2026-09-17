import { useEffect, useState } from "react"
import { getFilmOptions } from "../api"
import type { Film } from "../types"
import Card from "./Card"
import { useQueries } from "@tanstack/react-query"
import Error from "./Error"
import Loading from "./Loading"

function List({ ids }: { ids: string[] }) {
    const [films, setFilms] = useState<Film[]>([])
    const { data, error, isPending } = useQueries({
        queries: ids.map((id) => getFilmOptions(id)),
        combine: (filmQueries) => {
            return {
                data: filmQueries.map((query) => query.data),
                isPending: filmQueries.some((query) => query.isPending),
                error: filmQueries.find((query) => query.error)?.error,
            }
        },
    })

    useEffect(() => {

        // clear previous results
        setFilms([])

        if (data && data.every((film) => !!film)) {
            setFilms(data)
        }
        
    }, [data])
    
    if (error) {
        return <Error message={error.message} />
    }

    if (isPending || !films.length) {
        return <Loading type='films' />
    }

    return (
        <div className='main-content list-cont'>
            { films.map((element) => <Card film={element} key={element.id} />) }
        </div>
    )
}

export default List