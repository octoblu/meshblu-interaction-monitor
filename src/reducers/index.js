import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import monitor from './monitor'
import meshblu from './meshblu'
import inquisitor from './inquisitor'
import interaction from './interaction'
import messages from './messages'
const rootReducer = combineReducers({
  routing: routerReducer,
  monitor,
  meshblu,
  inquisitor,
  interaction,
  messages,
})

export default rootReducer
