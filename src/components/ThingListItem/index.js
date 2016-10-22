import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import DeviceImage from 'zooid-device-icon'

import ThingName from '../ThingName'

import styles from './styles.css'

const propTypes = {
  onThingSelection: PropTypes.func,
  selected: PropTypes.bool,
  thing: PropTypes.object,
}

const defaultProps = {
  thing: null,
}

const ThingListItem = ({thing, onThingSelection, selected}) => {
  if (_.isEmpty(thing)) return null
  const {device, errors} = thing
  const { uuid, logo, type} = device

  const renderErrors = () => {
    if(_.isEmpty(errors)) return
    return <span className={styles.errorbadge}>{`${errors.length}`}</span>
  }

  const handleClick = _.partial(onThingSelection, thing)
  let classes = styles.root
  if(selected)
    classes = `${styles.root} ${styles.selected}`

  return (
    <div className={classes} onClick={handleClick}>
      <div className={styles.logoWrapper}>
        <DeviceImage type={type} logo={logo} className={styles.logo} />
      </div>

      <div className={styles.body}>
        <ThingName thing={device} />
        {renderErrors()}
      </div>
    </div>
  )
}

ThingListItem.propTypes    = propTypes
ThingListItem.defaultProps = defaultProps

export default ThingListItem
