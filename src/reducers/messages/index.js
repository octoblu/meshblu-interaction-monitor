import _ from 'lodash'
import { createReducer } from 'redux-act'
import { newMessage, selectMessage} from '../../actions/InquisitorConnect'

const initialState = {
  messages: [],
  selected: null,
}

const storeNewMessage = (state, payload) => {
  payload.timestamp = new Date()
  const messages = state.messages.slice(0,99)
  messages.unshift(payload)
  const newState = { ...state, messages: messages}

  if(!state.selectedByUser) {
    newState.selected = payload
  }

  return newState
}

export default createReducer({
  [newMessage]: storeNewMessage,
  [selectMessage]: (state, payload) => {
    return {...state, selected: payload, selectedByUser: true}
  }
}, initialState)
