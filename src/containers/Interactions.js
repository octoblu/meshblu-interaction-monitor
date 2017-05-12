import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import connectInquisitor from  '../actions/InquisitorConnect'
import getMeshbluConfig from '../actions/MeshbluConfigGet'
import connectInteractionGraph, {clearEdges} from '../actions/InteractionGraphConnect'
import getMonitoredSubscriptions from '../actions/MonitoredSubscriptionsGet'
import getMonitoredThings from  '../actions/MonitoredThingsGet'
import clearErrors from '../actions/ErrorsClear'
import InteractionLayout from '../components/InteractionLayout'
import _ from 'lodash'

import {selectMessage, unpauseMessageStream, filterMessageStream} from '../actions/InquisitorConnect'

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

  handleEdgesClear = () => {
    this.props.dispatch(clearEdges())
  }

  handleMessageSelection = (message) => {
    this.props.dispatch(selectMessage(message))
  }

  handleMessageFilterSelection = (uuid) => {
    this.props.dispatch(filterMessageStream(uuid))
  }

  handleUnpause = () => {
    this.props.dispatch(unpauseMessageStream())
  }

  render() {
    const {graph, subscriptions, things, messages, selectedMessage, pauseMessageStream, messageFilter} = this.props
    if(_.isEmpty(graph)) return <h1> Waiting for graph </h1>
    if(_.isEmpty(things)) return <h1> Waiting for things </h1>
    const {nodes} = graph
    return (
      <InteractionLayout
        nodes={nodes}
        subscriptions={subscriptions}
        things={things}
        messages={messages}
        onEdgesClear={this.handleEdgesClear}
        onMessageSelection={this.handleMessageSelection}
        onMessageFilterSelection={this.handleMessageFilterSelection}
        messageFilter={messageFilter}
        pauseMessageStream={pauseMessageStream}
        selectedMessage={selectedMessage}
        onUnpause={this.handleUnpause}
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
    messageFilter: messages.filter,
  }
}

export default connect(mapStateToProps)(Interactions)
