import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import monitor from './monitor'

const rootReducer = combineReducers({
  routing: routerReducer,
  monitor,
})

export default rootReducer
