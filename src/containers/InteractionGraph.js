import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import getMeshbluConfig from '../actions/MeshbluConfigGet'
import connectInteractionGraph from '../actions/InteractionGraphConnect'
import clearErrors from '../actions/ErrorsClear'
import _ from 'lodash'

const propTypes = {
  graph: PropTypes.object,
  meshbluConfig: PropTypes.object,
}

class InteractionGraph extends React.Component {
  componentDidMount() {
    console.log('componentDidMount')
    this.props.dispatch(getMeshbluConfig())
  }

  componentWillReceiveProps(nextProps) {
    const uuid = this.props.params.uuid
    const {meshbluConfig, graph} = nextProps
    if(_.isEmpty(graph)) this.props.dispatch(connectInteractionGraph({uuid, meshbluConfig}))
    // if(connectionStatus == 'initial' && !_.isEmpty(meshbluConfig)) {
    //   this.props.dispatch(connectInquisitor({uuid, meshbluConfig}))
    // }
  }

  render() {
    const {graph} = this.props
    if(_.isEmpty(graph)) return <h1> Waiting for graph </h1>
    renderer.start()
    return (
      <h1> Insert graph here </h1>
    )
  }
}

InteractionGraph.propTypes = propTypes

const mapStateToProps = ({meshblu, interaction}) => {
  return {
    graph: interaction.graph,
    meshbluConfig: meshblu.meshbluConfig
  }
}

export default connect(mapStateToProps)(InteractionGraph)
