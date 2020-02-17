import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'nestjs-pino'
// import { SwaggerModule } from '@nestjs/swagger'
// import swaggerConfig from './config/swagger.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useLogger(app.get(Logger))

  // SwaggerModule.setup('api', app, swaggerConfig(app))

  const config = app.get(ConfigService)
  const cors = config.get('cors')
  const port = config.get('system.port')
  const host = config.get('system.host')

  app.enableCors(cors)

  await app.listen(port, host)
}
bootstrap()
