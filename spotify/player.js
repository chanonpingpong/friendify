import axios from 'axios'

import { SPOTIFY_API_BASE, ACCESS_TOKEN } from '../utils/constants'

export const play = function(trackURI) {
  return axios({
    method: 'PUT',
    url: `${SPOTIFY_API_BASE}/me/player/play`,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    },
    data: JSON.stringify({
      uris: [trackURI]
    })
  })
}

export const devices = function() {
  return axios({
    method: 'GET',
    url: `${SPOTIFY_API_BASE}/me/player/devices`,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  })
}
