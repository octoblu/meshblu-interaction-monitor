import _ from 'lodash'
import { createReducer } from 'redux-act'
import { selectedMessagePanelHide, selectedMessagePanelShow } from '../../actions/GraphInterface'

const initialState = {
  showSelectedMessagePanel: true,
}

export default createReducer({
  [selectedMessagePanelHide]: (state) => ({ ...state, showSelectedMessagePanel: false }),
  [selectedMessagePanelShow]: (state) => ({ ...state, showSelectedMessagePanel: true }),
}, initialState)
