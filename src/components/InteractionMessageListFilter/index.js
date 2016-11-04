import _ from 'lodash'
import React, { PropTypes } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import styles from './styles.css'

const InteractionMessageListFilter = ({ things, onMessageFilterSelection, messageFilter }) => {
  if (_.isEmpty(things)) return null

  const options = _.map(things, ({device}) => {
    return {label: device.name || device.uuid, value: device.uuid}
  })

  const handleMessageFilterSelection = (selected) => {
    if(!selected) return onMessageFilterSelection()
    onMessageFilterSelection(selected.value)
  }
  return (
    <Select options={options} value={messageFilter} onChange={handleMessageFilterSelection}/>
  )
}

export default InteractionMessageListFilter
