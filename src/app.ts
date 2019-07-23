import Listr from 'listr'
import path from 'path'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import responseTime from 'response-time'
import compression from 'compression'
import timeout from 'connect-timeout'
import fileUpload from 'express-fileupload'
import StatusMonitor from 'express-status-monitor'

import { ServerContext } from './types/_ServerTypes'

// SETUP FILES
import Routes from './routes'
import healthChecks from './routes/healthChecks'
import { systemConfig, corsConfig, ratelimitConfig } from './configs'
import { expressLogger, expressErrorLogger, externalLogger } from './services/logger'
import { errorHandler } from './middlewares/error/errorHandler'

import RateLimit from 'express-rate-limit'
import RateLimitRedisStore from 'rate-limit-redis'

import passport from 'passport'
import {
  passportFacebook,
  passportGoogle,
  passportTwitter,
  passportLocalLogin,
  passportLocalSignup
} from './middlewares/auth/passport'

import getDatabase from './services/database'
import getRedis from './services/redis'
// import getGraphqlServer from './services/graphqlServer'

if (systemConfig.isEnvProd()) {
  externalLogger.init()
}
const statusMonitor = StatusMonitor()

const startServer = new Listr(
  [
    {
      title: 'Creating express app instance',
      task: (ctx: ServerContext) => (ctx.app = express())
    },
    {
      title: 'Initialize loggers',
      task: ({ app }: ServerContext) => {
        app.use([externalLogger.requestLogger(), expressLogger])
      }
    },
    {
      title: 'Initializing Databasee Connection',
      task: async (ctx: ServerContext) => {
        await getDatabase().then(dbconnection => {
          ctx.db = dbconnection
          Promise.resolve()
        })
      }
    },
    {
      title: 'Initializing Redis Connection',
      task: (ctx: ServerContext) => {
        ctx.redis = getRedis()
      }
    },
    {
      title: 'Initializing auth middleware',
      task: ({ app }: ServerContext) => {
        app.use(passport.initialize())

        passport.use('facebook', passportFacebook)
        passport.use('google', passportGoogle)
        passport.use('twitter', passportTwitter)
        passport.use('locallogin', passportLocalLogin)
        passport.use('localsignup', passportLocalSignup)
      }
    },
    {
      title: 'Initializing middleware & addons',
      task: ({ app, redis }: ServerContext) => {
        app.use(
          new RateLimit({
            store: new RateLimitRedisStore({
              client: redis
            }),
            ...ratelimitConfig
          })
        )

        app.use([
          helmet(),
          cors(corsConfig),
          fileUpload(),
          timeout(systemConfig.globalTimeout),
          responseTime(),
          compression(),
          express.urlencoded({ extended: true }),
          express.json(),
          express.static(path.join(__dirname, 'static/public'))
        ])
      }
    },
    {
      title: 'Initialize status checks',
      task: ({ app, db, redis }: ServerContext) => {
        // Status Monitor & Health Checks
        app.use(statusMonitor)

        app.use(healthChecks({ app, db, redis }))
      }
    },
    {
      title: 'Register API Endpoints | Routes',
      task: ({ app }: ServerContext) => {
        app.use(Routes)
      }
    },
    {
      title: 'Initialize error loggers',
      task: ({ app }: ServerContext) => {
        app.use([
          externalLogger.errorLogger(), // Logger
          expressErrorLogger // Logger
        ])
      }
    },
    {
      title: 'Initialize error handlers',
      task: ({ app }: ServerContext) => {
        app.use(errorHandler)
      }
    }
  ],
  {
    concurrent: false,
    exitOnError: true
  }
)

export default startServer
