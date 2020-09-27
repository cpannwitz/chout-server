import { APP_INTERCEPTOR } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { MulterModule } from '@nestjs/platform-express'
import { TerminusModule } from '@nestjs/terminus'
// import { RedisModule } from 'nestjs-redis'
import { RavenModule, RavenInterceptor } from 'nest-raven'

import configs from './config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { HealthController } from './health/health.controller'

@Module({
  imports: [
    RavenModule,
    TerminusModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: configs,
      expandVariables: true,
      isGlobal: true
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('logger') || {}
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm') || {}
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('graphql') || {}
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('fileUpload') || {}
    }),
    // RedisModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => config.get('redis') || {}
    // }),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController, HealthController],
  providers: [
    // initialize external logger interceptor to catch and transport errors
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor()
    },
    AppService
  ]
})
export class AppModule {}
