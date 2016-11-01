import _ from 'lodash'
import { createReducer } from 'redux-act'
import { connectInquisitorRequest, connectInquisitorSuccess, connectInquisitorFailure, newMessage, } from '../../actions/InquisitorConnect'
import { getInquisitorRequest, getInquisitorSuccess, getInquisitorFailure } from '../../actions/InquisitorGet'

const initialState = {
  device: null,
  fetching: null,
  error: null,
  connectionStatus: 'initial',
  messages: [],
}

const storeNewMessage = (state, payload) => {
  const messages = _.clone(state.messages)
  messages.unshift(payload)
  if(messages.length > 10) messages.length = 10

  return { ...state, messages }
}

export default createReducer({
  [connectInquisitorRequest]: (state) => ({ ...state, connectionStatus: 'connecting' }),
  [connectInquisitorSuccess]: (state, payload) => ({ ...state, connectionStatus: 'connected' }),
  [connectInquisitorFailure]: (state, payload) => ({ ...state, error: payload, connectionStatus: 'failed' }),
  [getInquisitorRequest]: (state) => ({ ...state, fetching: true }),
  [getInquisitorSuccess]: (state, payload) => ({ ...state, device: payload, fetching: false }),
  [getInquisitorFailure]: (state, payload) => ({ ...state, error: payload, fetching: false }),
  [newMessage]: storeNewMessage,

}, initialState)
