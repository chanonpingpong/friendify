import React from 'react'
import Router from 'next/router'

export function SigninPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-4">
      <p className="text-base">Welcome to</p>
      <img
        className="mt-4 h-24 md:h-48 object-center object-cover"
        src="/static/home-logo.svg"
        alt="main-logo"
      />
      <button
        className="mt-16 bg-green-500 hover:bg-green-400 py-3 px-20 text-sm md:text-base rounded-full text-white font-bold font-karla tracking-wide"
        onClick={() => Router.push('/spotify-signin')}
      >
        SIGN IN
      </button>
      <p className="mt-2 text-xs text-gray-500">Limited for spotify premium user only</p>
    </div>
  )
}
