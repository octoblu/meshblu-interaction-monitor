import _ from 'lodash'
import React, { PropTypes } from 'react'

import InteractionMessageListItem from '../InteractionMessageListItem'

import styles from './styles.css'

const InteractionMessageList = ({ things, onMessageSelection, messages, selectedMessage }) => {
  if (_.isEmpty(messages)) return null
  if (_.isEmpty(things)) return null

  const messageItems = _.map(messages, (message) => {
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
      <div>{messages.length}</div>
      <div className={styles.root}>
        {messageItems}
      </div>
    </div>
  )
}

export default InteractionMessageList
