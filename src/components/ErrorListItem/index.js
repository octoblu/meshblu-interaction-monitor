import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import DeviceImage from 'zooid-device-icon'

import ThingName from '../ThingName'

import styles from './styles.css'

const propTypes = {
  error: PropTypes.object
}

const defaultProps = {
  error: null
}

const ErrorListItem = ({error}) => {
  if (_.isEmpty(error)) return null

  return (
    <pre className={styles.root}>
      {JSON.stringify(error, null, 2)}
    </pre>
  )
}

ErrorListItem.propTypes    = propTypes
ErrorListItem.defaultProps = defaultProps

export default ErrorListItem
