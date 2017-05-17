import React from 'react'
import { Link } from 'react-router'
import { AppBar, AppBarPrimary, AppBarSecondary } from 'zooid-ui'
import styles from './styles.css'

const TopBar = () => {
  return (
    <AppBar>
      <AppBarPrimary>
        <nav className="OctobluAppBar-nav OctobluAppBar-nav--primary" role="navigation">
          <Link to={window.location} className="OctobluAppBar-link">Smart Spaces Monitor</Link>
        </nav>
      </AppBarPrimary>

      <AppBarSecondary>
        <Link to="/logout" className="OctobluAppBar-link">Sign out</Link>
      </AppBarSecondary>
    </AppBar>
  )

}

module.exports = TopBar
