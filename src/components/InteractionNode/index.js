import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import DeviceImage from 'zooid-device-icon'

import ThingName from '../ThingName'

import styles from './styles.css'

const propTypes = {
  thing: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  selected: PropTypes.bool,
}

const defaultProps = {
  error: null
}

const getDeviceIconUrl = ({logo, type}) => {
  if(!_.isEmpty(logo)) return logo
  if (_.isEmpty(type)) return type
  const types = type.split(':')
  const iconType = types[0]
  const iconName = types[1]
  return `https://icons.octoblu.com/${iconType}/${iconName}.svg`
}

const NodeLogo = ({device}) => {
  const logoUrl = getDeviceIconUrl(device)
  if(_.isEmpty(logoUrl)) return null
  return (
    <image href={logoUrl} preserveAspectRatio="xMidYMax" x="-5" y="-5" width="10" height="10"/>
  )
}

const NodeErrors = ({errors}) => {
  if(_.isEmpty(errors)) return null
  return <circle cx="6" cy="-6" r="1.5" fill="red"/>
}


const NodeCounts = ({counts}) => {
  counts = counts || {}
  let received = 0
  let sent = 0

  _.each(counts, (messageType) => {
    received += messageType.received
    sent += messageType.sent
  })

  return <text x="8" y="-5" fontSize="3" alignmentBaseline="middle" textAnchor="left" fill="grey">{received}rx / {sent}tx</text>
}

const InteractionNode = ({thing, x, y, selected}) => {
  if (_.isEmpty(thing)) {
    return null
  }
  const {uuid, device, errors} = thing
  const name = device.name || device.uuid

  let width = 10, height = 3

  if(selected) {
    width *= 1.25
    height *= 1.25
  }

  return (
    <svg className={styles.root} width={width} height={height} x={x-(width/2)} y={y-(height/2)} key={uuid} viewBox="-10 -10 20 20">
        <NodeCounts counts={thing.counts}/>
        <NodeLogo device={device}/>
        <NodeErrors errors={errors}/>
        <text x="0" y="8" fontSize="3" alignmentBaseline="middle" textAnchor="middle">{name}</text>
    </svg>
  )
}

InteractionNode.propTypes    = propTypes
InteractionNode.defaultProps = defaultProps

export default InteractionNode
