import { defineHandler } from "nitro"

export default defineHandler(async (event) => {
    const { query } = event.context.params!

    const url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${query}`
    const res = await fetch(url)

    if (!res.ok) {
        return res
    }

    const data = await res.json()
    return data
})