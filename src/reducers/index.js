import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import monitor from './monitor'
import meshblu from './meshblu'
import inquisitor from './inquisitor'

const rootReducer = combineReducers({
  routing: routerReducer,
  monitor,
  meshblu,
  inquisitor,
})

export default rootReducer
