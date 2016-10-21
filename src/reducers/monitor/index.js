import _ from 'lodash'
import { createReducer } from 'redux-act'
import { getMonitoredThingsRequest, getMonitoredThingsSuccess, getMonitoredThingsFailure } from '../../actions/MonitoredThingsGet'
import { getInquisitorRequest, getInquisitorSuccess, getInquisitorFailure } from '../../actions/InquisitorGet'

import {selectMonitoredThingSuccess} from '../../actions/MonitoredThingSelect'

const initialState = {
  things: null,
  inquisitor: null,
  error: null,
  fetching: false,
}


export default createReducer({
  [getMonitoredThingsRequest]: (state) => ({ ...state, fetching: true }),
  [getMonitoredThingsSuccess]: (state, payload) => ({ ...state, things: payload, fetching: false }),
  [getMonitoredThingsFailure]: (state, payload) => ({ ...state, error: payload, fetching: false }),

  [getInquisitorRequest]: (state) => ({ ...state, fetching: true }),
  [getInquisitorSuccess]: (state, payload) => ({ ...state, inquisitor: payload, fetching: false }),
  [getInquisitorFailure]: (state, payload) => ({ ...state, error: payload, fetching: false }),

  [selectMonitoredThingSuccess]: (state, payload) => ({ ...state, selectedThing: payload }),

}, initialState)
