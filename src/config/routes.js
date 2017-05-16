import React from 'react'
import { Route, IndexRoute, Router } from 'react-router'
import App from '../containers/App'
import ErrorMonitor from '../containers/ErrorMonitor'
import Interactions from '../containers/Interactions'
import InquisitorList from '../containers/InquisitorList'

import NotFound from '../components/NotFound'
import { storeAuthenticationAndRedirect, destroyAuthentication } from '../services/auth-service'

export default ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={InquisitorList} />
        <Route path="auth/callback" onEnter={storeAuthenticationAndRedirect} />
        <Route path="/logout" onEnter={destroyAuthentication} />
        <Route path="/:uuid/errors" component={ErrorMonitor} />
        <Route path="/:uuid/graph" component={Interactions} />
      </Route>
      <Route path="*" status={404} component={NotFound} />
    </Router>
  )
}
