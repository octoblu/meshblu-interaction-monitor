import _ from 'lodash'
import React, { PropTypes } from 'react'

import ThingListItem from '../ThingListItem'

import styles from './styles.css'

const propTypes = {
  onThingSelection: PropTypes.func,
  selectedThing: PropTypes.object,
  things: PropTypes.array,
}

const defaultProps = {
  onThingSelection: _.noop,
  selectedThing: null,
  things: [],
}

const ThingList = ({ onThingSelection, things, selectedThing }) => {
  if (_.isEmpty(things)) return null
  const selectedThingUuid = _.get(selectedThing, 'uuid')
  const thingItems = _.map(things, (thing) => {
    const { uuid } = thing
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
