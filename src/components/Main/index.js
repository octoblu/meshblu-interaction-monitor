import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import FaCog from 'react-icons/lib/fa/cog'
import {AppBar, AppBarPrimary, AppBarSecondary} from 'zooid-ui'
import 'zooid-ui/dist/style.css'

import styles from './styles.css'

const propTypes = {
  children: PropTypes.node,
}

const defaultProps = {}

const Main = ({ children }) => {
  return (
    <div>
      <AppBar >
        <AppBarPrimary className={styles.appBarPrimary}>
          <Link to="/" className={styles.appBarPrimaryLink}>Genisys</Link>
        </AppBarPrimary>

        <AppBarSecondary>
          <nav>
            <Link to="/settings" aria-label="Settings" className={styles.navIcon} >
              <FaCog />
            </Link>
          </nav>
        </AppBarSecondary>
      </AppBar>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

Main.propTypes    = propTypes
Main.defaultProps = defaultProps

export default Main
