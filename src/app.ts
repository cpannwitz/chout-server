import Listr from 'listr'
import path from 'path'
import express from 'express'
import cors from 'cors'
import * as ClassValidator from 'class-validator'
import * as TypeORM from 'typeorm'
import { Container } from 'typedi'
import helmet from 'helmet'
import responseTime from 'response-time'
import compression from 'compression'
import timeout from 'connect-timeout'
import fileUpload from 'express-fileupload'
import StatusMonitor from 'express-status-monitor'

import { ServerContext } from './types/global'

// SETUP FILES
import Routes from './routes'
import healthChecks from './utils/healthChecks'
import { systemConfig, corsConfig, ratelimitConfig } from './configs'
import { expressLogger, expressErrorLogger } from './utils/logger'
import { externalLogger } from './utils/logger'
import { finalErrorHandler, notFoundErrorHandler } from './middlewares/errorHandlers'

import RateLimit from 'express-rate-limit'
import RateLimitRedisStore from 'rate-limit-redis'

import passport from 'passport'
import {
  passportFacebook,
  passportGoogle,
  passportTwitter,
  passportLocalLogin,
  passportLocalSignup
} from './middlewares/passport'

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
        getDatabase().then(dbconnection => {
          ctx.db = dbconnection
        })
      }
    },
    {
      title: 'Initializing Redis Connection',
      // skip: () => {
      //   if (systemConfig.isEnvTest()) {
      //     return 'Skipping Redis for tests'
      //   }
      // },
      task: (ctx: ServerContext) => {
        ctx.redis = getRedis()
      }
    },
    // {
    //   title: 'Initializing GraphQL Server',
    //   task: async ({ app }: ServerContext) => {
    //     // * Build GraphQL-Schema
    //     getGraphqlServer(app).then(() => Promise.resolve())
    //   }
    // },
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
      title: 'Register API Endpoints | Routes',
      task: ({ app }: ServerContext) => {
        app.use(Routes)
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
        app.use(notFoundErrorHandler)
        app.use(finalErrorHandler)
      }
    }
  ],
  {
    concurrent: false,
    exitOnError: true
  }
)

export default startServer
