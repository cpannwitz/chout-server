// import 'reflect-metadata'
import 'dotenv/config'
/**
 * Module dependencies.
 */

import path from 'path'
import http from 'http'
import { systemConfig } from './configs'
import logger from './utils/logger'
import { onError, onListening, gracefulHandler } from './utils/serverUtils'

import startServer from './app'
import { ServerContext } from './types/global'

const port = systemConfig.port
startServer
  .run()
  .catch(error => {
    logger.error(`ERROR: ${error.message}`)
    console.error(error)
    process.exit(1)
  })
  .then(({ app, db, redis }: ServerContext) => {
    logger.info('[*] Starting up server ...')

    /**
     * Get port from environment and store in Express.
     */
    app.set('port', port)
    app.set('views', path.join(__dirname, 'static/views'))
    app.set('view engine', 'pug')

    /**
     * Create HTTP server.
     */

    const server = http.createServer(app)

    gracefulHandler(server, { app, db, redis })

    /**
     * Listen on provided port, on all network interfaces.
     */

    logger.info(`[!] Server started    \t[http://localhost:${systemConfig.port} ]`)
    // logger.info(
    //   `[+]GraphQL Playground \t[http://localhost:${systemConfig.port}/graphql ]`
    // )
    server.listen(port)
    server.on('error', onError)
    server.on('listening', () => onListening(server))

    /**
     * Error handlers
     */

    process
      .on('unhandledRejection', (reason, promise) => {
        logger.error('Unhandled Rejection at:', promise, 'reason:', reason)
        // Application specific logging, throwing an error, or other logic here
      })
      .on('uncaughtException', error => {
        logger.info('[UNCAUGHT EXCEPTION] ' + error.stack || error.message)
        logger.error(error)
        process.exit(1)
      })
  })
