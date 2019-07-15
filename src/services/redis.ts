import Redis from 'ioredis'
import { systemConfig } from '../configs'

function getRedis() {
  return new Redis(systemConfig.redis)
}

export default getRedis
