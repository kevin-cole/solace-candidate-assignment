"use client";

import { Advocate } from './types'
import SearchInput from './components/search-input'

import { useState, useCallback } from "react";
import AdvocateTable from './components/advocate-list';

export default function Home() {
  const [advocateSearchResult, setAdvocateSearchResult] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState<boolean>(false)

  const onSearch = useCallback((term: string) => {
    setLoading(true)

    fetch(`/api/advocates?term=${term}`).then((response) => {
      if (!response.ok) {
        setAdvocateSearchResult([])
        // show error here
        return
      }
      response.json().then((jsonResponse) => {
        setAdvocateSearchResult(jsonResponse.data);
      });
    })
    .finally(() => setLoading(false));
  },
  []);

  const onClear = useCallback(() => {
    setAdvocateSearchResult([])
  }, [])

  return (
    <main className='m-6'>
      <header className="bg-gradient-to-b from-green-800 to-white shadow-md p-4 h-20 flex items-center justify-center rounded-lg">
        <h1 className="text-2xl font-bold text-white">Solace Advocates</h1>
      </header>
      <br />
      <div>
        <SearchInput onSearch={onSearch} onClear={onClear} loading={loading} />
      </div>
      <br />
      <div>
        <AdvocateTable advocates={advocateSearchResult} />
      </div>
    </main>
  );
}
