import * as Sentry from '@sentry/node'

import { version } from '../../package.json'

export default () => {
  const isProd = process.env.NODE_ENV === 'production'
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: version,
    environment: process.env.ENVIRONMENT,
    enabled: isProd ? true : false
  })
}
