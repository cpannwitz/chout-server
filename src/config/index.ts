import accessControlConfig from './accessControl.config'
import corsConfig from './cors.config'
import graphqlConfig from './graphql.config'
import graphqlAccessControlConfig from './graphqlAccessControl.config'
import loggerConfig from './logger.config'
import systemConfig from './system.config'
import redisConfig from './redis.config'
import swaggerConfig from './swagger.config'

export {
  accessControlConfig,
  corsConfig,
  graphqlConfig,
  graphqlAccessControlConfig,
  loggerConfig,
  systemConfig,
  redisConfig,
  swaggerConfig
}

export default [
  accessControlConfig,
  corsConfig,
  graphqlConfig,
  graphqlAccessControlConfig,
  loggerConfig,
  systemConfig,
  redisConfig
]
