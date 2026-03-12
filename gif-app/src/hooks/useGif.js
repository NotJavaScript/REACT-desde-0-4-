import { useContext, useEffect, useState } from "react"
import getGifs from "services/getGifs"
import  GifsContext from "context/GifsContext"

const INITIAL_PAGE = 0

export function useGifs ({ keyword } = { keyword: null }) {
    const [loading, setLoading] = useState(false)
    const [loadingNextPage, setLoadingNexPage] = useState(false)
    const [page, setPage] = useState(INITIAL_PAGE)
    const {gifs, setGifs} = useContext(GifsContext)

            const keywordToUse = keyword || localStorage.getItem('lastKeyword') || 'random'

    useEffect(function () {
        setLoading(true)
        // Recuperamos la keyword del localStorage

        getGifs({ keyword: keywordToUse })
            .then(gifs => {
                setGifs(gifs)
                setLoading(false)
                // Guardamos la keyword en el localStorage
                localStorage.setItem('lastKeyword', keyword)
            })
    }, [keyword, keywordToUse, setGifs])

    useEffect(function () {
        if(page === INITIAL_PAGE) return

        setLoadingNexPage(true)

        getGifs({ keyword: keywordToUse, page })
        .then(nextGifs => {
            setGifs(prevGifs => prevGifs.concat(nextGifs))
            setLoadingNexPage(false)
        })
    }, [page, keywordToUse, setGifs])
    return {loading, loadingNextPage, gifs, setPage}
}