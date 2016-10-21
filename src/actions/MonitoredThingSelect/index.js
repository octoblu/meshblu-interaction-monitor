import { createAction } from 'redux-act'

export const selectMonitoredThingSuccess = createAction('monitor/things/get/success')

export default function selectMonitoredThing(selectedThing) {
  return dispatch => {
    return dispatch(selectMonitoredThingSuccess(selectedThing))
  }
}
