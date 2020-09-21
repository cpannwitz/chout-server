import { INestApplication } from '@nestjs/common'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

import { version } from '../../package.json'

export default () => {
  const isProd = process.env.NODE_ENV === 'production'
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: isProd ? 0.1 : 1.0,
    release: version,
    environment: process.env.ENVIRONMENT,
    enabled: isProd ? true : false
  })
}
