import { useState } from 'react'
import type { Gif } from '../interfaces/gif.interface'
import { getGifsByQuery } from '../actions/get-gifs-by-query.action'

const useGifs = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([])

  const [gifs, setGifs] = useState<Gif[]>([])

  const handleTermClicked = async (term: string) => {
    const data = await getGifsByQuery(term)

    setGifs(data)
  }

  const handleSearch = async (query: string) => {
    if (query.length === 0) return

    const sanitized = query.toLowerCase().trim()

    if (previousTerms.includes(sanitized) || previousTerms.length === 8) return

    setPreviousTerms([sanitized, ...previousTerms])

    const data = await getGifsByQuery(sanitized)

    setGifs(data)
  }

  return {
    gifs,
    previousTerms,
    handleTermClicked,
    handleSearch,
  }
}

export default useGifs
