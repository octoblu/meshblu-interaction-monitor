import { createAction } from 'redux-act'
import Springy from 'springy'
import _ from 'lodash'
export const connectInteractionGraphSuccess = createAction('interaction/graph/connect/success')

export const addEdgeInteractionGraphSuccess = createAction('interaction/graph/edge/add/success')
export const addEdgeInteractionGraphFailure = createAction('interaction/graph/edge/add/failure')

export const updateNodeInteractionGraph     = createAction('interaction/graph/update/node')
export const updateNodesInteractionGraph    = createAction('interaction/graph/update/nodes')
export const updateEdgeInteractionGraph     = createAction('interaction/graph/update/edge')
export const clearInteractionGraph          = createAction('interaction/graph/clear')
export const clearAllSuccess                = createAction('interaction/graph/clear/all')
export const clearEdgesSuccess              = createAction('interaction/graph/clear/edge')

const graph = new Springy.Graph()
let connected = false

export function addEdge({emitterUuid, subscriberUuid, type}) {
  return (dispatch) => {
    if(emitterUuid === subscriberUuid) return

    let node1 = graph.nodeSet[emitterUuid]
    let node2 = graph.nodeSet[subscriberUuid]

    if(!node1 || !node2) return
    graph.newEdge(node1, node2, {type})
    return dispatch(addEdgeInteractionGraphSuccess({emitterUuid, subscriberUuid, type}))
  }
}

export function clearAll(){
  return (dispatch) => {
    return dispatch(clearAllSuccess())
  }
}

export function clearEdges(){
  return (dispatch) => {
    graph.filterEdges(() => false)
    return dispatch(clearEdgesSuccess())
  }
}

let nodesBatch = {}

const renderDrawNode = (dispatch) => (node, {x,y}) => {
  if (_.has(nodesBatch, node.data.label)) {
    dispatch(updateNodesInteractionGraph(nodesBatch))
    nodesBatch = {}
    return
  }

  nodesBatch[node.data.label] = {x, y}
}

export default function connectInteractionGraph({things, subscriptions, uuid, meshbluConfig}) {
  return (dispatch) => {

    const nodes = _.keys(things)
    const edges = []

    const renderClear = () => dispatch(clearInteractionGraph())
    const renderDrawEdge = (edge, emitter, subscriber) => 0

    graph.loadJSON({nodes, edges})
    const layout = new Springy.Layout.ForceDirected(graph, 100.0, 1000.0, 0.2, 0.01)
    const renderer = new Springy.Renderer(layout, renderClear, renderDrawEdge, renderDrawNode(dispatch))
    renderer.start()
    _.each(subscriptions, (subscription) => dispatch(addEdge(subscription)))
    connected = true
    return dispatch(connectInteractionGraphSuccess())
  }
}
