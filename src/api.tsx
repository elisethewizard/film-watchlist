import type { Film } from "./types"

const cache: Record<string, any> = {}

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

async function cached(key: string, callback: (...args: any[]) => any) {
    if (cache[key]) {
        return cache[key]
    }
    const data = await callback(key)
    cache[key] = data
    return data
}

async function getIdsBySearch(search: string) {
    const url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${search}`
    const res = await fetch(url)
    const data = await res.json()

    if (!data || !(data.Search)) {
        throw new Error('Fetch finished with invalid response.')
    }
    
    const ids: string[] = data.Search.map((item: any) => item.imdbID)

    return ids
}

export async function fetchIds(search: string) {
    return cached(search, getIdsBySearch)
}

async function getFilmById(id: string) {
    const url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&plot=short&i=${id}`
    const res = await fetch(url)
    const data = await res.json()

    if (!data || !(data.Response)) {
        throw new Error('Detail fetch finished with invalid response.')
    }

    return formatFilm(data)
}

async function fetchFilm(id: string) {
    return cached(id, getFilmById)
}

export async function fetchFilms(ids: string[]) {
    const promises = ids.map(id => fetchFilm(id))
    const results = await Promise.allSettled(promises)
    const data = results.filter(res => res.status === 'fulfilled').map(res => res.value)
    return data
}