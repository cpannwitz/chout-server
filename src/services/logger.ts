import winston from 'winston'
import logdnaWinston from 'logdna-winston'
import expressWinston, { LoggerOptions } from 'express-winston'
import { RequestHandler, ErrorRequestHandler } from 'express-serve-static-core'
import { logdnaConfig, systemConfig } from '../configs'
import * as Sentry from '@sentry/node'

// * Default logger for about everything

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    // winston.format.simple(),
    winston.format.printf(info => `${info.level}: ${info.timestamp} | ${info.message}`),
    winston.format.errors({
      stack: systemConfig.isEnvDev() ? true : false
    })
  ),
  transports: [new winston.transports.Console()]
})

if (systemConfig.isEnvProd()) {
  logger.add(new logdnaWinston(logdnaConfig))
}

// * HTTP Logger & Error Logger Options

const expressWinstonConfig: LoggerOptions = {
  level: 'info',
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.simple()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function(req, res) {
    // optional: allows to skip some log messages based on request and/or response
    if (req.url.startsWith('/graphql')) return true
    if (req.url.startsWith('/stylesheets')) return true
    return false
  }
}

export const expressLogger: RequestHandler = expressWinston.logger(expressWinstonConfig)

export const expressErrorLogger: ErrorRequestHandler = expressWinston.errorLogger(
  expressWinstonConfig
)

// * External error logger

interface ExternalLogger {
  init: () => void
  requestLogger: typeof Sentry.Handlers.requestHandler
  errorLogger: typeof Sentry.Handlers.errorHandler
}

export const externalLogger: ExternalLogger = {
  init: () => {
    Sentry.init({ dsn: systemConfig.sentryDSN })
  },
  requestLogger: Sentry.Handlers.requestHandler,
  errorLogger: Sentry.Handlers.errorHandler
}

export default logger
