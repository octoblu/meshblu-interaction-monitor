import { createAction } from 'redux-act'
import Inquisitor from 'meshblu-inquisitor'
import Springy from 'springy'

export const connectInteractionGraphSuccess = createAction('interaction/graph/connect/success')
export const updateNodeInteractionGraph     = createAction('interaction/graph/update/node')
export const updateEdgeInteractionGraph     = createAction('interaction/graph/update/edge')
export const clearInteractionGraph          = createAction('interaction/graph/clear')

export default function connectInteractionGraph({things, subscriptions, uuid, meshbluConfig}) {
  return (dispatch) => {
    const graph = new Springy.Graph()
    const nodes = _.map(things, 'uuid')
    const edges = [] //_.map(subscriptions, ({emitterUuid, subscriberUuid}) => [emitterUuid, subscriberUuid])

    const renderClear = () => dispatch(clearInteractionGraph())
    const renderDrawEdge = (edge, emitter, subscriber) => dispatch(updateEdgeInteractionGraph({edge, emitter, subscriber}))
    const renderDrawNode = (node, vector) => dispatch(updateNodeInteractionGraph({node, vector}))
    graph.loadJSON({nodes, edges})
    const layout = new Springy.Layout.ForceDirected(graph, 400.0, 400.0, 0.9)
    const renderer = new Springy.Renderer(layout, renderClear, renderDrawEdge, renderDrawNode)
    renderer.start()

    return dispatch(connectInteractionGraphSuccess())
  }
}
