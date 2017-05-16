import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import styles from './styles.css'

const InteractionSelectedMessage = ({message, onSelectedMessagePanelHide, showSelectedMessagePanel}) => {
  if (!showSelectedMessagePanel) return null

  const formattedMessage = _.isEmpty(message) ? null : JSON.stringify(message, null, 2)

  return (
    <div className={styles.root}>
      <pre className={styles.selectedMessage}>{formattedMessage}</pre>
      <Button kind="hollow-neutral" className={styles.floatingButton} onClick={onSelectedMessagePanelHide}>&lt;</Button>
    </div>
  )
}

export default InteractionSelectedMessage
