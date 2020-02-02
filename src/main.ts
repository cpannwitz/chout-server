import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule } from '@nestjs/swagger'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import swaggerConfig from './config/swagger.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  SwaggerModule.setup('api', app, swaggerConfig(app))

  const config = app.get(ConfigService)

  const port = config.get('system.port')
  const host = config.get('system.host')

  await app.listen(port, host)
}
bootstrap()
