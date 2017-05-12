import _ from 'lodash'
import React, { PropTypes } from 'react'

import InteractionGraph from '../InteractionGraph'
import InteractionMessageList from '../InteractionMessageList'
import ThingList from '../ThingList'
import ErrorViewer from '../ErrorViewer'
import styles from './styles.css'
import Button from 'zooid-button'

const InteractionSelectedMessage = ({message}) => {
  if(_.isEmpty(message)) return null
  return <pre className={styles.selectedMessage}>{JSON.stringify(message, null, 2)}</pre>
}


const PauseButton = ({paused, onUnpause}) => {
  if(!paused) return null
  return <Button onClick={onUnpause}>Resume</Button>
}

const InteractionLayout = ({
  nodes,
  subscriptions,
  things,
  messages,
  messageFilter,
  selectedMessage,
  onEdgesClear,
  onMessageSelection,
  onMessageFilterSelection,
  pauseMessageStream,
  onUnpause
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <h1>Interaction Monitor</h1>
        <PauseButton paused={pauseMessageStream} onUnpause={onUnpause} />
      </div>
      <div className={styles.main}>
        <InteractionMessageList
          messages={messages}
          messageFilter={messageFilter}
          things={things}
          onEdgesClear={onEdgesClear}
          onMessageSelection={onMessageSelection}
          onMessageFilterSelection={onMessageFilterSelection}
          selectedMessage={selectedMessage}
        />
      <InteractionSelectedMessage message={selectedMessage} />
        <InteractionGraph
          nodes={nodes}
          subscriptions={subscriptions}
          things={things}
          onMessageFilterSelection={onMessageFilterSelection}
          selectedMessage={selectedMessage}
          pauseMessageStream={pauseMessageStream}
        />
      </div>
    </div>
  )
}

export default InteractionLayout
