import _ from 'lodash'
import { createAction } from 'redux-act'
import Inquisitor from 'meshblu-inquisitor'
import {addEdge} from '../InteractionGraphConnect'

export const connectInquisitorRequest = createAction('inquisitor/connect/request')
export const connectInquisitorSuccess = createAction('inquisitor/connect/success')
export const connectInquisitorFailure = createAction('inquisitor/connect/failure')
export const monitoredDeviceUpdate    = createAction('monitor/device/update')
export const newMessage               = createAction('monitor/messages/new')
export const selectMessage            = createAction('monitor/messages/select')
export const unpauseMessageStream     = createAction('monitor/messages/unpause')
export const filterMessageStream      = createAction('monitor/messages/filter')

export default function connectInquisitor({uuid, meshbluConfig}) {
  const firehoseConfig = {...meshbluConfig, hostname: 'meshblu-firehose-socket-io.octoblu.com'}
  const inquisitor = new Inquisitor({uuid, meshbluConfig, firehoseConfig})

  return dispatch => {
    dispatch(connectInquisitorRequest())

    inquisitor.on('status-update', (message) => {
      dispatch(monitoredDeviceUpdate(message))
    })

    inquisitor.on('message', ({metadata, data}) => {
      _.each(metadata.route, ({from, to, type})=> dispatch(addEdge({subscriberUuid: to, emitterUuid: from, type})))
      dispatch(newMessage({metadata, data}, dispatch))
    })

    return inquisitor.connect((error) => {
      if(error) return dispatch(connectInquisitorFailure(error))
      return dispatch(connectInquisitorSuccess())
    })
  }
}
