import _ from 'lodash'
import { createReducer } from 'redux-act'
import { getGroupDevicesRequest, getGroupDevicesSuccess, getGroupDevicesFailure } from '../../actions/GroupDevicesGet'

const initialState = {
  devices: null,
  fetching: null,
  error: null
}

export default createReducer({
  [getGroupDevicesRequest]: (state) => ({ ...state, fetching: true }),
  [getGroupDevicesSuccess]: (state, payload) => ({ ...state, devices: payload, fetching: false }),
  [getGroupDevicesFailure]: (state, payload) => ({ ...state, error: payload, fetching: false }),
}, initialState)
