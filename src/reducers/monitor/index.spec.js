import { expect } from 'chai'
import { listSubscriptionsActions } from 'redux-meshblu'

import { getMonitoredThingsRequest, getMonitoredThingsSuccess, getMonitoredThingsFailure } from '../../actions/monitor'

import reducer from './'

describe('Monitor Reducer', () => {
  const initialState = {
    things: null,
    error: null,
    fetching: false,
  }

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState)
  })

  describe('getMonitoredThings', () => {
    it('should handle fetching request', () => {
      expect(
        reducer(undefined, { type: getMonitoredThingsRequest.getType() })
      ).to.deep.equal({ ...initialState, fetching: true })
    })

    it('should handle fetching success', () => {
      const things = [
        {subscriberUuid: 'inquisitor', emitterUuid: 'uuid-1', type: 'configure.received'},
        { uuid: 'my-thing-2-uuid' },
      ]

      expect(reducer(undefined, {
        type: getMonitoredThingsSuccess.getType(),
        payload: things,
      })).to.deep.equal({ ...initialState, things })
    })

    it('should handle fetching failure', () => {
      expect(reducer(undefined, {
        type: getMonitoredThingsFailure.getType(),
        payload: new Error('Bang!'),
      })).to.deep.equal({ ...initialState, error: new Error('Bang!') })
    })
  })
})
