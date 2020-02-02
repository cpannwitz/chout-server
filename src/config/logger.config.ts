import * as winston from 'winston'
import { utilities as nestWinstonModuleUtilities } from 'nest-winston'
import { Timber } from '@timberio/node'
import { TimberTransport } from '@timberio/winston'

export default () => ({
  winston: {
    transports: [
      new TimberTransport(
        new Timber(process.env.LOG_TIMBER_KEY || '', process.env.LOG_TIMBER_ID || '')
      ),
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike()
        )
      })
    ]
  } as winston.LoggerOptions
})
