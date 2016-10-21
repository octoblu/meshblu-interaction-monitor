import _ from 'lodash'
import React, { PropTypes } from 'react'

import styles from './styles.css'

import ErrorListItem from '../ErrorListItem'

const propTypes = {
  errors: PropTypes.array
}

const defaultProps = {
  errors: null
}

const ErrorList = ({errors}) => {
  if (_.isEmpty(errors)) return null
  const errorItems = _.map(errors, (error, index) => {
    return (
      <li key={index}><ErrorListItem error={error}/></li>
    )
  })

  return (
    <ul className={styles.root}>
      {errorItems}
    </ul>
  )
}

ErrorList.propTypes    = propTypes
ErrorList.defaultProps = defaultProps

export default ErrorList
