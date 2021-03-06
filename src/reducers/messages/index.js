import _ from 'lodash'
import { createReducer } from 'redux-act'
import { newMessage, selectMessage, unpauseMessageStream, filterMessageStream} from '../../actions/InquisitorConnect'
import { clearAllSuccess } from '../../actions/InteractionGraphConnect'

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
  [clearAllSuccess]: (state) => ({...state, messages: [], selected: null}),
  [newMessage]: storeNewMessage,
  [selectMessage]: (state, payload) => {
    return {...state, selected: payload, selectedByUser: true}
  },
  [unpauseMessageStream]: (state) => ({...state, selectedByUser: false}),
  [filterMessageStream]: (state, payload) => ({...state, filter: payload}),
}, initialState)
