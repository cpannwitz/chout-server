import { Router } from 'express'
import { Request, Response, NextFunction } from 'express'
import { ServerContext } from '../types/global'

const router = Router()

function healthChecks({ app, db, redis }: ServerContext) {
  router.use('/health', (req: Request, res: Response, next: NextFunction) => {
    try {
      const dbStatus = db && db.isConnected
      const redisStatus = redis && (redis.status === 'ready' || redis.status === 'OK')

      res.status(200).json({
        status: 'OK',
        dbStatus: dbStatus ? 'OK' : 'FAILING',
        redisStatus: redisStatus ? 'OK' : 'FAILING',
        timestamp: new Date()
      })
    } catch (error) {
      console.error('LOG | : healthChecks -> error', error)
      res.status(500).json({
        status: 'FAILING',
        dbStatus: 'FAILING',
        redisStatus: 'FAILING',
        timestamp: new Date()
      })
    }
  })
  return router
}

export default healthChecks
