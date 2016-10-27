import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import getMeshbluConfig from '../actions/MeshbluConfigGet'
import connectInteractionGraph from '../actions/InteractionGraphConnect'
import getInteractionSubscriptions from '../actions/InteractionSubscriptionsGet'
import clearErrors from '../actions/ErrorsClear'
import _ from 'lodash'

const propTypes = {
  graph: PropTypes.object,
  meshbluConfig: PropTypes.object,
}

class InteractionGraph extends React.Component {
  componentDidMount() {
    console.log('componentDidMount')
    this.props.dispatch(getMeshbluConfig())
  }

  componentWillReceiveProps(nextProps) {
    const uuid = this.props.params.uuid
    const {meshbluConfig, graph, subscriptions} = nextProps
    if(!subscriptions) return this.props.dispatch(getInteractionSubscriptions({uuid, meshbluConfig}))
    if(_.isEmpty(graph)) this.props.dispatch(connectInteractionGraph({subscriptions, uuid, meshbluConfig}))
    // if(connectionStatus == 'initial' && !_.isEmpty(meshbluConfig)) {
    //   this.props.dispatch(connectInquisitor({uuid, meshbluConfig}))
    // }
  }

  render() {
    const {graph, subscriptions} = this.props
    if(_.isEmpty(graph)) return <h1> Waiting for graph </h1>
    const {nodes} = graph
    return (
      <div>
        <h1>Sup G Money</h1>
        <svg viewBox="-10 -10 20 20">
            {this.renderNodes(nodes)}
            {this.renderEdges({subscriptions, nodes})}
        </svg>
      </div>
    )
  }

  renderNodes (nodes) {
    console.log(nodes)
    return _.map(nodes, function(node, id){
      return <circle key={id} cx={`${node.x}`} cy={`${node.y}`} r=".1"/>
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

const mapStateToProps = ({meshblu, interaction}) => {
  return {
    graph: interaction.graph,
    meshbluConfig: meshblu.meshbluConfig,
    subscriptions: interaction.subscriptions,
  }
}

export default connect(mapStateToProps)(InteractionGraph)
