import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { JwtPayload } from '../auth.types'
import { PinoLogger } from 'nestjs-pino'
import { AuthProvider } from '../../config/auth.config'
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
      secretOrKey: configService.get('auth.jwt.secret')
      // passReqToCallback: true
    })
    logger.setContext(JwtStrategy.name)
  }

  async validate(payload: JwtPayload) {
    // try {
    const user = await this.authService.validateUser(payload.sub)

    if (!user) {
      throw new UnauthorizedException()
      // return done(new Error('Failed to validate user.'), undefined)
    }
    return user

    // return done(undefined, user)
    // } catch (error) {
    // this.logger.error(`ERROR | JwtStrategy: `, error.message)
    // return done(error, undefined)
    // throw new InternalServerErrorException()
    // }
  }
}
