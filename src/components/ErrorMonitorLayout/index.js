import _ from 'lodash'
import React, { PropTypes } from 'react'

import ThingList from '../ThingList'
import ErrorViewer from '../ErrorViewer'
import styles from './styles.css'

const propTypes = {
  inquisitor: PropTypes.object,
  things: PropTypes.array,
  selectedThing: PropTypes.object,
  onThingSelection: PropTypes.func,
}

const defaultProps = {
  inquisitor: null,
  things: null,
  selectedThing: null,
  onThingSelection: _.noop
}

const ErrorMonitor = ({inquisitor, things, selectedThing, onThingSelection}) => {
  if (_.isEmpty(things)) return null
  if (_.isEmpty(inquisitor)) return null
  
  return (
    <div className={styles.root}>
      <h1>{inquisitor.name}</h1>
      <div className={styles.main}>
        <ThingList things={things} onThingSelection={onThingSelection} />
        <ErrorViewer thing={selectedThing} />
      </div>
    </div>
  )
}

ErrorMonitor.propTypes    = propTypes
ErrorMonitor.defaultProps = defaultProps

export default ErrorMonitor
