import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import Router from 'next/router'

import { HomePage } from '../components/HomePage'

export default function Home() {
  const accessToken = Cookies.get('friendify-access-token')
  const refreshToken = Cookies.get('friendify-refresh-token')

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      Router.push('/signin')
    }
  }, [])

  return <HomePage />

  return
}
