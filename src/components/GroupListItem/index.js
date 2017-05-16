import _ from 'lodash'
import React, { PropTypes } from 'react'
import { ListItem } from 'zooid-list'

import styles from './styles.css'

const propTypes = {
  group: PropTypes.object,
  onGroupSelection: PropTypes.func,
}

const defaultProps = {
  group: null,
  onGroupSelection: _.noop,
}

const GroupListItem = ({ group, onGroupSelection }) => {
  return (
    <ListItem className={styles.root}>
      <span>{group.name}</span>
      <a onClick={() => onGroupSelection({ uuid: group.uuid })}>
        Graph
      </a>
    </ListItem>
  )
}

GroupListItem.propTypes    = propTypes
GroupListItem.defaultProps = defaultProps

export default GroupListItem
