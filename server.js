const express = require('express')
const request = require('request')
const next = require('next')
const querystring = require('querystring')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const PORT = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const CLIENT_ID = process.env.CLIENT_ID || 'ace7690c7c114e2a83e517cfe9c3fd84'
const CLIENT_SECRET = process.env.CLIENT_SECRET || '410544ee792a49bab678675c629b6512'
const REDIRECT_URI = 'http://localhost:3000/callback'

function generateRandomString(length) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const stateKey = 'spotify_auth_state'

app.prepare().then(() => {
  const server = express()
  server
    .use(cors())
    .use(cookieParser())
    .use(express.urlencoded({ extended: true }))
    .use(express.json())

  server.get('/spotify-signin', function(req, res) {
    var state = generateRandomString(16)
    res.cookie(stateKey, state)

    // your application requests authorization
    var scope = 'user-read-playback-state user-modify-playback-state'
    res.redirect(
      'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: CLIENT_ID,
          scope: scope,
          redirect_uri: REDIRECT_URI,
          state: state
        })
    )
  })

  server.get('/callback', function(req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter
    var code = req.query.code || null
    var state = req.query.state || null
    var storedState = req.cookies ? req.cookies[stateKey] : null

    if (state === null || state !== storedState) {
      res.redirect(
        '/' +
          querystring.stringify({
            error: 'state_mismatch'
          })
      )
    } else {
      res.clearCookie(stateKey)
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code'
        },
        headers: {
          Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        },
        json: true
      }
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token
          const refresh_token = body.refresh_token

          res.cookie('friendify-access-token', access_token, {
            maxAge: 30 * 24 * 3600 * 1000
          })
          res.cookie('friendify-refresh-token', refresh_token, {
            maxAge: 30 * 24 * 3600 * 1000
          })

          res.redirect('/')
        } else {
          res.redirect(
            '/' +
              querystring.stringify({
                error: 'invalid_token'
              })
          )
        }
      })
    }
  })

  server.post('/refresh-token', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    var refreshToken = req.body ? req.body.refresh_token : null

    if (refreshToken) {
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        },
        headers: {
          Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        },
        json: true
      }
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token
          const expires_in = body.expires_in

          res.setHeader('Content-Type', 'application/json')

          res.cookie('friendify-access-token', access_token, {
            maxAge: 30 * 24 * 3600 * 1000
          })

          res.send(
            JSON.stringify({
              access_token: access_token,
              expires_in: expires_in
            })
          )
        } else {
          res.setHeader('Content-Type', 'application/json')
          res.send(JSON.stringify({ access_token: '', expires_in: '' }))
        }
      })
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify({ access_token: '', expires_in: '' }))
      res.redirect('/signout')
    }
  })

  server.get('/signout', (req, res) => {
    res.clearCookie('friendify-access-token')
    res.clearCookie('friendify-refresh-token')
    res.redirect('/signin')
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
  })
})
