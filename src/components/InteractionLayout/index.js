import _ from 'lodash'
import React, { PropTypes } from 'react'

import InteractionGraph from '../InteractionGraph'
import InteractionMessageList from '../InteractionMessageList'
import ThingList from '../ThingList'
import ErrorViewer from '../ErrorViewer'
import styles from './styles.css'

const InteractionSelectedMessage = ({message}) => {
  if(_.isEmpty(message)) return null
  return <pre className={styles.selectedMessage}>{JSON.stringify(message, null, 2)}</pre>
}

const InteractionLayout = ({ nodes, subscriptions, things, messages, selectedMessage, onMessageSelection, pauseMessageStream, }) => {
  return (
    <div className={styles.root}>
      <h1>Sup G Money</h1>
      <div className={styles.main}>
        <InteractionMessageList
          messages={messages}
          things={things}
          onMessageSelection={onMessageSelection}
          selectedMessage={selectedMessage}
        />
      <InteractionSelectedMessage message={selectedMessage} />
        <InteractionGraph
          nodes={nodes}
          subscriptions={subscriptions}
          things={things}
          selectedMessage={selectedMessage}
          pauseMessageStream={pauseMessageStream}
        />
      </div>
    </div>
  )
}

export default InteractionLayout
