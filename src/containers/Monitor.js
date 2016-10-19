import _ from 'lodash'
import React from 'react'
import { browserHistory } from 'react-router'

import MonitorService from '../services/monitor-service'
import { verifyCredentials } from '../services/credentials-service'

export default class Monitor extends React.Component {
  state = {}

  constructor(props){
    super(props)
    this.uuid = props.params.uuid
  }

  componentDidMount(){
    const bearerToken = this.bearerToken

    verifyCredentials({ bearerToken }, (error, verified) => {
      if (error) return this.handleError(error)
      if (!verified) return browserHistory.push('/settings')
      this.monitorService = new MonitorService(this.uuid)
      this.monitorService.monitor((error) => {
        if(error) return this.setState({error})
      })
    })
  }

  componentWillUnmount() {
    if (this.userFirehose) this.userFirehose.close()
  }

  render() {
    const {error} = this.state

    if(error) {
      return <h1> Error: {error.message} </h1>
    }

    return (
      <div>
        <h1>Monitor</h1>
      </div>
    )
  }
}
