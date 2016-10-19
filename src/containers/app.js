import React, { PropTypes } from 'react'
import Main from '../components/Main'
const propTypes = {
  children: PropTypes.element.isRequired,
}

export default class App extends React.Component {
  render() {
    return (
      <Main>
        {this.props.children}
      </Main>
    )
  }
}

App.propTypes = propTypes
