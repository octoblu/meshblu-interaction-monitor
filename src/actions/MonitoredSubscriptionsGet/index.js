import { createAction } from 'redux-act'
import Inquisitor from 'meshblu-inquisitor'
import {addEdge} from '../InteractionGraphConnect'

export const getMonitoredSubscriptionsRequest = createAction('monitor/subscriptions/get/request')
export const getMonitoredSubscriptionsSuccess = createAction('monitor/subscriptions/get/success')
export const getMonitoredSubscriptionsFailure = createAction('monitor/subscriptions/get/failure')

export default function getMonitoredSubscriptions({uuid, meshbluConfig}) {
  const inquisitor = new Inquisitor({uuid, meshbluConfig})
  return dispatch => {
    dispatch(getMonitoredSubscriptionsRequest())
    dispatch(getMonitoredSubscriptionsSuccess([]))
    // return inquisitor.getMonitoredDeviceSubscriptions((error, subscriptions) => {
    //   if(error) return dispatch(getMonitoredSubscriptionsFailure(error))
    //   _.each(subscriptions, (subscription) => dispatch(addEdge(subscription)))
    //   return dispatch(getMonitoredSubscriptionsSuccess(subscriptions))
    // })
  }
}
