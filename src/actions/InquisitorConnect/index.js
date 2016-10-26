import { createAction } from 'redux-act'
import Inquisitor from 'meshblu-inquisitor'

export const connectInquisitorRequest = createAction('inquisitor/connect/request')
export const connectInquisitorSuccess = createAction('inquisitor/connect/success')
export const connectInquisitorFailure = createAction('inquisitor/connect/failure')
export const monitoredDeviceUpdate    = createAction('monitor/device/update')
export default function connectInquisitor({uuid, meshbluConfig}) {
  const firehoseConfig = {...meshbluConfig, hostname: 'meshblu-firehose-socket-io.octoblu.com'}
  const inquisitor = new Inquisitor({uuid, meshbluConfig, firehoseConfig})
  return dispatch => {
    dispatch(connectInquisitorRequest())
    inquisitor.on('message', (message) => {
      dispatch(monitoredDeviceUpdate(message))
    })
    return inquisitor.connect((error) => {
      if(error) return dispatch(connectInquisitorFailure(error))
      return dispatch(connectInquisitorSuccess())
    })
  }
}
