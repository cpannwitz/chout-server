import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { WinstonModule } from 'nest-winston'
import { mainconfig, loggerconfig } from './config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserController } from './user/user.controller'
import { EventsController } from './events/events.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mainconfig, loggerconfig],
      expandVariables: true,
      isGlobal: true
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('winston') || {}
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm') || {}
    })
  ],
  controllers: [AppController, UserController, EventsController],
  providers: [AppService]
})
export class AppModule {}
