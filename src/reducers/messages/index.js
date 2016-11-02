import _ from 'lodash'
import { createReducer } from 'redux-act'
import { newMessage, } from '../../actions/InquisitorConnect'

const initialState = {
  messages: [],
  selected: null,
}

const storeNewMessage = (state, payload) => {
  const messages = _.clone(state.messages)
  messages.unshift(payload)
  if(messages.length > 1000) messages.length = 1000

  return { ...state, messages, selected: payload }
}

export default createReducer({
  [newMessage]: storeNewMessage,
}, initialState)
