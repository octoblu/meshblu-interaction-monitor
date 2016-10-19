import _ from 'lodash'
import React from 'react'
import { browserHistory } from 'react-router'

import SettingsPage from '../components/SettingsPage'
import { getCredentials, setCredentials } from '../services/credentials-service'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      credentials: getCredentials()
    }
  }

  onChange = (change) => {
    const credentials = _.assign({}, this.state.credentials, change)
    this.setState({ credentials })
  }

  onSave = () => {
    const {credentials} = this.state
    setCredentials(credentials)
    browserHistory.push('/')
  }

  render() {
    const {error, credentials} = this.state

    return (
      <SettingsPage error={error} credentials={credentials} onChange={this.onChange} onSave={this.onSave} />
    )
  }
}
