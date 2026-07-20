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
    saveFilmToStorage(newFilm)
    return newFilm
}

function saveFilmToStorage(film: Film) {
    const filmsExist = window.sessionStorage.getItem('films')

    if (filmsExist) {
        const existingData: Film[] = JSON.parse(window.sessionStorage.getItem('films')!)
        const newValue = [...existingData, film]
        window.sessionStorage.setItem('films', JSON.stringify(newValue))
    } else {
        window.sessionStorage.setItem('films', JSON.stringify([film]))
    }
}

export async function getIdsBySearch(search: string) {
    const url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${search}`
    const res = await fetch(url)
    const data = await res.json()

    if (!data || !(data.Search)) {
        throw new Error('Fetch finished with invalid response.')
    }
    
    const ids: string[] = data.Search.map((item: any) => item.imdbID)

    return ids
}

export async function getFilmViaFetch(id: string) {
    const url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&plot=short&i=${id}`
    const res = await fetch(url)
    const data = await res.json()

    if (!data || !(data.Response)) {
        throw new Error('Detail fetch finished with invalid response.')
    }

    return formatFilm(data)
}

export function getFilmViaStorage(id: string) {
    const filmInStorage: Film = window.sessionStorage.getItem('films') &&
        JSON.parse(window.sessionStorage.getItem('films')!).find((film: Film) => film.id === id)

    if (!filmInStorage) {
        return null
    }
    
    return filmInStorage
}

export async function getFilmById(id: string) {
    const film = getFilmViaStorage(id) || await getFilmViaFetch(id)
    return film
}

export async function getFilmsAll(ids: string[]) {
    const promises = ids.map(id => getFilmById(id))
    const promise = await Promise.allSettled(promises)
    const data = promise.filter(res => res.status === 'fulfilled').map(res => res.value)
    return data
}