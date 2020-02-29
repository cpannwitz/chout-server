import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { JwtPayload } from '../auth.types'
import { PinoLogger } from 'nestjs-pino'
import { AuthService } from '../auth.service'
import { AuthProvider } from '../../common/types/authProvider.type'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthProvider.JWT) {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.jwt.secret'),
      passReqToCallback: true
    })
    logger.setContext(JwtStrategy.name)
  }

  // handleRequest(err: any, user: any, info: any) {
  //   console.log(`LOG | : JwtStrategy -> handleRequest -> info`, info)
  //   console.log(`LOG | : JwtStrategy -> handleRequest -> user`, user)
  //   console.log(`LOG | : JwtStrategy -> handleRequest -> err`, err)
  //   console.log('Custom google guard')
  // }

  async validate(req: Request, payload: JwtPayload, done: Function) {
    this.logger.debug(payload)
    // return this.authService.validateJwtUser(payload.sub)
    try {
      // const user = {
      //   id: payload.sub
      // }
      const user = await this.authService.validateJwtUser(payload.sub)

      done(null, user)
    } catch (error) {
      this.logger.error(`ERROR | GoogleStrategy: `, error)
      done(error, false)
      // throw new UnauthorizedException('unauthorized', error.message)
    }
  }
}
