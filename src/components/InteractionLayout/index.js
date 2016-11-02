import _ from 'lodash'
import React, { PropTypes } from 'react'

import InteractionGraph from '../InteractionGraph'
import ThingList from '../ThingList'
import ErrorViewer from '../ErrorViewer'
import styles from './styles.css'

const propTypes = {
  nodes: PropTypes.object,
  subscriptions: PropTypes.array,
  things: PropTypes.object,
  selectedMessage: PropTypes.object
}

const defaultProps = {
  nodes: null,
  subscriptions: null,
  things: null,
  selectedMessage: null,
}

const InteractionLayout = ({ nodes, subscriptions, things, selectedMessage }) => {
  return (
    <div className={styles.root}>
      <h1>Sup G Money</h1>
      <InteractionGraph nodes={nodes} subscriptions={subscriptions} things={things} selectedMessage={selectedMessage}/>
    </div>
  )
}

InteractionLayout.propTypes    = propTypes
InteractionLayout.defaultProps = defaultProps

export default InteractionLayout
