import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ErrorMonitorLayout from '../components/ErrorMonitorLayout'
import getMonitoredThings from  '../actions/MonitoredThingsGet'
import selectMonitoredThing from  '../actions/MonitoredThingSelect'
import getInquisitor from  '../actions/InquisitorGet'
import getMeshbluConfig from '../actions/MeshbluConfigGet'
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
    const {meshbluConfig, inquisitor, things, fetching} = nextProps
    if(!inquisitor) this.props.dispatch(getInquisitor({uuid, meshbluConfig}))
    if(!things) this.props.dispatch(getMonitoredThings({uuid, meshbluConfig}))
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

const mapStateToProps = ({monitor, meshblu}) => {
  return {...monitor, meshbluConfig: meshblu.meshbluConfig}
}

export default connect(mapStateToProps)(ErrorMonitor)
