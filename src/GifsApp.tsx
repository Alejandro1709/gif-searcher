import { useState } from 'react'
import GifList from './gifs/components/GifList'
import PreviousSearches from './gifs/components/PreviousSearches'
import CustomHeader from './shared/components/CustomHeader'
import SearchBar from './shared/components/SearchBar'
import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.action'
import type { Gif } from './gifs/interfaces/gif.interface'

const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([])

  const [gifs, setGifs] = useState<Gif[]>([])

  const handleTermClicked = (term: string) => {
    console.log(term)
  }

  const handleSearch = async (query: string) => {
    if (query.length === 0) return

    const sanitized = query.toLowerCase().trim()

    if (previousTerms.includes(sanitized) || previousTerms.length === 8) return

    setPreviousTerms([sanitized, ...previousTerms])

    const data = await getGifsByQuery(sanitized)

    setGifs(data)
  }

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto"
      />

      {/* Search */}
      <SearchBar placeholder="Buscar Gifs" onQuery={handleSearch} />

      {/* Busquedas Previas */}
      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      {/* Gifs */}
      <GifList gifs={gifs} />
    </>
  )
}

export default GifsApp
