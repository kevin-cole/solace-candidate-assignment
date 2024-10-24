"use client";

import { Advocate } from './types'
import SearchInput from './components/search-input'

import { useState, useCallback } from "react";

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
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <SearchInput onSearch={onSearch} onClear={onClear} loading={loading} />
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocateSearchResult.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div key={s}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
