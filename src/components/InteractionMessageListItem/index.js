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

const MessageThing = ({thing, message, onMessageSelection, selected}) => {
  if(!thing) return null
  const {device} = thing
  const {type, logo} = device
  const classes = [styles.root]
  if(selected) {
    classes.push(styles.selected)
  }

  const handleClick = _.partial(onMessageSelection, message)
  return (
    <div onClick={handleClick} className={classes.join(' ')}>
      <div className={styles.header}>
        <DeviceImage type={type} logo={logo} className={styles.logo} />
        <div className={styles.name}>
          <ThingName thing={device} />
          <div className={styles.time}>
            {moment(message.timestamp).format('h:mm:ssa')}
          </div>
        </div>
      </div>
    </div>
  )
}

class InteractionMessageListItem extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.selected !== nextProps.selected
  }

  render() {
    const {message, thing, onMessageSelection, selected} = this.props

    if (_.isEmpty(message)) return null
    if (_.isEmpty(thing)) return null

    const {device} = thing
    // const selectMessage = (message) => {
    //   console.log('selected message', {message})
    // }
    return (<MessageThing onMessageSelection={onMessageSelection} thing={thing} message={message} selected={selected}/>)
  }
}

InteractionMessageListItem.propTypes    = propTypes
InteractionMessageListItem.defaultProps = defaultProps

export default InteractionMessageListItem
