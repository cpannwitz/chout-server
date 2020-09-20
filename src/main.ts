import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './app.module'
import configureSwagger from './config/swagger.config'

import compression from 'compression'
import helmet from 'helmet'


// create NestJS server, apply middleware and utilities, start server async
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // apply global validation via class-validator for all classes
  app.useGlobalPipes(new ValidationPipe())

  // get global config from config module
  const config = app.get(ConfigService)

  // add middleware with config
  const corsConfig = config.get('cors')
  app.enableCors(corsConfig)
  app.use(compression())
  app.use(helmet())
  app.enableShutdownHooks()

  // apply Swagger api documentation
  configureSwagger(app)

  const port = config.get('system.port')
  const host = config.get('system.host')
  await app.listen(port, host)
}
bootstrap()
