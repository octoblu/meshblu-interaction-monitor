import _ from 'lodash'
import React, { PropTypes } from 'react'

import InteractionGraph from '../InteractionGraph'
import InteractionMessageList from '../InteractionMessageList'
import ThingList from '../ThingList'
import ErrorViewer from '../ErrorViewer'
import styles from './styles.css'

const propTypes = {
  nodes: PropTypes.object,
  subscriptions: PropTypes.array,
  things: PropTypes.object,
  messages: PropTypes.array,
  selectedMessage: PropTypes.object,
  onMessageSelection: PropTypes.func,
}

const defaultProps = {
  nodes: null,
  subscriptions: null,
  things: null,
  messages: null,
  selectedMessage: null,
}

const InteractionLayout = ({ nodes, subscriptions, things, messages, selectedMessage, onMessageSelection }) => {
  return (
    <div className={styles.root}>
      <h1>Sup G Money</h1>
      <div className={styles.main}>
        <InteractionMessageList messages={messages} things={things} onMessageSelection={onMessageSelection} selectedMessage={selectedMessage} />
        <InteractionGraph nodes={nodes} subscriptions={subscriptions} things={things} selectedMessage={selectedMessage}/>
      </div>
    </div>
  )
}

InteractionLayout.propTypes    = propTypes
InteractionLayout.defaultProps = defaultProps

export default InteractionLayout
