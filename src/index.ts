// import 'reflect-metadata'
import 'dotenv/config'
/**
 * Module dependencies.
 */

import path from 'path'
import http from 'http'
import { systemConfig } from './configs'
import logger from './services/logger'
import { onError, onListening, gracefulHandler } from './server/serverUtils'

import startServer from './app'
// import { ServerContext } from './types/_ServerTypes'

const port = systemConfig.port
startServer
  .run()
  .catch(error => {
    logger.error(error)
    process.exit(1)
  })
  .then(({ app, db, redis }: any) => {
    // TODO: type: ServerContext
    logger.info('[*] Starting up server...')

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

    logger.info(`[!] Server started [http://localhost:${systemConfig.port} ]`)
    server.listen(port)
    server.on('error', onError)
    server.on('listening', () => onListening(server))

    /**
     * Error handlers
     */

    process
      .on('unhandledRejection', (reason, promise) => {
        logger.error(
          'Unhandled Rejection at:' +
            JSON.stringify(promise) +
            'reason:' +
            JSON.stringify(reason)
        )
        // Application specific logging, throwing an error, or other logic here
      })
      .on('uncaughtException', error => {
        logger.info('[UNCAUGHT EXCEPTION] ' + error.stack || error.message)
        logger.error(error)
        process.exit(1)
      })
  })
