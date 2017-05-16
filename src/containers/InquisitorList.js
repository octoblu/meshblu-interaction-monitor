import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import url from 'url'
import GroupList from '../components/GroupList'
import getMeshbluConfig from '../actions/MeshbluConfigGet'
import getGroupDevices  from '../actions/GroupDevicesGet'

import {setupInquisitor} from '../services/inquisitor-service'

class InquisitorList extends React.Component {
  componentDidMount() {
    this.props.dispatch(getMeshbluConfig())
  }

  componentWillReceiveProps(nextProps) {
    const {meshbluConfig, groups} = nextProps
    if(!groups.devices && !groups.fetching) return this.props.dispatch(getGroupDevices({meshbluConfig}))
  }

  onGroupSelection = ({uuid}) => {
    console.log("creating for: ", uuid)
    const { meshbluConfig } = this.props
    setupInquisitor({ uuid, meshbluConfig}, (error) => {
      console.log(error, uuid)
      this.redirectToGraph(uuid)
    })
  }

  redirectToGraph(uuid) {
    const { protocol, hostname, port } = window.location
    const pathname = `/${uuid}/graph`
    const uri = url.format({ protocol, hostname, port, pathname })

    window.location = uri
  }

  render() {
    const { groups } = this.props
    return (
      <GroupList
          onGroupSelection={this.onGroupSelection}
          groups={groups}
        />
    )
  }
}

const mapStateToProps = (state) => {
  const {meshblu, groups, fetching} = state
  return {
    meshbluConfig: meshblu.meshbluConfig,
    groups: groups,
  }
}

export default connect(mapStateToProps)(InquisitorList)
