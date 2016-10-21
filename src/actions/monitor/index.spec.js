import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import enableDestroy from 'server-destroy'
import shmock from 'shmock'

import getMonitoredDevices, {getMonitoredDevicesSuccess, getMonitoredDevicesRequest, getMonitoredDevicesFailure} from './'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('MonitorDevicesGet Actions', () => {
  let meshbluMock
  let meshbluConfig
  let userAuth

  before(() => {
    meshbluConfig = {
      hostname: '127.0.0.1',
      port: 0xd00d,
      protocol: 'http',
      uuid: 'my-user-uuid',
      token: 'my-user-token',
    }

    userAuth = new Buffer('my-user-uuid:my-user-token').toString('base64')
    meshbluMock = shmock(0xd00d, [(req, res, next)=>{
      console.log(`${req.method} - ${req.path}`)      
      next()
    }])
    enableDestroy(meshbluMock)
  })

  after((done) => {
    meshbluMock.destroy(done)
  })

  describe('when the request succeeds', () => {
    beforeEach(() => {
      meshbluMock
        .get('/v2/devices/roger-tago-uuid/subscriptions')
        .set('Authorization', `Bearer ${userAuth}`)
        .reply(200, [{subscriberUuid: 'roger-tago-uuid', emitterUuid: 'sven', type: 'configure.received'}])
    })

    const expectedActions = [
      { type: getMonitoredDevicesRequest.getType(), payload: undefined },
      { type: getMonitoredDevicesSuccess.getType(), payload: {uuid: 'roger-tago-uuid'} },
    ]

    const store = mockStore({devices: {}})

    it('should dispatch MESHBLU_DEVICES_GET_SUCCESS', () => {
      return store.dispatch(getMonitoredDevices('roger-tago-uuid', meshbluConfig))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })
})
