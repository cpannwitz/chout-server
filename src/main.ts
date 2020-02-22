import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'nestjs-pino'
import compression from 'compression'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

// import { SwaggerModule } from '@nestjs/swagger'
// import swaggerConfig from './config/swagger.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useLogger(app.get(Logger))

  // SwaggerModule.setup('api', app, swaggerConfig(app))

  const config = app.get(ConfigService)
  const corsConfig = config.get('cors')
  const rateLimitConfig = config.get('rateLimit')
  const port = config.get('system.port')
  const host = config.get('system.host')

  app.enableCors(corsConfig)
  app.use(compression())
  app.use(helmet())
  app.use(rateLimit(rateLimitConfig))

  await app.listen(port, host)
}
bootstrap()
