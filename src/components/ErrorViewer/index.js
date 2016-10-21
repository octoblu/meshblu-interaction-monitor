import _ from 'lodash'
import React, { PropTypes } from 'react'

import ErrorViewerItem from '../ThingListItem'

import styles from './styles.css'

const propTypes = {
  thing: PropTypes.object
}

const defaultProps = {
  thing: null
}

const ErrorViewer = ({thing}) => {
  if (_.isEmpty(thing)) return null
  return <div className={styles.root}>I'm the viewer</div>
}

ErrorViewer.propTypes    = propTypes
ErrorViewer.defaultProps = defaultProps

export default ErrorViewer
