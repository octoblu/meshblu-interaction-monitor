import _ from 'lodash'
import { createReducer } from 'redux-act'
import { connectInquisitorRequest, connectInquisitorSuccess, connectInquisitorFailure, currentMessage } from '../../actions/InquisitorConnect'
import { getInquisitorRequest, getInquisitorSuccess, getInquisitorFailure } from '../../actions/InquisitorGet'

const initialState = {
  device: null,
  fetching: null,
  error: null,
  connectionStatus: 'initial',
  currentMessage: null,
}

export default createReducer({
  [connectInquisitorRequest]: (state) => ({ ...state, connectionStatus: 'connecting' }),
  [connectInquisitorSuccess]: (state, payload) => ({ ...state, connectionStatus: 'connected' }),
  [connectInquisitorFailure]: (state, payload) => ({ ...state, error: payload, connectionStatus: 'failed' }),
  [currentMessage]: (state, payload) => ({ ...state, currentMessage: payload}),
  [getInquisitorRequest]: (state) => ({ ...state, fetching: true }),
  [getInquisitorSuccess]: (state, payload) => ({ ...state, device: payload, fetching: false }),
  [getInquisitorFailure]: (state, payload) => ({ ...state, error: payload, fetching: false }),

}, initialState)
