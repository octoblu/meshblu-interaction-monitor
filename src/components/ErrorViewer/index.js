import _ from 'lodash'
import React, { PropTypes } from 'react'

import ErrorList from '../ErrorList'

import styles from './styles.css'

const propTypes = {
  thing: PropTypes.object
}

const defaultProps = {
  thing: null
}

const ErrorViewer = ({thing}) => {
  if(_.isEmpty(thing)) return null
  const {errors} = thing
  return (
    <div className={styles.root}>
      <ErrorList errors={errors} />
    </div>
  )
}

ErrorViewer.propTypes    = propTypes
ErrorViewer.defaultProps = defaultProps

export default ErrorViewer
