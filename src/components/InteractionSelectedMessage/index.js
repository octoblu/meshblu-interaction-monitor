import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import styles from './styles.css'

const ToggleButton = ({message, onHide, onShow, showingPanel}) => {
  if (!message) {
    return <Button kind="hollow-neutral" className={styles.invisible} ><div>&lt;</div></Button>
  }

  if (showingPanel) {
    return <Button kind="hollow-neutral" className={styles.floatingButtonHide} onClick={onHide} ><div>&lt;</div></Button>
  }

  return <Button kind="hollow-neutral" className={styles.floatingButtonShow} onClick={onShow} ><div>&lt;</div></Button>
}

const InteractionSelectedMessage = ({message, onSelectedMessagePanelHide, onSelectedMessagePanelShow, showSelectedMessagePanel}) => {
  const formattedMessage = _.isEmpty(message) ? null : JSON.stringify(message, null, 2)

  return (
    <div className={styles.root}>
      <pre className={(showSelectedMessagePanel) ? styles.selectedMessage : styles.hidden}>{formattedMessage}</pre>
      <ToggleButton
        message={message}
        onHide={onSelectedMessagePanelHide}
        onShow={onSelectedMessagePanelShow}
        showingPanel={showSelectedMessagePanel}
        />
    </div>
  )
}

export default InteractionSelectedMessage
