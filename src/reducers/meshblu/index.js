import _ from 'lodash'
import { createReducer } from 'redux-act'
import { getMeshbluConfigSuccess} from '../../actions/MeshbluConfigGet'


const initialState = {
  meshbluConfig: null
}


export default createReducer({
  [getMeshbluConfigSuccess]: (state, payload) => ({ ...state, meshbluConfig: payload}),  

}, initialState)
