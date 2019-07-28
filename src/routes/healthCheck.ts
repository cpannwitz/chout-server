// import { Router } from 'express'
import { Request, Response, NextFunction } from 'express'
// import { ServerContext } from '../types/_ServerTypes'
import logger from '../services/logger'
import { getConnection } from 'typeorm'
import getRedis from '../services/redis'

// const router = Router()

// function healthChecks({ app, db, redis }: ServerContext) {
// router.use('/health',
// )
// return router
// }

// export default router

export async function healthCheck(req: Request, res: Response, next: NextFunction) {
  try {
    const db = getConnection()
    const redis = getRedis()

    let dbStatus = 'FAILING'
    if (db) dbStatus = 'UNCONNECTED'
    if (db && db.isConnected) dbStatus = 'OK'

    let redisStatus = 'FAILING'
    if (redis) redisStatus = 'UNCONNECTED'
    if (redis && (redis.status === 'ready' || redis.status === 'OK')) redisStatus = 'OK'

    res.status(200).json({
      status: 'OK',
      dbStatus: dbStatus,
      redisStatus: redisStatus,
      timestamp: new Date()
    })
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      status: 'FAILING',
      dbStatus: 'FAILING',
      redisStatus: 'FAILING',
      timestamp: new Date()
    })
  }
}
