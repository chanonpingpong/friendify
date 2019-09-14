import '../styles/index.css'

import React, { Fragment } from 'react'
import App from 'next/app'
import Head from 'next/head'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Fragment>
        <Head>
          <title>Friendify! 🌈🎵✨</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="icon" href="/static/favicon.png"></link>
          <link
            href="https://fonts.googleapis.com/css?family=Karla:400,700|Permanent+Marker&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          ></link>
        </Head>
        <Component {...pageProps} />
      </Fragment>
    )
  }
}
