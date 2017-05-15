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
  if(_.isEmpty(message)) return <pre className={styles.selectedMessage}/>
  return <pre className={styles.selectedMessage}>{JSON.stringify(message, null, 2)}</pre>
}

const InteractionLayout = ({
  focusSearch,
  messageFilter,
  messages,
  nodes,
  onClear,
  onMessageFilterSelection,
  onMessageSelection,
  onUnpause,
  pauseMessageStream,
  selectedMessage,
  subscriptions,
  things,
}) => {
  const handlers = { 'ctrl+space': onClear }

  return (
    <div className={styles.root}>
      <HotKeys handlers={handlers}>
        <div className={styles.main}>
          <InteractionMessageList
            messages={messages}
            messageFilter={messageFilter}
            things={things}
            onClear={onClear}
            onMessageSelection={onMessageSelection}
            onMessageFilterSelection={onMessageFilterSelection}
            onUnpause={onUnpause}
            pauseMessageStream={pauseMessageStream}
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
