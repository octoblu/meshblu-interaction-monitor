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

const ThingListItem = ({thing}) => {
  if (_.isEmpty(thing)) return null
  if (_.isEmpty(thing.uuid)) return null

  const { uuid, logo, type, errors } = thing

  const renderErrors = () => {
    if(_.isEmpty(errors)) return
    if(errors.length == 1)
    return <span className={styles.errorbadge}>{`1 Error`}</span>
    return <span className={styles.errorbadge}>{`${errors.length} Errors`}</span>
  }

  return (
    <div className={styles.root}>
      <div className={styles.logoWrapper}>
        <DeviceImage type={type} logo={logo} className={styles.logo} />
      </div>

      <div className={styles.body}>
        <Link to={`/things/${uuid}`} className={styles.name}>
          <ThingName thing={thing} />
        </Link>
        {renderErrors()}
      </div>
    </div>
  )
}

ThingListItem.propTypes    = propTypes
ThingListItem.defaultProps = defaultProps

export default ThingListItem
