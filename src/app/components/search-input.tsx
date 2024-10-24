import React, { useState, useEffect } from 'react'

interface SearchInputProps {
  onSearch: (term: string) => void
  onClear: () => void
  loading: boolean
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, onClear, loading }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)

  const handleClear = () => {
    setSearchTerm('')
    onClear()
  }

  // wait for 500 ms between typing to perform search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length > 2) {
      onSearch(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm, onSearch])

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        value={searchTerm}
        disabled={loading}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="w-full pl-4 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
      )}
    </div>
  )
}

export default SearchInput
