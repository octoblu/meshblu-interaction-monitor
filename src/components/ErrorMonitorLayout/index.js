import _ from 'lodash'
import React, { PropTypes } from 'react'

import ThingList from '../ThingList'
import styles from './styles.css'

const propTypes = {
  inquisitor: PropTypes.object,
  things: PropTypes.array,
}

const defaultProps = {
  inquisitor: null,
  things: null,
}

const ErrorMonitor = ({inquisitor, things}) => {
  if (_.isEmpty(things)) return null
  if (_.isEmpty(inquisitor)) return null
  return (
    <div className={styles.root}>
      <h1>{inquisitor.name}</h1>
      <ThingList things={this.props.things} />
    </div>
  )
}

ErrorMonitor.propTypes    = propTypes
ErrorMonitor.defaultProps = defaultProps

export default ErrorMonitor
