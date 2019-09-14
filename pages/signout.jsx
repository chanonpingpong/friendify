import React, { useEffect } from 'react'
import Cookies from 'js-cookie'

import Router from 'next/router'

export default function Signout() {
  useEffect(() => {
    Cookies.remove('friendify-access-token')
    Cookies.remove('friendify-refresh-token')
    Router.push('/signin')
  }, [])

  return <div />
}
