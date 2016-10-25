import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import monitor from './monitor'
import meshblu from './meshblu'

const rootReducer = combineReducers({
  routing: routerReducer,
  monitor,
  meshblu,
})

export default rootReducer
