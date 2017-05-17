import _ from 'lodash'
import React, { PropTypes } from 'react'
import styles from './styles.css'

const propTypes = {
  thing: PropTypes.object,
}

const defaultProps = {
  thing: null,
}

const ThingName = ({ thing }) => {
  const { name, uuid } = thing

  if (_.isEmpty(name)) return <div className={styles.root}>{uuid}</div>

  return <div className={styles.root}>{name}</div>
}

ThingName.propTypes    = propTypes
ThingName.defaultProps = defaultProps

export default ThingName
