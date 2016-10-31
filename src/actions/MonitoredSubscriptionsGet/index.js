import { createAction } from 'redux-act'
import Inquisitor from 'meshblu-inquisitor'
export const getMonitoredSubscriptionsRequest = createAction('monitor/subscriptions/get/request')
export const getMonitoredSubscriptionsSuccess = createAction('monitor/subscriptions/get/success')
export const getMonitoredSubscriptionsFailure = createAction('monitor/subscriptions/get/failure')

export default function getMonitoredSubscriptions({uuid, meshbluConfig}) {
  const inquisitor = new Inquisitor({uuid, meshbluConfig})
  return dispatch => {
    dispatch(getMonitoredSubscriptionsRequest())
    return inquisitor.getMonitoredDeviceSubscriptions((error, subscriptions) => {
      if(error) return dispatch(getMonitoredSubscriptionsFailure(error))
      return dispatch(getMonitoredSubscriptionsSuccess(subscriptions))
    })
  }
}
