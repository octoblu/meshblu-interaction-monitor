import _ from 'lodash'
import React, { PropTypes } from 'react'
import { HotKeys } from 'react-hotkeys'
import Button from 'zooid-button'

import ErrorViewer from '../ErrorViewer'
import InteractionGraph from '../InteractionGraph'
import InteractionMessageList from '../InteractionMessageList'
import InteractionSelectedMessage from '../InteractionSelectedMessage'
import ThingList from '../ThingList'

import styles from './styles.css'

const InteractionLayout = ({
  focusSearch,
  messageFilter,
  messages,
  nodes,
  onClear,
  onMessageFilterSelection,
  onMessageSelection,
  onSelectedMessagePanelHide,
  onSelectedMessagePanelShow,
  onUnpause,
  pauseMessageStream,
  selectedMessage,
  showSelectedMessagePanel,
  subscriptions,
  things,
}) => {
  const handlers = { 'ctrl+space': onClear }

  return (
    <div className={styles.root}>
      <HotKeys handlers={handlers}>
        <div className={styles.main}>
          <InteractionMessageList
            messageFilter={messageFilter}
            messages={messages}
            onClear={onClear}
            onMessageFilterSelection={onMessageFilterSelection}
            onMessageSelection={onMessageSelection}
            onSelectedMessagePanelShow={onSelectedMessagePanelShow}
            onUnpause={onUnpause}
            pauseMessageStream={pauseMessageStream}
            selectedMessage={selectedMessage}
            showSelectedMessagePanel={showSelectedMessagePanel}
            things={things}
          />
        <InteractionSelectedMessage
          message={selectedMessage}
          onSelectedMessagePanelHide={onSelectedMessagePanelHide}
          onSelectedMessagePanelShow={onSelectedMessagePanelShow}
          showSelectedMessagePanel={showSelectedMessagePanel}
        />
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
