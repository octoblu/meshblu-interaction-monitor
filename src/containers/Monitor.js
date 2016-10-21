import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ThingList from '../components/ThingList'
import getMonitoredThings from  '../actions/monitor'
import { getMeshbluConfig } from '../services/auth-service'

const propTypes = {
  dispatch: PropTypes.func,
  things: PropTypes.array,
}

class Monitor extends React.Component {
  componentDidMount() {
    this.fetchMonitoredThings(this.props.params.uuid)
  }

  fetchMonitoredThings(uuid) {
    const meshbluConfig = getMeshbluConfig()
    this.props.dispatch(getMonitoredThings({uuid, meshbluConfig}))
  }

  render() {
    return (
      <ThingList things={this.props.things} />
    )
  }
}

Monitor.propTypes = propTypes

const mapStateToProps = ({monitor}) => {
  return monitor
}

export default connect(mapStateToProps)(Monitor)
