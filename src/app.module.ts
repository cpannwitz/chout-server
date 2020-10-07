import { APP_INTERCEPTOR } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { GraphQLModule } from '@nestjs/graphql'
import { TerminusModule } from '@nestjs/terminus'
import { RavenModule, RavenInterceptor } from 'nest-raven'
// import { RedisModule } from 'nestjs-redis'

import configs from './config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppResolver } from './app.resolver'

import { HealthController } from './health/health.controller'
import { UserModule } from './user/user.module'
import { OrmModule } from './orm/orm.module'

import { DateScalar } from './common/scalars/date.scalar'

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
    OrmModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('graphql') || {}
    }),
    // RedisModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => config.get('redis') || {}
    // }),
    UserModule
  ],
  controllers: [AppController, HealthController],
  providers: [
    // initialize external logger interceptor to catch and transport errors
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor()
    },
    AppService,
    AppResolver,
    DateScalar
  ]
})
export class AppModule {}
