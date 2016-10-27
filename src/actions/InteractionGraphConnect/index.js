import { createAction } from 'redux-act'
import Inquisitor from 'meshblu-inquisitor'
import Springy from 'springy'

export const connectInteractionGraphSuccess = createAction('interaction/graph/connect/success')
export const updateNodeInteractionGraph     = createAction('interaction/graph/update/node')
export const updateEdgeInteractionGraph     = createAction('interaction/graph/update/edge')
export const clearInteractionGraph          = createAction('interaction/graph/clear')

const MOCK = {
  things: [
    {
      uuid: 'device-1',
      statusDevice: 'device-1',
      errors: [],
      device: {
        uuid: 'device-1',
        something: true,
      }
    },
    {
      uuid: 'device-2',
      statusDevice: 'status-device',
      errors: [{
        message: 'an-error',
      }],
      device: {
        uuid: 'device-2',
        something: 'else',
      }
    },
    {
      uuid: 'device-3',
      statusDevice: 'device-3',
      device: {
        uuid: 'device-3',
        more: 'new-stuff'
      }
    },
  ]
}

export default function connectInteractionGraph({subscriptions, uuid, meshbluConfig}) {
  return (dispatch) => {
    const graph = new Springy.Graph()
    const nodes = _.map(MOCK.things, 'uuid')
    const edges = _.map(subscriptions, ({emitterUuid, subscriberUuid}) => [emitterUuid, subscriberUuid])
    console.log({nodes, edges})
    const renderClear = () => dispatch(clearInteractionGraph())
    const renderDrawEdge = (edge, emitter, subscriber) => dispatch(updateEdgeInteractionGraph({edge, emitter, subscriber}))
    const renderDrawNode = (node, vector) => dispatch(updateNodeInteractionGraph({node, vector}))
    graph.loadJSON({nodes, edges})
    const layout = new Springy.Layout.ForceDirected(graph, 400.0, 400.0, 0.5)
    const renderer = new Springy.Renderer(layout, renderClear, renderDrawEdge, renderDrawNode)
    renderer.start()

    return dispatch(connectInteractionGraphSuccess())
  }
}
