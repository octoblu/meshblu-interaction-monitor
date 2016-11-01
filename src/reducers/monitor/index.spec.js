import { expect } from 'chai'
import { getMonitoredThingsRequest, getMonitoredThingsSuccess, getMonitoredThingsFailure } from '../../actions/MonitoredThingsGet'
import {monitoredDeviceUpdate} from '../../actions/InquisitorConnect'
import reducer from './'

describe('Monitor Reducer', () => {
  const initialState = {
    things: null,
    error: null,
    fetching: false,
    inquisitor: null
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

  describe('monitoredDeviceUpdate', () => {
    it('should handle when we get new device data', () => {
      const updatedDevice = {
        statusDevice: 'device-1',
        errors: ['some-new-error'],
        device: {
          uuid: 'device-1',
          something: 'else',
        }
      }

      const previousState = {
        error: null,
        fetching: false,
        inquisitor: null,
        things: {
          'device-1':{
            statusDevice: 'device-1',
            errors: [],
            device: {
              uuid: 'device-1',
              something: 'random',
            }
          },
          'device-2': {
            statusDevice: 'device-2',
            errors: [],
            device: {
              uuid: 'status-device',
              something: 'random',
            }
          },
        },
        error: null,
        fetching: false,
        inquisitor: null
      }

      const expectedState = {
        error: null,
        fetching: false,
        inquisitor: null,
        things: {
          'device-1': {
            statusDevice: 'device-1',
            errors: ['some-new-error'],
            device: {
              uuid: 'device-1',
              something: 'else',
            }
          },
          'device-2': {
            statusDevice: 'device-2',
            errors: [],
            device: {
              uuid: 'status-device',
              something: 'random',
            }
          },
        },
        error: null,
        fetching: false,
        inquisitor: null
      }
      expect(
        reducer(previousState, { type: monitoredDeviceUpdate.getType(), payload: updatedDevice })
      ).to.deep.equal(expectedState)
    })
  })
})
