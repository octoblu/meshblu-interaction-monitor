import { expect } from 'chai'
import { getMeshbluConfigSuccess} from '../../actions/MeshbluConfigGet'

import reducer from './'

describe('Meshblu Reducer', () => {
  const initialState = { meshbluConfig: null }

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState)
  })

  describe('getMeshbluConfig', () => {

    it('should handle fetching success', () => {
      const meshbluConfig = {
        uuid: 'yep',
        token: 'this-is-real',
      }

      expect(reducer(undefined, {
        type: getMeshbluConfigSuccess.getType(),
        payload: meshbluConfig,
      })).to.deep.equal({ ...initialState, meshbluConfig: meshbluConfig })
    })

  })
})
