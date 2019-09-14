import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import Router from 'next/router'

import { SigninPage } from '../components/SigninPage'

export default function Home() {
  const accessToken = Cookies.get('friendify-access-token')
  const refreshToken = Cookies.get('friendify-refresh-token')

  useEffect(() => {
    if (accessToken && refreshToken) {
      Router.push('/')
    }
  }, [])

  return <SigninPage />
}
