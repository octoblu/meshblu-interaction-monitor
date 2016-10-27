import _ from 'lodash'
import { createReducer } from 'redux-act'
import { connectInteractionGraphRequest, connectInteractionGraphSuccess, connectInteractionGraphFailure } from '../../actions/InteractionGraphConnect'

const initialState = {
  graph: null,
  fetching: null,
  error: null
}

export default createReducer({
  [connectInteractionGraphRequest]: (state) => ({ ...state, fetching: true }),
  [connectInteractionGraphSuccess]: (state, payload) => ({ ...state, graph: payload, fetching: false }),
  [connectInteractionGraphFailure]: (state, payload) => ({ ...state, error: payload, fetching: false }),

}, initialState)
