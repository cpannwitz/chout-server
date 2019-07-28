import Redis from 'ioredis'
import { systemConfig } from '../configs'

let redisConnection: Redis.Redis
if (systemConfig.redisURL) {
  redisConnection = new Redis(systemConfig.redisURL)
} else {
  redisConnection = new Redis(systemConfig.redis as any)
} // TODO!

function getRedis() {
  return redisConnection
}

export default getRedis
