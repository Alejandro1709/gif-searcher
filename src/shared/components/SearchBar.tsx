import { useEffect, useState } from 'react'

interface SearchBarProps {
  placeholder?: string
  onQuery: (query: string) => void
}

const SearchBar = ({ placeholder = 'Buscar', onQuery }: SearchBarProps) => {
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      onQuery(query)
    }, 700)

    return () => {
      clearTimeout(timeout)
    }
  }, [query, onQuery])

  const handleSearch = () => {
    onQuery(query)
    //setQuery('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  )
}

export default SearchBar
