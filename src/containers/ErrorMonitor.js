import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ErrorMonitorLayout from '../components/ErrorMonitorLayout'
import getMonitoredThings from  '../actions/MonitoredThingsGet'
import selectMonitoredThing from  '../actions/MonitoredThingSelect'
import getInquisitor from  '../actions/InquisitorGet'
import { getMeshbluConfig } from '../services/auth-service'

const propTypes = {
  dispatch: PropTypes.func,
  things: PropTypes.array,
  inquisitor: PropTypes.object,
  onThingSelection: PropTypes.func,
}

class ErrorMonitor extends React.Component {
  componentDidMount() {
    this.fetch(this.props.params.uuid)
  }

  fetch = (uuid) => {
    const meshbluConfig = getMeshbluConfig()
    this.props.dispatch(getMonitoredThings({uuid, meshbluConfig}))
    this.props.dispatch(getInquisitor({uuid, meshbluConfig}))
  }

  handleThingSelection = (thing) => {
    this.props.dispatch(selectMonitoredThing(thing))
  }

  render() {
    const {things, inquisitor, selectedThing} = this.props
    return (
      <ErrorMonitorLayout
        things={this.props.things}
        inquisitor={this.props.inquisitor}
        onThingSelection={this.handleThingSelection}
        selectedThing={selectedThing} />
    )
  }
}

ErrorMonitor.propTypes = propTypes

const mapStateToProps = ({monitor}) => {
  return monitor
}

export default connect(mapStateToProps)(ErrorMonitor)
