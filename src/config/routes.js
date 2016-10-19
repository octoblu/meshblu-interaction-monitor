import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../containers/app'
import Home from '../containers/home'
import NotFound from '../components/NotFound'
import Settings from '../containers/Settings'
import Monitor from '../containers/Monitor'
export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/settings" component={Settings} />
      <Route path="/monitor/:uuid" component={Monitor} />
    </Route>
    <Route path="*" status={404} component={NotFound} />
  </Route>
)
