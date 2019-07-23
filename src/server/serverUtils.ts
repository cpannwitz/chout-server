import { createTerminus } from '@godaddy/terminus'
import { ServerContext } from '../types/_ServerTypes'
import { Server } from 'http'
import logger from '../services/logger'

/**
 * Normalize a port into a number, string, or false.
 */

export function normalizePort(val: string) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return undefined
  }

  if (port >= 0) {
    // port number
    return port
  }

  return undefined
}

export function onListening(server: any) {
  const addr = server.address() || ({} as any)
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  const message = 'Listening on ' + bind
  logger.info(message)
  return message
}

export function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const port = process.env.PORT
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      process.exit(1)
      throw error
  }
}

// createTerminus(server, options);

export function gracefulHandler(server: Server, { app, db, redis }: ServerContext) {
  createTerminus(server, {
    timeout: 1000,
    onSignal: () =>
      Promise.all([
        // your clean logic, like closing database connections
        db.close(),
        redis.disconnect()
      ]),
    onShutdown: () => logger.info('cleanup finished, server is shutting down')
  } as any)
}
