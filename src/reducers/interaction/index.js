import _ from 'lodash'
import { createReducer } from 'redux-act'
import { connectInteractionGraphSuccess, updateNodeInteractionGraph, updateEdgeInteractionGraph, clearInteractionGraph } from '../../actions/InteractionGraphConnect'
import {getMonitoredSubscriptionsSuccess} from '../../actions/MonitoredSubscriptionsGet'

const initialState = {
  graph: null,
  fetching: null,
  error: null,
  subscriptions: null,
}


const reduceUpdateNode = (state, {node, vector}) => {
  const graph = _.clone(state.graph || {})
  _.set(graph, `nodes.${node.data.label}`, vector)
  return {...state, graph}
}

console.log("Hello world from reducers/interaction/index.js")
console.log({connectInteractionGraphSuccess, updateNodeInteractionGraph, updateEdgeInteractionGraph, clearInteractionGraph})
export default createReducer({
  [connectInteractionGraphSuccess]: (state, payload) => ({ ...state, fetching: false, graph: {nodes: {}, edges: {}} }),
  [clearInteractionGraph]: (state, payload) => ({ ...state, fetching: false, graph: {nodes: {}, edges: {}} }),
  [updateNodeInteractionGraph]: reduceUpdateNode,
  [getMonitoredSubscriptionsSuccess]: (state, payload) => ({ ...state, subscriptions: payload }),
}, initialState)
