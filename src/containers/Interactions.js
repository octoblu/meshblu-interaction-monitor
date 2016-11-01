import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import connectInquisitor from  '../actions/InquisitorConnect'
import getMeshbluConfig from '../actions/MeshbluConfigGet'
import connectInteractionGraph from '../actions/InteractionGraphConnect'
import getMonitoredSubscriptions from '../actions/MonitoredSubscriptionsGet'
import getMonitoredThings from  '../actions/MonitoredThingsGet'
import clearErrors from '../actions/ErrorsClear'
import InteractionGraph from '../components/InteractionGraph'
import _ from 'lodash'

const propTypes = {
  graph: PropTypes.object,
  meshbluConfig: PropTypes.object,
  subscriptions: PropTypes.array,
  things: PropTypes.array,
  currentMessage: PropTypes.object,
}

class Interactions extends React.Component {
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
    const {graph, subscriptions, things, currentMessage} = this.props
    if(_.isEmpty(graph)) return <h1> Waiting for graph </h1>
    const {nodes} = graph
    return (
      <div>
        <h1>Sup G Money</h1>
        <InteractionGraph nodes={nodes} subscriptions={subscriptions} things={things} currentMessage={currentMessage}/>
      </div>
    )
  }
}

Interactions.propTypes = propTypes

const mapStateToProps = ({meshblu, interaction, inquisitor, monitor}) => {
  return {
    graph: interaction.graph,
    meshbluConfig: meshblu.meshbluConfig,
    subscriptions: interaction.subscriptions,
    things: monitor.things,
    connectionStatus: inquisitor.connectionStatus,
    currentMessage: inquisitor.currentMessage,
  }
}

export default connect(mapStateToProps)(Interactions)