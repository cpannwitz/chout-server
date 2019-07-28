import path from 'path'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import responseTime from 'response-time'
import compression from 'compression'
import timeout from 'connect-timeout'
import fileUpload from 'express-fileupload'
import favicon from 'serve-favicon'
import StatusMonitor from 'express-status-monitor'

// SETUP FILES
import Routes from './routes'
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

import getRedis from './services/redis'

const statusMonitor = StatusMonitor()

function getApp() {
  const app = express()
  const redis = getRedis()

  if (systemConfig.isEnvProd()) {
    externalLogger.init()
  }

  const rateLimit = new RateLimit({
    store: new RateLimitRedisStore({
      client: redis
    }),
    ...ratelimitConfig
  })

  app.use([
    externalLogger.requestLogger(),
    expressLogger,
    passport.initialize(),
    rateLimit,
    helmet(),
    cors(corsConfig),
    fileUpload(),
    timeout(systemConfig.globalTimeout),
    responseTime(),
    compression(),
    express.urlencoded({ extended: true }),
    express.json(),
    express.static(path.join(__dirname, 'static/public')),
    favicon(path.join(__dirname, 'static/public', 'favicon.ico')),
    statusMonitor,
    Routes,
    externalLogger.errorLogger(), // Logger
    expressErrorLogger, // Logger
    errorHandler
  ])

  passport.use('facebook', passportFacebook)
  passport.use('google', passportGoogle)
  passport.use('twitter', passportTwitter)
  passport.use('locallogin', passportLocalLogin)
  passport.use('localsignup', passportLocalSignup)

  return app
}

export default getApp
