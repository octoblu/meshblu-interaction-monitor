import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import connectInquisitor from  '../actions/InquisitorConnect'
import getMeshbluConfig from '../actions/MeshbluConfigGet'
import connectInteractionGraph from '../actions/InteractionGraphConnect'
import getMonitoredSubscriptions from '../actions/MonitoredSubscriptionsGet'
import getMonitoredThings from  '../actions/MonitoredThingsGet'
import clearErrors from '../actions/ErrorsClear'
import InteractionNode from '../components/InteractionNode'
import _ from 'lodash'

const propTypes = {
  graph: PropTypes.object,
  meshbluConfig: PropTypes.object,
  subscriptions: PropTypes.array,
  things: PropTypes.array,
}

class InteractionGraph extends React.Component {
  componentDidMount() {
    this.props.dispatch(getMeshbluConfig())
  }

  componentWillReceiveProps(nextProps) {
    const uuid = this.props.params.uuid
    const {meshbluConfig, graph, subscriptions, things, connectionStatus} = nextProps

    if(connectionStatus == 'initial' && !_.isEmpty(meshbluConfig)) {
      this.props.dispatch(connectInquisitor({uuid, meshbluConfig}))
    }

    if(!subscriptions) return this.props.dispatch(getMonitoredSubscriptions({uuid, meshbluConfig}))
    if(!things) return this.props.dispatch(getMonitoredThings({uuid, meshbluConfig}))
    if(_.isEmpty(graph)) this.props.dispatch(connectInteractionGraph({things: things, subscriptions, uuid, meshbluConfig}))
  }

  render() {
    const {graph, subscriptions, things} = this.props
    if(_.isEmpty(graph)) return <h1> Waiting for graph </h1>
    const {nodes} = graph
    return (
      <div>
        <h1>Sup G Money</h1>
        <svg viewBox="-10 -10 20 20">
            {this.renderEdges({subscriptions, nodes})}
            {this.renderNodes({nodes, things})}
        </svg>
      </div>
    )
  }

  renderNodes ({nodes, things}) {
    return _.map(nodes, function(node, uuid){
      const thing = _.find(things, {uuid})
      return <InteractionNode key={uuid} x={node.x} y={node.y} thing={thing} />
    })
  }

  renderEdges ({subscriptions, nodes}) {
    return _.map(subscriptions, ({subscriberUuid, emitterUuid, type}) => {
      if (subscriberUuid == emitterUuid) return
      const subscriber = nodes[subscriberUuid]
      const emitter = nodes[emitterUuid]
      if(!subscriber || !emitter) return
      const lineKey = `${subscriberUuid}:${emitterUuid}:${type}`

      return <line key={lineKey} x1={subscriber.x} y1={subscriber.y} x2={emitter.x} y2={emitter.y} strokeWidth=".05" stroke="black" />
    })
  }
}

InteractionGraph.propTypes = propTypes

const mapStateToProps = ({meshblu, interaction, inquisitor, monitor}) => {
  return {
    graph: interaction.graph,
    meshbluConfig: meshblu.meshbluConfig,
    subscriptions: interaction.subscriptions,
    things: monitor.things,
    connectionStatus: inquisitor.connectionStatus,
  }
}

export default connect(mapStateToProps)(InteractionGraph)
