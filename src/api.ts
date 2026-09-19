import { queryOptions } from '@tanstack/react-query'
import type { Film } from "./types"

function formatFilm(data: any) {
    const { imdbID, Title, Poster, imdbRating, Runtime, Genre, Plot } = data
    const newFilm: Film = {
        id: imdbID,
        title: Title,
        poster: Poster !== 'N/A' ? Poster : null,
        rating: imdbRating !== 'N/A' ? imdbRating : null,
        duration: Runtime !== 'N/A' ? Runtime : null,
        genres: Genre !== 'N/A' ? Genre : null,
        description: Plot !== 'N/A' ? Plot : null,
    }
    return newFilm
}

async function fetchIds(search: string) {
    if (!search) {
        return []
    }
    const url = `/api/search/${search}`
    const res = await fetch(url)
    const data = await res.json()

    if (!data || !data.Response) {
        throw new Error('Fetch finished with invalid response.')
    }

    if (!data.Search || !data.Search.length) {
        throw new Error(`Sorry, we couldn't find any films that match your search.`)
    }
    
    const ids: string[] = data.Search.map((item: any) => item.imdbID)

    return ids
}

async function fetchFilm(id: string) {
    const url = `/api/id/${id}`
    const res = await fetch(url)
    const data = await res.json()

    if (!data || !(data.Response)) {
        throw new Error('Detail fetch finished with invalid response.')
    }

    return formatFilm(data)
}

export function getIdsOptions(search: string) {
    return queryOptions({
        queryKey: ['search', search],
        queryFn: async () => await fetchIds(search),
    })
}

export function getFilmOptions(id: string) {
    return queryOptions({
        queryKey: ['id', id],
        queryFn: async () => await fetchFilm(id),
    })
}