import { createAction } from 'redux-act'
import {listSubscriptions} from 'redux-meshblu'

export const getMonitoredDevicesRequest = createAction('monitor/devices/get/request')
export const getMonitoredDevicesSuccess = createAction('monitor/devices/get/success')
export const getMonitoredDevicesFailure = createAction('monitor/devices/get/failure')

export default function getMonitoredDevices(deviceUuid, meshbluConfig) {
  return dispatch => {
    dispatch(getMonitoredDevicesRequest())
    return dispatch(listSubscriptions(deviceUuid, meshbluConfig))
      .then((subscriptions) => {
        console.log(subscriptions)
      }
    )
  }
}
