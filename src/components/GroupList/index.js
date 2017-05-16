import { isEmpty, map } from 'lodash'
import React, { PropTypes } from 'react'
import List from 'zooid-list'
import Spinner from 'zooid-spinner'

import GroupListItem from '../GroupListItem'

const propTypes = {
  groups: PropTypes.object,
  onGroupSelection: PropTypes.func,
}

const defaultProps = {
  groups: [],
}

const GroupList = ({ groups, onGroupSelection }) => {
  const { devices, fetching } = groups
  if(fetching) return <Spinner size="large" />
  if(isEmpty(devices)) return (
    <a href="https://things.octoblu.com">
      You have no group devices! Create one here!
    </a>
  )
  const groupListItems = map(devices, (group) => {
    return (
      <GroupListItem
        group={group}
        key={group.uuid}
        onGroupSelection={onGroupSelection}
      />
    )
  })

  return (
    <List>{groupListItems}</List>
  )
}

GroupList.propTypes    = propTypes
GroupList.defaultProps = defaultProps

export default GroupList
