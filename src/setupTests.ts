import getDatabase from './services/database'
import getRedis from './services/redis'

async function setupTests() {
  getRedis()
  return await getDatabase().catch(error => console.error(error))
}

export default setupTests
