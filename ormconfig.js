require('dotenv/config')

const { DATABASE_URL, DATABASE_TEST_URL, IS_LOCAL, NODE_ENV } = process.env
const isProdEnv = NODE_ENV === 'production'
const isTestEnv = NODE_ENV === 'test'

const BASE_DIR = isProdEnv ? 'dist' : 'src'
const BASE_EXT = isProdEnv ? '.js' : '.ts'
const BASE_URL = isTestEnv ? DATABASE_TEST_URL : DATABASE_URL

module.exports = {
  type: 'postgres',
  url: BASE_URL,
  ssl: !IS_LOCAL,
  synchronize: false,
  dropSchema: false,
  logging: true,
  entities: [`${BASE_DIR}/**/*.entity${BASE_EXT}`],
  migrations: [`${BASE_DIR}/_db/migrations/**/*${BASE_EXT}`],
  subscribers: [`${BASE_DIR}/_db/subscribers/**/*${BASE_EXT}`],
  cli: {
    'entitiesDir': 'src',
    'migrationsDir': 'src/_db/migrations',
    'subscribersDir': 'src/_db/subscribers'
  }
}
