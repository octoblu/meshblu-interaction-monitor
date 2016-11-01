import _ from 'lodash'
import React, { PropTypes } from 'react'

import ThingListItem from '../ThingListItem'

import styles from './styles.css'

const propTypes = {
  onThingSelection: PropTypes.func,
  selectedThing: PropTypes.object,
  things: PropTypes.object,
}

const defaultProps = {
  onThingSelection: _.noop,
  selectedThing: null,
  things: null,
}

const ThingList = ({ onThingSelection, things, selectedThing }) => {
  if (_.isEmpty(things)) return null
  const selectedThingUuid = _.get(selectedThing, 'device.uuid')
  const thingItems = _.map(things, (thing, uuid) => {
    return (
      <ThingListItem
        onThingSelection={onThingSelection}
        selected={uuid === selectedThingUuid}
        thing={thing}
        key={uuid}
      />
    )
  })

  return <div className={styles.root}>{thingItems}</div>
}

ThingList.propTypes    = propTypes
ThingList.defaultProps = defaultProps

export default ThingList
