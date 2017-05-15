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

const InteractionMessageList = ({ things, onClear, onMessageSelection, onMessageFilterSelection, onUnpause, messages, selectedMessage, messageFilter, pauseMessageStream }) => {
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
    <div className={styles.root}>
      <InteractionMessageListFilter
        className={styles.filterSelect}
        things={things}
        onMessageFilterSelection={onMessageFilterSelection}
        messageFilter={messageFilter} />
      <div className={styles.subHeader}>
        <span>{messages.length}</span>
        <div>
          <PauseButton paused={pauseMessageStream} onUnpause={onUnpause} />
          <Button onClick={onClear} kind="hollow-primary">Clear</Button>
        </div>
      </div>
      <div className={styles.root}>
        {messageItems}
      </div>
    </div>
  )
}

export default InteractionMessageList
