import _ from 'lodash'
import React, { PropTypes } from 'react'
import styles from './styles.css'
import InteractionNode from '../InteractionNode'

const propTypes = {
  nodes: PropTypes.object,
  subscriptions: PropTypes.array,
  things: PropTypes.object,
  selectedMessage: PropTypes.object,
}

const defaultProps = {
  nodes: null,
  subscriptions: null,
  things: null,
  selectedMessage: null,
}

const getDimensions =  (nodes) => {
  nodes = _.values(nodes)
  if( _.isEmpty(nodes)) return {minX: -10, minY: -10, width: 20, height: 20}
  const minX = _.minBy(nodes, 'x').x
  const minY = _.minBy(nodes, 'y').y
  const maxX = _.maxBy(nodes, 'x').x
  const maxY = _.maxBy(nodes, 'y').y
  const width = maxX - minX
  const height = maxY - minY
  return {minX: minX - 5, minY: minY - 5, width: width + 10, height: height + 10}
}

const renderNodes = ({nodes, things, selectedMessage}) => {
  return _.map(nodes, function(node, uuid){
    const thing = things[uuid]
    let selected = false

    if(selectedMessage) {
      selected = _.some(selectedMessage.metadata.route, ({from, to}) => uuid === from || uuid === to)
    }
    return <InteractionNode key={uuid} x={node.x} y={node.y} thing={thing} selected={selected} />
  })
}

const hashCode = function(str) {
  let hash = 0, i, chr, len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

const renderEdges = ({subscriptions, nodes}) => {
  let usedKeys = {}
  return _.map(subscriptions, ({subscriberUuid, emitterUuid, type}) => {
    const lineKey = `${subscriberUuid}:${emitterUuid}`
    if (usedKeys[lineKey]) return
    usedKeys[lineKey] = true
    if (subscriberUuid == emitterUuid) return
    const subscriber = nodes[subscriberUuid]
    const emitter = nodes[emitterUuid]
    if(!subscriber || !emitter) return
    // const lineKey = `${subscriberUuid}:${emitterUuid}:${type}`
    return (<line key={lineKey} className={styles.edge} x1={subscriber.x} y1={subscriber.y} x2={emitter.x} y2={emitter.y} />)
  })
}

const InteractionGraph = ({nodes, subscriptions, things, selectedMessage}) => {
  const {minX, minY, width, height} = getDimensions(nodes)
  return (
    <svg key="interactionGraph" className={styles.graph} viewBox={`${minX} ${minY} ${width} ${height}`}>
      <defs>
        <marker id="arrow" markerWidth="4" markerHeight="4"
                orient="auto" refY="2">
          <path d="M0,0 L4,2 0,4" />
        </marker>
      </defs>
      <g>{renderEdges({subscriptions, nodes, selectedMessage})}</g>
      <g>{renderNodes({nodes, things, selectedMessage})}</g>
    </svg>
  )
}

InteractionGraph.propTypes    = propTypes
InteractionGraph.defaultProps = defaultProps

export default InteractionGraph
