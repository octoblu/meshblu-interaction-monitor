import _ from 'lodash'
import { createReducer } from 'redux-act'
import { connectInteractionGraphSuccess, updateNodeInteractionGraph, updateNodesInteractionGraph, addEdgeInteractionGraphSuccess, clearInteractionGraph, clearEdgesSuccess } from '../../actions/InteractionGraphConnect'
import {getMonitoredSubscriptionsSuccess} from '../../actions/MonitoredSubscriptionsGet'
import {selectMessage} from '../../actions/InquisitorConnect'

const initialState = {
  graph: null,
  fetching: null,
  error: null,
  subscriptions: null,
}

var times = 0
const reduceUpdateNode = (state, {node, vector}) => {
  const {x,y} = vector
  const graph = _.clone(state.graph || {})
  _.set(graph, `nodes.${node.data.label}`, {x,y})
  return {...state, graph}
}

const reduceUpdateNodes = (state, nodeVectors) => {
  const graph = _.clone(state.graph || {})
  _.each(nodeVectors, (vector, label) => {
    graph.nodes[label] = vector
  })
  return {...state, graph}
}

const reduceUpdateEdge = (state, {emitterUuid, subscriberUuid, type}) => {
  const subscriptions = _.clone(state.subscriptions || [])

  if(_.find(subscriptions, {emitterUuid, subscriberUuid, type})) return state

  subscriptions.push({emitterUuid, subscriberUuid, type})

  return {...state, subscriptions}
}

const reduceClearEdges = (state) => {
  const graph = {...state.graph, edges: []}
  return {...state, graph, subscriptions: []}
}

export default createReducer({
  [connectInteractionGraphSuccess]: (state, payload) => ({ ...state, fetching: false, graph: {nodes: {}, edges: []} }),
  [updateNodeInteractionGraph]: reduceUpdateNode,
  [updateNodesInteractionGraph]: reduceUpdateNodes,
  [addEdgeInteractionGraphSuccess]: reduceUpdateEdge,
  [clearEdgesSuccess]: reduceClearEdges,
  [getMonitoredSubscriptionsSuccess]: (state, payload) => ({ ...state, subscriptions: payload }),
  [selectMessage]: (state) => {
    return {...state, selectedByUser: true}
  }
}, initialState)
