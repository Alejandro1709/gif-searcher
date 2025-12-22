import { useRef, useState } from 'react'
import type { Gif } from '../interfaces/gif.interface'
import { getGifsByQuery } from '../actions/get-gifs-by-query.action'

// const gifsCache: Record<string, Gif[]> = {}

const useGifs = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([])

  const [gifs, setGifs] = useState<Gif[]>([])

  const gifsCache = useRef<Record<string, Gif[]>>({})

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term])
      return
    }

    const data = await getGifsByQuery(term)

    setGifs(data)

    gifsCache.current[term] = gifs
  }

  const handleSearch = async (query: string) => {
    if (query.length === 0) return

    const sanitized = query.toLowerCase().trim()

    if (previousTerms.includes(sanitized) || previousTerms.length === 8) return

    setPreviousTerms([sanitized, ...previousTerms])

    const data = await getGifsByQuery(sanitized)

    setGifs(data)

    gifsCache.current[sanitized] = gifs
  }

  return {
    gifs,
    previousTerms,
    handleTermClicked,
    handleSearch,
  }
}

export default useGifs
