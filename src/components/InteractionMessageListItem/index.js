import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import DeviceImage from 'zooid-device-icon'
import moment from 'moment'
import ThingName from '../ThingName'

import styles from './styles.css'

const propTypes = {
  message: PropTypes.object,
  thing: PropTypes.object,
  onMessageSelection: PropTypes.func,
}

const defaultProps = {
  message: null,
  thing: null,
  onMessageSelection: _.noop,
}

const MessageThing = ({thing, message}) => {
  if(!thing) return null
  const {device} = thing
  const {type, logo} = device
  return (
    <div className={styles.messageThing}>
      <div className={styles.logoWrapper}>
        <DeviceImage type={type} logo={logo} className={styles.logo} />
      </div>
      <div className={styles.messageWrapper}>
        <pre>{JSON.stringify(message,null,2)}</pre>
      </div>
    </div>
  )
}

class InteractionMessageListItem extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const {message, thing, onMessageSelection} = this.props

    if (_.isEmpty(message)) return null
    if (_.isEmpty(thing)) return null

    const {device} = thing
    const selectMessage = _.partial(onMessageSelection, message)
    return (
      <div className={styles.root} onClick={selectMessage}>
        <ThingName thing={device} />
        <div className={styles.body}>
          <div className={styles.header}>
            <MessageThing thing={thing} message={message}/>
            <span>{moment(message.timestamp).format('MMMM Do YYYY, h:mm:ssa')}</span>
          </div>
          <div className={styles.message}>
          </div>
        </div>
      </div>
    )
  }
}

InteractionMessageListItem.propTypes    = propTypes
InteractionMessageListItem.defaultProps = defaultProps

export default InteractionMessageListItem
