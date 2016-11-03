import _ from 'lodash'
import { createReducer } from 'redux-act'
import { newMessage, } from '../../actions/InquisitorConnect'

const initialState = {
  messages: [],
  selected: null,
}

const storeNewMessage = (state, payload) => {
  payload.timestamp = new Date()
  const messages = state.messages.slice(0,99)
  messages.unshift(payload)
  return { ...state, messages: messages, selected: payload }
}

export default createReducer({
  [newMessage]: storeNewMessage,
}, initialState)
