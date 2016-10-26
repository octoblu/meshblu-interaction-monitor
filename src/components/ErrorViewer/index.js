import _ from 'lodash'
import React, { PropTypes } from 'react'

import ErrorList from '../ErrorList'

import styles from './styles.css'

const propTypes = {
  thing: PropTypes.object,
  onClearErrors: PropTypes.func,
}

const defaultProps = {
  thing: null,
  onClearErrors: _.noop,
}

const ErrorViewer = ({thing, onClearErrors}) => {
  if(_.isEmpty(thing)) return null
  const {errors, statusDevice} = thing
  const clearErrors = _.partial(onClearErrors, statusDevice)
  return (
    <div className={styles.root}>
      <button onClick={clearErrors}>Clear Errors</button>
      <ErrorList errors={errors} />
    </div>
  )
}

ErrorViewer.propTypes    = propTypes
ErrorViewer.defaultProps = defaultProps

export default ErrorViewer
