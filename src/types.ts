import type { Dispatch, SetStateAction } from "react"

interface Film {
    id: string,
    title: string,
    poster: string | null,
    rating: string | null,
    duration: string | null,
    genres: string | null,
    description: string | null,
}

type PageData = {
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
    hasMore: boolean | undefined,
    isPlaceholderData: boolean,
}

export type { Film, PageData }