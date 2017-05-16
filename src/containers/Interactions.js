import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {selectedMessagePanelHide, selectedMessagePanelShow} from '../actions/GraphInterface'
import connectInquisitor from  '../actions/InquisitorConnect'
import getMeshbluConfig from '../actions/MeshbluConfigGet'
import connectInteractionGraph, { clearAll } from '../actions/InteractionGraphConnect'
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

  handleClear = () => {
    this.props.dispatch(clearAll())
  }

  handleMessageSelection = (message) => {
    this.props.dispatch(selectedMessagePanelShow())
    this.props.dispatch(selectMessage(message))
  }

  handleMessageFilterSelection = (uuid) => {
    this.props.dispatch(filterMessageStream(uuid))
  }

  handleSelectedMessagePanelHide = () => {
    this.props.dispatch(selectedMessagePanelHide())
  }

  handleSelectedMessagePanelShow = () => {
    this.props.dispatch(selectedMessagePanelShow())
  }

  handleUnpause = () => {
    this.props.dispatch(unpauseMessageStream())
  }

  render() {
    const {graph, subscriptions, things, messages, selectedMessage, pauseMessageStream, messageFilter, showSelectedMessagePanel} = this.props

    if(_.isEmpty(graph)) return <h1> Waiting for graph </h1>
    if(_.isEmpty(things)) return <h1> Waiting for things </h1>

    const {nodes} = graph
    return (
      <InteractionLayout
        nodes={nodes}
        subscriptions={subscriptions}
        things={things}
        messages={messages}
        onClear={this.handleClear}
        onMessageSelection={this.handleMessageSelection}
        onMessageFilterSelection={this.handleMessageFilterSelection}
        onSelectedMessagePanelHide={this.handleSelectedMessagePanelHide}
        onSelectedMessagePanelShow={this.handleSelectedMessagePanelShow}
        showSelectedMessagePanel={showSelectedMessagePanel}
        messageFilter={messageFilter}
        pauseMessageStream={pauseMessageStream}
        selectedMessage={selectedMessage}
        onUnpause={this.handleUnpause}
      />
    )
  }
}

const mapStateToProps = ({meshblu, interaction, inquisitor, monitor, messages, graphInterface}) => {
  return {
    connectionStatus: inquisitor.connectionStatus,
    graph: interaction.graph,
    meshbluConfig: meshblu.meshbluConfig,
    messageFilter: messages.filter,
    messages: messages.messages,
    pauseMessageStream: messages.selectedByUser,
    selectedMessage: messages.selected,
    showSelectedMessagePanel: graphInterface.showSelectedMessagePanel,
    subscriptions: interaction.subscriptions,
    things: monitor.things,
  }
}

export default connect(mapStateToProps)(Interactions)
