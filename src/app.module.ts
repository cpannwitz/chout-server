import { Module, HttpModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { LoggerModule } from 'nestjs-pino'
import { TerminusModule } from '@nestjs/terminus'
import { HealthService } from './health/health.service'
import { HealthModule } from './health/health.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import {
  mainConfig,
  authConfig,
  loggerConfig,
  dbConfig,
  fileUploadConfig,
  rateLimitConfig,
  httpRequestConfig
} from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        mainConfig,
        dbConfig,
        authConfig,
        loggerConfig,
        fileUploadConfig,
        rateLimitConfig,
        httpRequestConfig
      ],
      expandVariables: true,
      isGlobal: true
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('logger') || {}
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('httpRequest') || {}
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm') || {}
    }),
    TerminusModule.forRootAsync({
      imports: [HealthModule],
      useExisting: HealthService
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => config.get('fileUpload')
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
