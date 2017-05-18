import _ from 'lodash'
import React, { PropTypes } from 'react'
import Button from 'zooid-button'

import InteractionMessageListItem from '../InteractionMessageListItem'
import InteractionMessageListFilter from '../InteractionMessageListFilter'

import styles from './styles.css'

const PauseButton = ({paused, onUnpause}) => {
  if(!paused) return null
  return <Button className={styles.leftButton} kind="hollow-danger" onClick={onUnpause}>Resume</Button>
}

const ClearButton = ({show, onClear}) => {
  if (!show) return null
  return <Button onClick={onClear} kind="hollow-primary">Clear</Button>
}

const InteractionMessageList = ({
  messageFilter,
  messages,
  onClear,
  onMessageFilterSelection,
  onMessageSelection,
  onSelectedMessagePanelHide,
  onSelectedMessagePanelShow,
  onUnpause,
  pauseMessageStream,
  selectedMessage,
  showSelectedMessagePanel,
  things,
}) => {
  const messageItems = _.map(messages, (message) => {
    if(messageFilter) {
       if(!_.some(message.metadata.route, ({from, to}) => from === messageFilter || to === messageFilter)) {
         return null
       }
    }
    let thing
    const hop = _.last(_.reject(message.metadata.route, ({from, to}) => from === to))
    if(hop) thing = things[hop.from]
    return (
      <InteractionMessageListItem
        onMessageSelection={onMessageSelection}
        message={message}
        selected={message.metadata.responseId === selectedMessage.metadata.responseId}
        thing={thing}
        key={message.metadata.responseId}
      />
    )
  })

  return (
    <div className={styles.column}>
      <div className={styles.subHeader}>
        <PauseButton paused={pauseMessageStream} onUnpause={onUnpause} />
        <ClearButton show={!_.isEmpty(messages)} onClear={onClear} />
      </div>
      <div className={styles.column}>
        {messageItems}
      </div>
    </div>
  )
}

export default InteractionMessageList
