import _ from 'lodash'
import { createAction } from 'redux-act'
import Inquisitor from 'meshblu-inquisitor'

export const selectedMessagePanelHide = createAction('interface/graph/selected-message/hide')
export const selectedMessagePanelShow = createAction('interface/graph/selected-message/show')
