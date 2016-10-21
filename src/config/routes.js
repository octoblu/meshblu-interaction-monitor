import React from 'react'
import { Route, IndexRoute, Router } from 'react-router'
import App from '../containers/App'
import ErrorMonitor from '../containers/ErrorMonitor'
import NotFound from '../components/NotFound'
import { storeAuthenticationAndRedirect } from '../services/auth-service'

export default ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="auth/callback" onEnter={storeAuthenticationAndRedirect} />
        <Route path="/:uuid/errors" component={ErrorMonitor} />
      </Route>
      <Route path="*" status={404} component={NotFound} />
    </Router>
  )
}
