import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { JwtPayload } from '../auth.types'
import { PinoLogger } from 'nestjs-pino'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService, private readonly logger: PinoLogger) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.jwt.secret'),
      passReqToCallback: true
    })
    logger.setContext(JwtStrategy.name)
  }

  async validate(req: Request, payload: JwtPayload, done: Function) {
    try {
      // You could add a function to the authService to verify the claims of the token:
      // i.e. does the user still have the roles that are claimed by the token
      // const validClaims = await this.jwtService.verify(payload)
      // if (!validClaims) return done(new UnauthorizedException('invalid token claims'), false)

      const user = {
        id: payload.sub
      }

      done(null, user)
    } catch (error) {
      this.logger.error(`ERROR | GoogleStrategy: `, error)
      done(error, false)
      // throw new UnauthorizedException('unauthorized', error.message)
    }
  }
}
