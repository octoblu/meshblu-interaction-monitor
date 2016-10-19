import React, { PropTypes } from 'react'
import Page from 'zooid-page'
import {Button, FormField, FormInput} from 'zooid-ui'

import { clearCredentials } from '../../services/credentials-service'

import styles from './styles.css'

const propTypes = {
  error: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  credentials: PropTypes.object,
}
const defaultProps = {}

const SettingsPage = ({ error, onSave, onChange, credentials }) => {
  const onSubmit = (event) => {
    event.preventDefault()
    onSave()
  }

  const handleSignOut = (event) => {
    event.preventDefault()
    clearCredentials()
  }

  const onUUIDChange  = (event) => onChange({uuid:  event.target.value})
  const onTokenChange = (event) => onChange({token: event.target.value})

  if (!credentials) return <Page title="Settings" loading={true} />

  return (
    <Page className={styles.Title} title="Settings" error={error}>

      <a
        className={styles.Signout}
        href="#"
        kind="hollow-danger"
        size="small"
        onClick={handleSignOut}>Sign Out</a>

      <form onSubmit={onSubmit}>
        <FormField label="UUID" name="uuid">
          <FormInput type="text" name="uuid" value={credentials.uuid} onChange={onUUIDChange} />
        </FormField>

        <FormField label="Token" name="token">
          <FormInput type="text" name="token" value={credentials.token} onChange={onTokenChange} />
        </FormField>

        <div className={styles.buttons}>
          <Button kind="primary" size="large" onClick={onSubmit}>Save</Button>
        </div>
      </form>
    </Page>
  )
}

SettingsPage.propTypes    = propTypes
SettingsPage.defaultProps = defaultProps

export default SettingsPage
