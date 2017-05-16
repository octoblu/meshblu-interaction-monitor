import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import monitor from './monitor'
import meshblu from './meshblu'
import inquisitor from './inquisitor'
import interaction from './interaction'
import messages from './messages'
import groups from './groups'
const rootReducer = combineReducers({
  routing: routerReducer,
  monitor,
  meshblu,
  inquisitor,
  interaction,
  messages,
  groups,
})

export default rootReducer
