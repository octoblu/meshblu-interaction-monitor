import _ from 'lodash'
import { createReducer } from 'redux-act'
import { getMonitoredThingsRequest, getMonitoredThingsSuccess, getMonitoredThingsFailure } from '../../actions/MonitoredThingsGet'
import { getMonitoredSubscriptionsRequest, getMonitoredSubscriptionsSuccess, getMonitoredSubscriptionsFailure } from '../../actions/MonitoredSubscriptionsGet'
import { getInquisitorRequest, getInquisitorSuccess, getInquisitorFailure } from '../../actions/InquisitorGet'
import { monitoredDeviceUpdate } from '../../actions/InquisitorConnect'

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

  [getMonitoredSubscriptionsRequest]: (state) => ({ ...state, fetching: true }),
  [getMonitoredSubscriptionsSuccess]: (state, payload) => ({ ...state, subscriptions: payload, fetching: false }),
  [getMonitoredSubscriptionsFailure]: (state, payload) => ({ ...state, error: payload, fetching: false }),

  [getInquisitorRequest]: (state) => ({ ...state, fetching: true }),
  [getInquisitorSuccess]: (state, payload) => ({ ...state, inquisitor: payload, fetching: false }),
  [getInquisitorFailure]: (state, payload) => ({ ...state, error: payload, fetching: false }),
  [monitoredDeviceUpdate]: (state, payload) => {
    const things = _.clone(state.things)
    const updateIndex = _.findIndex(things, {statusDevice: payload.statusDevice})
    if (updateIndex >= 0) {
      const oldThing = things[updateIndex]
      if(oldThing.uuid !== payload.uuid) return state
      things[updateIndex] = payload
    }

    return {...state, things}
  },
  [selectMonitoredThingSuccess]: (state, payload) => ({ ...state, selectedThing: payload }),

}, initialState)
