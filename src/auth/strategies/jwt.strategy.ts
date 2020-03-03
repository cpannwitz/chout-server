import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { JwtPayload } from '../auth.types'
import { PinoLogger } from 'nestjs-pino'
import { AuthProvider } from '../../common/types/authProvider.type'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthProvider.JWT) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly logger: PinoLogger
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.jwt.secret'),
      passReqToCallback: true
    })
    logger.setContext(JwtStrategy.name)
  }

  async validate(_req: Request, payload: JwtPayload, done: VerifiedCallback) {
    try {
      const user = await this.authService.validateUser(payload.sub)

      if (!user) {
        return done(new Error('Failed to validate user.'), undefined)
      }

      return done(undefined, user)
    } catch (error) {
      this.logger.error(`ERROR | JwtStrategy: `, error.message)
      return done(error, undefined)
    }
  }
}
