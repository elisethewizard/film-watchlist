import { useEffect, useState } from "react"
import { getFilmOptions } from "../api"
import type { Film, PageData } from "../types"
import Card from "./Card"
import { useQueries } from "@tanstack/react-query"
import Error from "./Error"
import Loading from "./Loading"
import Pagination from "./Pagination"

function List({ ids, pageData }: { ids: string[], pageData: PageData }) {
    const { page, hasMore, isPlaceholderData } = pageData
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

    if (isPending || isPlaceholderData || !films.length) {
        return <Loading type='films' />
    }

    return (
        <div className='main-content'>
            <div className="list-cont">
                { films.map((element) => <Card film={element} key={element.id} />) }
            </div>
            {// show pagination if it's not an only page
            (page !== 1 || hasMore) && <Pagination {...pageData} /> }
        </div>
    )
}

export default List