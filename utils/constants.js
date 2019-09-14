const Cookies = require('js-cookie')

export const ACCESS_TOKEN_NAME = 'friendify-access-token'
export const REFRESH_TOKEN_NAME = 'friendify-refresh-token'

export const ACCESS_TOKEN = Cookies.get(ACCESS_TOKEN_NAME)
export const REFRESH_TOKEN = Cookies.get(REFRESH_TOKEN_NAME)

export const CLIENT_ID = process.env.CLIENT_ID || 'ace7690c7c114e2a83e517cfe9c3fd84'
export const CLIENT_SECRET = process.env.CLIENT_SECRET || '410544ee792a49bab678675c629b6512'

export const SPOTIFY_API_BASE = process.env.SPOTIFY_API_BASE || `https://api.spotify.com/v1`
