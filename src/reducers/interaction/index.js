import _ from 'lodash'
import { createReducer } from 'redux-act'
import { connectInteractionGraphSuccess, updateNodeInteractionGraph, addEdgeInteractionGraphSuccess, clearInteractionGraph } from '../../actions/InteractionGraphConnect'
import {getMonitoredSubscriptionsSuccess} from '../../actions/MonitoredSubscriptionsGet'
import {selectMessage} from '../../actions/InquisitorConnect'
const initialState = {
  graph: null,
  fetching: null,
  error: null,
  subscriptions: null,
}


const reduceUpdateNode = (state, {node, vector}) => {
  const {x,y} = vector
  const graph = _.clone(state.graph || {})
  _.set(graph, `nodes.${node.data.label}`, {x,y})
  return {...state, graph}
}

const reduceUpdateEdge = (state, {emitterUuid, subscriberUuid, type}) => {
  const subscriptions = _.clone(state.subscriptions || [])

  if(_.find(subscriptions, {emitterUuid, subscriberUuid, type})) return state

  subscriptions.push({emitterUuid, subscriberUuid, type})

  return {...state, subscriptions}
}

export default createReducer({
  [connectInteractionGraphSuccess]: (state, payload) => ({ ...state, fetching: false, graph: {nodes: {}, edges: []} }),
  [updateNodeInteractionGraph]: reduceUpdateNode,
  [addEdgeInteractionGraphSuccess]: reduceUpdateEdge,
  [getMonitoredSubscriptionsSuccess]: (state, payload) => ({ ...state, subscriptions: payload }),
  [selectMessage]: (state) => {
    return {...state, selectedByUser: true}
  }
}, initialState)
