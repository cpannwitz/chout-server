import mainConfig from './main.config'
import dbConfig from './db.config'
import redisConfig from './redis.config'
import graphqlConfig from './graphql.config'
import authConfig from './auth.config'
import swaggerConfig from './swagger.config'
import loggerConfig from './logger.config'
import fileUploadConfig from './fileUpload.config'
import rateLimitConfig from './rateLimit.config'
import httpRequestConfig from './httpRequest.config'

export {
  mainConfig,
  dbConfig,
  redisConfig,
  graphqlConfig,
  swaggerConfig,
  authConfig,
  loggerConfig,
  fileUploadConfig,
  rateLimitConfig,
  httpRequestConfig
}

export default [
  mainConfig,
  dbConfig,
  redisConfig,
  graphqlConfig,
  authConfig,
  loggerConfig,
  fileUploadConfig,
  rateLimitConfig,
  httpRequestConfig
]
