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

window.graph = graph

export function addEdge({emitterUuid, subscriberUuid, type}) {
  return (dispatch) => {
    const node1 = graph.nodeSet[emitterUuid]
    const node2 = graph.nodeSet[subscriberUuid]
    if(!node1 || !node2) return
    if(node1 == node2) return

    graph.newEdge(node1, node2, {type})
    return dispatch(addEdgeInteractionGraphSuccess({emitterUuid, subscriberUuid, type}))
  }
}

export default function connectInteractionGraph({things, subscriptions, uuid, meshbluConfig}) {
  return (dispatch) => {

    const nodes = _.map(things, 'uuid')
    const edges = []

    const renderClear = () => dispatch(clearInteractionGraph())
    const renderDrawEdge = (edge, emitter, subscriber) => 0

    const renderDrawNode = (node, vector) => dispatch(updateNodeInteractionGraph({node, vector}))
    graph.loadJSON({nodes, edges})
    const layout = new Springy.Layout.ForceDirected(graph, 100.0, 1000.0, 0.5)
    const renderer = new Springy.Renderer(layout, renderClear, renderDrawEdge, renderDrawNode)
    renderer.start()
    _.each(subscriptions, (subscription) => dispatch(addEdge(subscription)))
    return dispatch(connectInteractionGraphSuccess())
  }
}
