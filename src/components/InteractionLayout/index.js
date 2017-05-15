import _ from 'lodash'
import React, { PropTypes } from 'react'
import { HotKeys } from 'react-hotkeys'
import Button from 'zooid-button'

import ErrorViewer from '../ErrorViewer'
import InteractionGraph from '../InteractionGraph'
import InteractionMessageList from '../InteractionMessageList'
import ThingList from '../ThingList'

import styles from './styles.css'

const InteractionSelectedMessage = ({message}) => {
  if(_.isEmpty(message)) return null
  return <pre className={styles.selectedMessage}>{JSON.stringify(message, null, 2)}</pre>
}

const PauseButton = ({paused, onUnpause}) => {
  if(!paused) return null
  return <Button onClick={onUnpause}>Resume</Button>
}

const InteractionLayout = ({
  focusSearch,
  messageFilter,
  messages,
  nodes,
  onEdgesClear,
  onMessageFilterSelection,
  onMessageSelection,
  onUnpause,
  pauseMessageStream,
  selectedMessage,
  subscriptions,
  things,
}) => {
  const handlers = { 'ctrl+space': onEdgesClear }

  return (
    <div className={styles.root}>
      <HotKeys handlers={handlers}>
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
      </HotKeys>
    </div>
  )
}

export default InteractionLayout
