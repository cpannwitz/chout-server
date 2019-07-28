import 'dotenv/config'
import { getConnection } from 'typeorm'
import getRedis from './services/redis'

async function teardownTests() {
  getConnection('test').close()
  getRedis().disconnect()
}

export default teardownTests
