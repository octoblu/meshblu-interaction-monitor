import _ from 'lodash'
import React, { PropTypes } from 'react'

import InteractionGraph from '../InteractionGraph'
import ThingList from '../ThingList'
import ErrorViewer from '../ErrorViewer'
import styles from './styles.css'

const propTypes = {
  nodes: PropTypes.object,
  subscriptions: PropTypes.array,
  things: PropTypes.array,
  currentMessage: PropTypes.object
}

const defaultProps = {
  nodes: null,
  subscriptions: null,
  things: null,
  currentMessage: null,
}

const InteractionLayout = ({ nodes, subscriptions, things, currentMessage }) => {
  return (
    <div className={styles.root}>
      <h1>Sup G Money</h1>
      <InteractionGraph nodes={nodes} subscriptions={subscriptions} things={things} currentMessage={currentMessage}/>
    </div>
  )
}

InteractionLayout.propTypes    = propTypes
InteractionLayout.defaultProps = defaultProps

export default InteractionLayout
