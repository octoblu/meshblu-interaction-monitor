import _ from 'lodash'
import React from 'react'
import { browserHistory } from 'react-router'

import Firehose from '../services/monitor-service'
import { verifyCredentials } from '../services/credentials-service'

export default class Monitor extends React.Component {
  state = {}

  constructor(props){
    super(props)
    console.log(props.location)
  }

  componentDidMount(){
    const bearerToken = this.bearerToken

    verifyCredentials({ bearerToken }, (error, verified) => {
      if (error) return this.handleError(error)
      if (!verified) return browserHistory.push('/settings')
      this.firehose = new Firehose()
    })
  }

  componentWillUnmount() {
    if (this.userFirehose) this.userFirehose.close()
  }

  handleError = (error) => {
    if (!error) return

    this.setState({ error })
  }

  render() {
    return (
      <h1>Monitor</h1>
    )
  }
}
