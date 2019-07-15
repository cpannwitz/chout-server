import Redis from 'ioredis'
import { systemConfig } from '../configs'

function getRedis() {
  if (systemConfig.redisURL) return new Redis(systemConfig.redisURL)
  return new Redis(systemConfig.redis)
}

export default getRedis
