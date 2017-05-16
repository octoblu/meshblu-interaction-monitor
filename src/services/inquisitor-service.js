import Inquisitor from 'meshblu-inquisitor'

export function setupInquisitor({ uuid, meshbluConfig }, callback) {
  const firehoseConfig = {...meshbluConfig, hostname: 'meshblu-firehose-socket-io.octoblu.com'}
  const inquisitor = new Inquisitor({uuid, meshbluConfig, firehoseConfig})
  inquisitor.setup(callback)
}
