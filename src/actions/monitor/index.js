import { createAction } from 'redux-act'
import {listSubscriptions} from 'redux-meshblu'

export const getMonitoredThingsRequest = createAction('monitor/things/get/request')
export const getMonitoredThingsSuccess = createAction('monitor/things/get/success')
export const getMonitoredThingsFailure = createAction('monitor/things/get/failure')


const DUMMY_THINGS = [
  {
    uuid: '1',
    name: 'A Fake Room',
    type: 'device:conference-room',
    logo: 'https://s3-us-west-2.amazonaws.com/octoblu-icons/device/meeting-room.svg'
  },
  {
    uuid: '2',
    name: 'Fake Endo'
  },
  {
    uuid: '3',
    name: 'Some Other Fake Thing With Errors',
    errors: [{
      message: "Oh No!",
      code: 500
    }]
  }
]

export default function getMonitoredThings({uuid, meshbluConfig}) {
  return dispatch => {
    dispatch(getMonitoredThingsRequest())
    return dispatch(listSubscriptions(uuid, meshbluConfig))
      .then((subscriptions) => {
        return dispatch(getMonitoredThingsSuccess(DUMMY_THINGS))
      }
    )
  }
}
