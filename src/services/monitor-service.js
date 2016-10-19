import MeshbluHTTP from 'browser-meshblu-http'
import _ from 'lodash'
import Firehose from 'meshblu-firehose-socket.io/src/firehose-socket-io.coffee'

import { getCredentials } from '../services/credentials-service'

export default class MonitorService {
  constructor(uuidToMonitor) {
    if(!uuidToMonitor) throw new Error('MonitorService must be constructed with a uuid to monitor.')
    this._uuidToMonitor = uuidToMonitor
    const { uuid, token } = getCredentials()
    this._lastUpdatedAts = {}
    this._onActivitiesHandlers = []
    this._onRoomIdHandlers = []
    this._onUserHandlers = []

    this._meshbluConfig = {
      hostname: 'meshblu-firehose-socket-io.octoblu.com',
      port: 443,
      protocol: 'https',
      uuid,
      token
    }

    this._firehose = new Firehose({ meshbluConfig: this._meshbluConfig })
    this._meshblu = new MeshbluHTTP({uuid, token})
    this._firehose.on('message', this._onMessage)
  }

  monitor(callback) {
    this._meshblu.device(this._uuidToMonitor, (error, device) => {
      if(error) return callback(error)
      console.log(device)
    })
  }

  close(callback){
    this._firehose.close(callback)
  }

  _onMessage(message){
    console.log('got a message!', message)
  }
}
