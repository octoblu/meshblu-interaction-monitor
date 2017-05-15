import _ from 'lodash'
import { createReducer } from 'redux-act'
import { getMonitoredThingsRequest, getMonitoredThingsSuccess, getMonitoredThingsFailure } from '../../actions/MonitoredThingsGet'
import { getMonitoredSubscriptionsRequest, getMonitoredSubscriptionsSuccess, getMonitoredSubscriptionsFailure } from '../../actions/MonitoredSubscriptionsGet'
import { getInquisitorRequest, getInquisitorSuccess, getInquisitorFailure } from '../../actions/InquisitorGet'
import { monitoredDeviceUpdate, newMessage, } from '../../actions/InquisitorConnect'

import { clearAllSuccess } from '../../actions/InteractionGraphConnect'
import {selectMonitoredThingSuccess} from '../../actions/MonitoredThingSelect'

const initialState = {
  things: null,
  inquisitor: null,
  error: null,
  fetching: false,
}


const addMessageCountToThing = (state, {metadata}) => {
  if(_.isEmpty(state.things)) return state
  const things = _.clone(state.things)
  const inquisitorUuid = _.last(metadata.route).to
  const hop = _.find(metadata.route, {to: inquisitorUuid})

  if(!hop) {
    console.log("WTF!!", metadata)
    return state
  }

  const {type, from} = hop
  const [eventType, direction] = _.split(type, '.')
  const thing = _.defaults(things[from],
    {
      device: {
        uuid: from,
      },
      counts: {
          message: {received: 0, sent: 0},
          configure: {received: 0, sent: 0},
          broadcast: {received: 0, sent: 0},
      }
    }
  )

  thing.counts[eventType][direction]++
  things[from] = thing
  return {...state, things}
}

const clearMessageCounts = (state) => {

  const things = _.mapValues(state.things, ({device}) => {
    return {
      device,
      counts:  {
        message:   {received: 0, sent: 0},
        configure: {received: 0, sent: 0},
        broadcast: {received: 0, sent: 0},
      }
    }
  })

  return {...state, things}
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
    const key = _.findKey(things, {statusDevice: payload.statusDevice})
    if (key) {
      const oldThing = things[key]
      if(oldThing.uuid !== payload.uuid) return state
      things[key] = payload
    }

    return {...state, things}
  },
  [selectMonitoredThingSuccess]: (state, payload) => ({ ...state, selectedThing: payload }),
  [newMessage]: addMessageCountToThing,
  [clearAllSuccess]: clearMessageCounts,

}, initialState)
