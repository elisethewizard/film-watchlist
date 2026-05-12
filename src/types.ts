interface Film {
    id: string,
    title: string,
    poster: string | null,
    rating: string | null,
    duration: string | null,
    genres: string | null,
    description: string | null,
}

export type { Film }