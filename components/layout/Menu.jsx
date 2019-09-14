import React from 'react'
import Link from 'next/link'

export function Menu(props) {
  function getTabClass(tab_name) {
    return `
    flex flex-col justify-center items-center text-xs cursor-pointer
    ${tab_name !== props.tab && `text-gray-500`}
    `
  }

  return (
    <div className="w-full fixed bottom-0 flex bg-white py-2">
      <div className="flex flex-1 justify-center">
        <Link href="/">
          <div className={getTabClass('home')}>
            <i className="material-icons">home</i>
            Home
          </div>
        </Link>
      </div>
      <div className="flex flex-1 justify-center">
        <Link href="/search">
          <div className={getTabClass('search')}>
            <i className="material-icons">search</i>
            Search
          </div>
        </Link>
      </div>
      <div className="flex flex-1 flex-col px-3 justify-center items-center text-xs text-gray-500">
        <i className="material-icons">library_music</i>
        My playlist
      </div>
      <div className="flex flex-1 flex-col px-3 justify-center items-center text-xs text-gray-500">
        <i className="material-icons">account_circle</i>
        Profile
      </div>
    </div>
  )
}
