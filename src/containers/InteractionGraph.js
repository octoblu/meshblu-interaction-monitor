import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import getMeshbluConfig from '../actions/MeshbluConfigGet'
import connectInteractionGraph from '../actions/InteractionGraphConnect'
import getInteractionSubscriptions from '../actions/InteractionSubscriptionsGet'
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
    console.log('componentDidMount')
    this.props.dispatch(getMeshbluConfig())
  }

  componentWillReceiveProps(nextProps) {
    const uuid = this.props.params.uuid
    const {meshbluConfig, graph, subscriptions, things} = nextProps

    if(!subscriptions) return this.props.dispatch(getInteractionSubscriptions({uuid, meshbluConfig}))
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
            {this.renderNodes({nodes, things})}
            {this.renderEdges({subscriptions, nodes})}
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
    return _.map(subscriptions, ({subscriberUuid, emitterUuid}) => {
      const subscriber = nodes[subscriberUuid]
      const emitter = nodes[emitterUuid]
      if(!subscriber || !emitter) return
      return <line x1={`${subscriber.x}`} y1={`${subscriber.y}`} x2={`${emitter.x}`} y2={`${emitter.y}`} strokeWidth=".01" stroke="black" />
    })
  }
}

InteractionGraph.propTypes = propTypes

const mapStateToProps = ({meshblu, interaction, monitor}) => {
  return {
    graph: interaction.graph,
    meshbluConfig: meshblu.meshbluConfig,
    subscriptions: interaction.subscriptions,
    things: monitor.things,
  }
}

export default connect(mapStateToProps)(InteractionGraph)
