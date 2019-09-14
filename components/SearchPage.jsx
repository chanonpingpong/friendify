import React, { useState } from 'react'

import MainLayout from './layout/MainLayout'
import { search } from '../spotify/search'
import { play } from '../spotify/player'

export function SearchPage() {
  const [keywords, setKeywords] = useState('')
  const [searching, setSearching] = useState(false)
  const [didSearch, setDidSearch] = useState(false)
  const [results, setResults] = useState({ tracks: { items: [] } })

  async function searchTracks(e) {
    e.preventDefault()
    setSearching(true)
    setResults({ tracks: { items: [] } })
    const { data } = await search(keywords)
    setResults(data)
    setSearching(false)
    setDidSearch(true)
  }

  function addQueue(trackURI) {
    play(trackURI)
  }

  return (
    <MainLayout tab="search">
      <div className="flex flex-col justify-center px-4 sm:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
        <p className="text-xl font-bold">Search</p>
        <form onSubmit={searchTracks}>
          <input
            className="mt-4 border w-full appearance-none rounded focus:outline-none focus:border-gray-900 p-3"
            type="text"
            placeholder="some keywords..."
            value={keywords}
            onChange={e => setKeywords(e.target.value)}
          />
        </form>

        <p className="text-xl font-bold mt-4">Result</p>

        {results.tracks.items.length === 0 && !searching && (
          <div className="h-64 w-full flex items-center justify-center">
            {!didSearch ? (
              <p className="text-gray-500">Try to search your favorite one!</p>
            ) : (
              <p>No result for what you looking for!</p>
            )}
          </div>
        )}

        {searching && (
          <div className="h-64 w-full flex items-center justify-center">
            <p className="text-gray-500">Searching...</p>
          </div>
        )}

        {results.tracks.items.map(item => (
          <div key={item.id} className="w-full py-4 flex items-center h-20 mt-4">
            <img
              className="object-center object-cover shadow-md w-20"
              src={item.album.images[1].url}
              alt="album-cover"
            />

            <div className="px-4 flex flex-col justify-center w-3/5">
              <p className="font-bold truncate">{item.album.name}</p>
              <p className="text-sm truncate">{item.artists[0].name}</p>
              <p className="text-xs text-gray-500 truncate">{item.album.name}</p>
            </div>
            <div
              className="py-4 flex flex-col justify-center items-center h-20 w-1/5 text-xs cursor-pointer"
              onClick={() => addQueue(item.uri)}
            >
              <i className="material-icons">playlist_add</i>Add queue
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}
