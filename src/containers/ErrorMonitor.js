import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ErrorMonitorLayout from '../components/ErrorMonitorLayout'
import getMonitoredThings from  '../actions/MonitoredThingsGet'
import getInquisitor from  '../actions/InquisitorGet'
import { getMeshbluConfig } from '../services/auth-service'

const propTypes = {
  dispatch: PropTypes.func,
  things: PropTypes.array,
}

class ErrorMonitor extends React.Component {
  componentDidMount() {
    this.fetch(this.props.params.uuid)
  }

  fetch(uuid) {
    const meshbluConfig = getMeshbluConfig()
    this.props.dispatch(getMonitoredThings({uuid, meshbluConfig}))
    this.props.dispatch(getInquisitor({uuid, meshbluConfig}))
  }

  render() {
    return (
      <ErrorMonitorLayout things={this.props.things} />
    )
  }
}

ErrorMonitor.propTypes = propTypes

const mapStateToProps = ({monitor}) => {
  return monitor
}

export default connect(mapStateToProps)(ErrorMonitor)
