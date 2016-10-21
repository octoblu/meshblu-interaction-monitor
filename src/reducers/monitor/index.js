import _ from 'lodash'
import { createReducer } from 'redux-act'
import { getMonitoredThingsRequest, getMonitoredThingsSuccess, getMonitoredThingsFailure } from '../../actions/monitor'

const initialState = {
  things: null,
  error: null,
  fetching: false,
}

export default createReducer({
  [getMonitoredThingsRequest]: () => ({ ...initialState, fetching: true }),
  [getMonitoredThingsSuccess]: (state, payload) => ({ ...initialState, things: payload, fetching: false }),
  [getMonitoredThingsFailure]: (state, payload) => ({ ...initialState, error: payload, fetching: false }),
}, initialState)
