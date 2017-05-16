import { createAction } from 'redux-act'
import MeshbluHttp from 'browser-meshblu-http'

export const getGroupDevicesRequest = createAction('groups/devices/get/request')
export const getGroupDevicesSuccess = createAction('groups/devices/get/success')
export const getGroupDevicesFailure = createAction('groups/devices/get/failure')

export default function getGroupDevices({meshbluConfig}) {
  return dispatch => {
    dispatch(getGroupDevicesRequest())

    const meshbluHttp = new MeshbluHttp(meshbluConfig)
    const query = { type: 'octoblu:group', owner: meshbluConfig.uuid }
    meshbluHttp.search({ query }, (error, devices) => {
      if(error) return dispatch(getGroupDevicesFailure(error))
      return dispatch(getGroupDevicesSuccess(devices))
    })
  }
}
