import _ from 'lodash'
import { createReducer } from 'redux-act'
import { newMessage, } from '../../actions/InquisitorConnect'

const initialState = {
  messages: [],
  selected: null,
}

const storeNewMessage = (state, payload) => {
  payload.timestamp = new Date()
  const messages = _.clone(state.messages)
  messages.unshift(payload)
  if(messages.length > 100) messages.length = 100
  return { ...state, messages: messages, selected: payload }
}

export default createReducer({
  [newMessage]: storeNewMessage,
}, initialState)
