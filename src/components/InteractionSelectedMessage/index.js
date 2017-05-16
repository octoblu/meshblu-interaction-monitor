import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import styles from './styles.css'


const InteractionSelectedMessage = ({message, onSelectedMessagePanelHide, onSelectedMessagePanelShow, showSelectedMessagePanel}) => {
  const formattedMessage = _.isEmpty(message) ? null : JSON.stringify(message, null, 2)
  const buttonClass = (showSelectedMessagePanel) ? styles.floatingButtonHide : styles.floatingButtonShow
  const buttonOnClick = (showSelectedMessagePanel) ? onSelectedMessagePanelHide : onSelectedMessagePanelShow

  return (
    <div className={styles.root}>
      <pre className={(showSelectedMessagePanel) ? styles.selectedMessage : styles.hidden}>{formattedMessage}</pre>
      <Button kind="hollow-neutral" className={buttonClass} onClick={buttonOnClick} ><div>&lt;</div></Button>
    </div>
  )
}

export default InteractionSelectedMessage
