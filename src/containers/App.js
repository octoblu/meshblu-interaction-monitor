import React, { PropTypes } from 'react'
import { OCTOBLU_URL, OCTOBLU_LOGO_URL } from 'config'
import Authenticated from './Authenticated'
import TopBar from '../components/TopBar'

import 'zooid-ui/dist/style.css'

const propTypes = {
  children: PropTypes.element.isRequired,
}

export default class App extends React.Component {
  render() {
    return (
      <Authenticated>
        <TopBar />
        {this.props.children}
      </Authenticated>
    )
  }
}

App.propTypes = propTypes
