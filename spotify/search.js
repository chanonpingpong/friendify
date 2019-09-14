import axios from 'axios'

import { SPOTIFY_API_BASE, ACCESS_TOKEN } from '../utils/constants'

export const search = function(keywords) {
  return axios({
    method: 'GET',
    url: `${SPOTIFY_API_BASE}/search`,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    },
    params: {
      q: keywords,
      type: `track`
    }
  })
}
