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
  ],
  subscriptions: [
    {subscriberUuid: 'device-1', emitterUuid: 'device-2', type: 'configure.received'},
    {subscriberUuid: 'device-3', emitterUuid: 'device-2', type: 'message.received'},
  ]
}

const renderClear = () => console.log('clear')
const renderDrawEdge = (edge, pt1, pt2) => console.log('renderDrawEdge', edge, pt1, pt2)
const renderDrawNode = (node, p) => console.log('renderDrawNode', node, p)

export default function connectInteractionGraph({uuid, meshbluConfig}) {
  return (dispatch) => {
    const graph = new Springy.Graph()
    const nodes = _.map(MOCK.things, 'uuid')
    const edges = _.map(MOCK.subscriptions, ({emitterUuid, subscriberUuid}) => [emitterUuid, subscriberUuid])
    graph.loadJSON({nodes, edges})
    const layout = new Springy.Layout.ForceDirected(graph, 400.0, 400.0, 0.5)
    const renderer = new Springy.Renderer(layout, renderClear, renderDrawEdge, renderDrawNode)
    renderer.start()

    return dispatch(connectInteractionGraphSuccess())
  }
}
