import { createAction } from 'redux-act'
import Inquisitor from 'meshblu-inquisitor'
export const getMonitoredThingsRequest = createAction('monitor/things/get/request')
export const getMonitoredThingsSuccess = createAction('monitor/things/get/success')
export const getMonitoredThingsFailure = createAction('monitor/things/get/failure')

export default function getMonitoredThings({uuid, meshbluConfig}) {
  const inquisitor = new Inquisitor({uuid, meshbluConfig})
  return dispatch => {
    dispatch(getMonitoredThingsRequest())
    return inquisitor.getMonitoredDevices((error, things) => {
      if(error) return dispatch(getMonitoredThingsFailure(error))
      return dispatch(getMonitoredThingsSuccess(things))
    })
  }
}
