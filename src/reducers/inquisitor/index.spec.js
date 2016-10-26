import { expect } from 'chai'
import { connectInquisitorRequest, connectInquisitorSuccess, connectInquisitorFailure } from '../../actions/InquisitorConnect'

import reducer from './'

describe('Inquisitor Reducer', () => {
  const initialState = {
    device: null,
    fetching: null,
    error: null,
    connectionStatus: 'initial',
  }

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState)
  })

  describe('connectInquisitor', () => {
    it('should handle connection request', () => {
      expect(
        reducer(undefined, { type: connectInquisitorRequest.getType() })
      ).to.deep.equal({ ...initialState, connectionStatus: 'connecting' })
    })

    it('should handle success', () => {
      expect(reducer(undefined, {
        type: connectInquisitorSuccess.getType(),
      })).to.deep.equal({ ...initialState, connectionStatus: 'connected' })
    })

    it('should handle fetching failure', () => {
      expect(reducer(undefined, {
        type: connectInquisitorFailure.getType(),
        payload: new Error('Bang!'),
      })).to.deep.equal({ ...initialState, connectionStatus: 'failed', error: new Error('Bang!') })
    })
  })
})
