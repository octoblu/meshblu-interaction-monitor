import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import connectInquisitor from  '../actions/InquisitorConnect'
import getMeshbluConfig from '../actions/MeshbluConfigGet'
import connectInteractionGraph from '../actions/InteractionGraphConnect'
import getMonitoredSubscriptions from '../actions/MonitoredSubscriptionsGet'
import getMonitoredThings from  '../actions/MonitoredThingsGet'
import clearErrors from '../actions/ErrorsClear'
import InteractionLayout from '../components/InteractionLayout'
import _ from 'lodash'

import {selectMessage} from '../actions/InquisitorConnect'

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

  onMessageSelection = (message) => {
    this.props.dispatch(selectMessage(message))
  }

  render() {
    const {graph, subscriptions, things, messages, selectedMessage, pauseMessageStream} = this.props
    if(_.isEmpty(graph)) return <h1> Waiting for graph </h1>
    if(_.isEmpty(things)) return <h1> Waiting for things </h1>
    const {nodes} = graph
    return (
      <InteractionLayout
        nodes={nodes}
        subscriptions={subscriptions}
        things={things}
        messages={messages}
        onMessageSelection={this.onMessageSelection}
        pauseMessageStream={pauseMessageStream}
        selectedMessage={selectedMessage}
      />
    )
  }
}

const mapStateToProps = ({meshblu, interaction, inquisitor, monitor, messages}) => {
  return {
    graph: interaction.graph,
    meshbluConfig: meshblu.meshbluConfig,
    subscriptions: interaction.subscriptions,
    things: monitor.things,
    connectionStatus: inquisitor.connectionStatus,
    messages: messages.messages,
    selectedMessage: messages.selected,
    pauseMessageStream: messages.selectedByUser,
  }
}

export default connect(mapStateToProps)(Interactions)
