import { createAction } from 'redux-act'
import Inquisitor from 'meshblu-inquisitor'
import Springy from 'springy'

export const connectInteractionGraphSuccess = createAction('interaction/graph/connect/success')

export const addEdgeInteractionGraphSuccess = createAction('interaction/graph/edge/add/success')
export const addEdgeInteractionGraphFailure = createAction('interaction/graph/edge/add/failure')

export const updateNodeInteractionGraph     = createAction('interaction/graph/update/node')
export const updateEdgeInteractionGraph     = createAction('interaction/graph/update/edge')
export const clearInteractionGraph          = createAction('interaction/graph/clear')

const graph = new Springy.Graph()
let connected = false

export function addEdge({emitterUuid, subscriberUuid, type}) {
  return (dispatch) => {
    if(emitterUuid === subscriberUuid) return

    let node1 = graph.nodeSet[emitterUuid]

    if(!node1) {
      if(!connected || emitterUuid === '50612acd-fd0c-4607-afb3-038c8d3776d9') return
      node1 = new Springy.Node(emitterUuid, {label: emitterUuid})
      graph.addNode(node1)
    }

    let node2 = graph.nodeSet[subscriberUuid]

    if(!node2) {
      if(!connected || subscriberUuid === '50612acd-fd0c-4607-afb3-038c8d3776d9') return
      node2 = new Springy.Node(subscriberUuid, {label: subscriberUuid})
      graph.addNode(node2)
    }

    graph.newEdge(node1, node2, {type})
    return dispatch(addEdgeInteractionGraphSuccess({emitterUuid, subscriberUuid, type}))
  }
}

export default function connectInteractionGraph({things, subscriptions, uuid, meshbluConfig}) {
  return (dispatch) => {

    const nodes = _.keys(things)
    const edges = []

    const renderClear = () => dispatch(clearInteractionGraph())
    const renderDrawEdge = (edge, emitter, subscriber) => 0

    const renderDrawNode = (node, vector) => dispatch(updateNodeInteractionGraph({node, vector}))
    graph.loadJSON({nodes, edges})
    const layout = new Springy.Layout.ForceDirected(graph, 100.0, 1000.0, 0.7)
    const renderer = new Springy.Renderer(layout, renderClear, renderDrawEdge, renderDrawNode)
    renderer.start()
    _.each(subscriptions, (subscription) => dispatch(addEdge(subscription)))
    connected = true
    return dispatch(connectInteractionGraphSuccess())
  }
}
