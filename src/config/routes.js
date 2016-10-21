import React from 'react'
import { Route, IndexRoute, Router } from 'react-router'
import App from '../containers/App'
import Monitor from '../containers/Monitor'
import NotFound from '../components/NotFound'
import { storeAuthenticationAndRedirect } from '../services/auth-service'

export default ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="auth/callback" onEnter={storeAuthenticationAndRedirect} />
        <IndexRoute component={Monitor} />
        <Route path="/monitor/:uuid" component={Monitor} />
      </Route>
      <Route path="*" status={404} component={NotFound} />
    </Router>
  )
}
