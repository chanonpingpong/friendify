import axios from 'axios'

import { ACCESS_TOKEN, SPOTIFY_API_BASE, REFRESH_TOKEN } from '../utils/constants'

export const fetchMe = function() {
  return axios({
    method: 'GET',
    url: `${SPOTIFY_API_BASE}/me`,
    headers: {
      Authorization: 'Bearer ' + ACCESS_TOKEN
    }
  })
}

export const refreshToken = function() {
  return axios({
    method: 'POST',
    url: '/refresh-token',
    data: {
      refresh_token: REFRESH_TOKEN
    }
  })
}
