import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import enableDestroy from 'server-destroy'
import shmock from 'shmock'

import getMonitoredThings, {getMonitoredThingsSuccess, getMonitoredThingsRequest, getMonitoredThingsFailure} from './'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

xdescribe('MonitorThingsGet Actions', () => {
  let meshbluMock
  let meshbluConfig
  let userAuth
  let store
  beforeEach(() => {

    store = mockStore({things: {}})

    meshbluConfig = {
      hostname: "localhost",
      port: 0xd00d,
      protocol: 'http',
      uuid: 'my-user-uuid',
      token: 'my-user-token',
    }

    userAuth = new Buffer('my-user-uuid:my-user-token').toString('base64')
    meshbluMock = shmock(0xd00d)
    enableDestroy(meshbluMock)
  })

  afterEach((done) => {
    meshbluMock.destroy(done)
  })

  describe('when the request succeeds', () => {
    beforeEach(() => {
      meshbluMock
        .get('/v2/things/roger-tago-uuid/subscriptions')
        .set('Authorization', `Bearer ${userAuth}`)
        .reply(200, [{subscriberUuid: 'roger-tago-uuid', emitterUuid: 'sven', type: 'configure.received'}])
    })

    it('should dispatch MESHBLU_DEVICES_GET_SUCCESS', () => {
      const expectedActions = [
        { type: getMonitoredThingsRequest.getType(), payload: undefined },
        { type: getMonitoredThingsSuccess.getType(), payload: {uuid: 'roger-tago-uuid'} },
      ]

      return store.dispatch(getMonitoredThings({uuid: 'roger-tago-uuid', meshbluConfig}))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })
})
