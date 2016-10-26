import { createAction } from 'redux-act'
import Inquisitor from 'meshblu-inquisitor'

export const clearErrorsRequest = createAction('errors/clear/request')
export const clearErrorsSuccess = createAction('errors/clear/success')
export const clearErrorsFailure = createAction('errors/clear/failure')

export default function clearErrors({uuid, meshbluConfig}) {
  const inquisitor = new Inquisitor({meshbluConfig})
  return dispatch => {
    dispatch(clearErrorsRequest())
    return inquisitor.clearErrors(uuid, (error) => {
      if(error) return dispatch(clearErrorsFailure(error))
      return dispatch(clearErrorsSuccess(uuid))
    })
  }
}
