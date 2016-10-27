import { createAction } from 'redux-act'

export const getInteractionSubscriptionsRequest = createAction('inquisitor/get/request')
export const getInteractionSubscriptionsSuccess = createAction('inquisitor/get/success')
export const getInteractionSubscriptionsFailure = createAction('inquisitor/get/failure')

const MOCK = [  
    {subscriberUuid: 'device-1', emitterUuid: 'device-2', type: 'configure.received'},
    {subscriberUuid: 'device-3', emitterUuid: 'device-2', type: 'message.received'},
]

export default function getInteractionSubscriptions({uuid, meshbluConfig}) {
  return dispatch => {
    dispatch(getInteractionSubscriptionsRequest())
    return dispatch(getInteractionSubscriptionsSuccess(MOCK))
  }
}
