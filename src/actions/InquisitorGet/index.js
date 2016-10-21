import { createAction } from 'redux-act'

export const getInquisitorRequest = createAction('inquisitor/get/request')
export const getInquisitorSuccess = createAction('inquisitor/get/success')
export const getInquisitorFailure = createAction('inquisitor/get/failure')

const MOCK = {
    uuid: '1',
    name: 'The Spanish Inquisition',
    type: 'device:inquisitor',
    logo: 'https://s3-us-west-2.amazonaws.com/octoblu-icons/device/meeting-room.svg'
}

export default function getInquisitor({uuid, meshbluConfig}) {
  return dispatch => {
    dispatch(getInquisitorRequest())
    return dispatch(getInquisitorSuccess(MOCK))
  }
}
