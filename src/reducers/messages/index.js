import _ from 'lodash'
import { createReducer } from 'redux-act'
import { newMessage, selectMessage, unpauseMessageStream} from '../../actions/InquisitorConnect'

const initialState = {
  messages: [],
  selected: null,
}

const storeNewMessage = (state, payload) => {
  if(state.selectedByUser) {
    return state
  }

  payload.timestamp = new Date()
  const messages = state.messages.slice(0,99)
  messages.unshift(payload)
  return { ...state, messages: messages, selected: payload}
}

export default createReducer({
  [newMessage]: storeNewMessage,
  [selectMessage]: (state, payload) => {
    return {...state, selected: payload, selectedByUser: true}
  },
  [unpauseMessageStream]: (state) => ({...state, selectedByUser: false}),
}, initialState)
