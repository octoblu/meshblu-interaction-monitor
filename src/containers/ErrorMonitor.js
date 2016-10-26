import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ErrorMonitorLayout from '../components/ErrorMonitorLayout'
import getMonitoredThings from  '../actions/MonitoredThingsGet'
import selectMonitoredThing from  '../actions/MonitoredThingSelect'
import getInquisitor from  '../actions/InquisitorGet'
import connectInquisitor from  '../actions/InquisitorConnect'
import getMeshbluConfig from '../actions/MeshbluConfigGet'
import clearErrors from '../actions/ErrorsClear'
import _ from 'lodash'

const propTypes = {
  dispatch: PropTypes.func,
  things: PropTypes.array,
  inquisitor: PropTypes.object,
  onThingSelection: PropTypes.func,
}

class ErrorMonitor extends React.Component {
  componentDidMount() {
    this.props.dispatch(getMeshbluConfig())
  }

  componentWillReceiveProps(nextProps) {
    const uuid = this.props.params.uuid
    const {meshbluConfig, inquisitor, things, fetching, connectionStatus} = nextProps
    if(!inquisitor) this.props.dispatch(getInquisitor({uuid, meshbluConfig}))
    if(!things) this.props.dispatch(getMonitoredThings({uuid, meshbluConfig}))

    if(connectionStatus == 'initial' && !_.isEmpty(meshbluConfig)) {
      this.props.dispatch(connectInquisitor({uuid, meshbluConfig}))
    }
  }

  handleThingSelection = (thing) => {
    this.props.dispatch(selectMonitoredThing(thing))
  }

  handleClearErrors = (uuid) => {
    const {meshbluConfig} = this.props
    this.props.dispatch(clearErrors({uuid, meshbluConfig}))
  }

  render() {
    console.log('rendering ErrorMonitor')
    const {things, inquisitor, selectedThing} = this.props
    return (
      <ErrorMonitorLayout
        things={this.props.things}
        inquisitor={this.props.inquisitor}
        onThingSelection={this.handleThingSelection}
        onClearErrors={this.handleClearErrors}
        selectedThing={selectedThing} />
    )
  }
}

ErrorMonitor.propTypes = propTypes

const mapStateToProps = ({monitor, meshblu, inquisitor}) => {
  return {
    things: monitor.things,
    selectedThing: _.find(monitor.things, {statusDevice: monitor.selectedThing}),
    meshbluConfig: meshblu.meshbluConfig,
    inquisitor: inquisitor.device,
    connectionStatus: inquisitor.connectionStatus,
  }
}

export default connect(mapStateToProps)(ErrorMonitor)
