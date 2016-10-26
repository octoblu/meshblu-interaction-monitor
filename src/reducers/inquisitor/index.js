import _ from 'lodash'
import { createReducer } from 'redux-act'
import { connectInquisitorRequest, connectInquisitorSuccess, connectInquisitorFailure } from '../../actions/InquisitorConnect'
import { getInquisitorRequest, getInquisitorSuccess, getInquisitorFailure } from '../../actions/InquisitorGet'

const initialState = {
  device: null,
  fetching: null,
  error: null,
  connectionStatus: 'initial',
}

export default createReducer({
  [connectInquisitorRequest]: (state) => ({ ...state, connectionStatus: 'connecting' }),
  [connectInquisitorSuccess]: (state, payload) => ({ ...state, connectionStatus: 'connected' }),
  [connectInquisitorFailure]: (state, payload) => ({ ...state, error: payload, connectionStatus: 'failed' }),
  [getInquisitorRequest]: (state) => ({ ...state, fetching: true }),
  [getInquisitorSuccess]: (state, payload) => ({ ...state, device: payload, fetching: false }),
  [getInquisitorFailure]: (state, payload) => ({ ...state, error: payload, fetching: false }),

}, initialState)
