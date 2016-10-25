import { createAction } from 'redux-act'

import * as AuthService from '../../services/auth-service'
export const getMeshbluConfigSuccess = createAction('meshblu/config/get/success')

export default function getMeshbluConfig() {
  return dispatch => {
    const meshbluConfig = AuthService.getMeshbluConfig()
    return dispatch(getMeshbluConfigSuccess(meshbluConfig))
  }
}
