import { Params } from 'nestjs-pino'
import { registerAs } from '@nestjs/config'

export default registerAs(
  'logger',
  () =>
    ({
      pinoHttp: {
        prettyPrint: process.env.NODE_ENV === 'development' ? {
          translateTime: true,
          levelFirst: true,
          colorize: true
        } : false
      },
    } as Params)
)
