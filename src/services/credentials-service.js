import MeshbluHTTP from 'browser-meshblu-http'
import _ from 'lodash'
import cookie from 'react-cookie'

const ONE_YEAR = 365 * 24 * 60 * 60

export function getCredentials(){
  const credentials = cookie.load('credentials')
  if(!_.isEmpty(credentials)) return credentials

  return {}
}

export function clearCredentials(){
    window.localStorage.removeItem('credentials')
}

export function setCredentials(credentials){
  cookie.save('credentials', credentials, {maxAge: ONE_YEAR, path: '/'})
}

export function verifyCredentials({ bearerToken }, callback) {
  if (bearerToken) return verifyAndStoreBearerToken({ bearerToken }, callback)

  const { uuid, token } = getCredentials()
  if (!uuid || !token) return callback(null, false)

  const meshblu = new MeshbluHTTP({ uuid, token })
  meshblu.whoami((error, me) => {
    if (error && error.message !== 'Forbidden') return callback(error)
    if (_.isEmpty(me)) return callback(null, false)
    callback(null, true)
  })
}

function verifyAndStoreBearerToken({ bearerToken }, callback) {
  const meshblu = new MeshbluHTTP({ bearerToken })
  meshblu.whoami((error, { uuid }={}) => {
    if (error && error.message === "Forbidden") return callback(null, false)
    if (error) return callback(error)

    meshblu.generateAndStoreToken(uuid, {}, (error, { token }={}) => {
      if (error) return callback(error)

      setCredentials({ uuid, token })
      callback(null, true)
    })
  })
}
