import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-oauth20'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '../auth.service'
import { AuthProvider } from '../auth.types'
import { Profile } from 'passport'
import { PinoLogger } from 'nestjs-pino'

// Organize oauth client-id and client-secret
// https://console.developers.google.com/

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, AuthProvider.GOOGLE) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly logger: PinoLogger
  ) {
    super(configService.get('auth.google'))
    logger.setContext(GoogleStrategy.name)
  }

  // ! overriding function to be able to pass params, to ultimately get refresh_token
  // https://github.com/nestjs/passport/issues/57
  authenticate(req: any, options: any): any {
    super.authenticate(
      req,
      Object.assign(options, {
        prompt: 'consent',
        accessType: 'offline'
      })
    )
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function
  ) {
    // TODO: make use of accessToken/refreshToken from provider
    try {
      const id = await this.authService.validateOAuthLogin(profile, AuthProvider.GOOGLE)

      const { accessToken, refreshToken } = await this.authService.createAuthTokens({ sub: id })

      const user = {
        id,
        accessToken,
        refreshToken
      }

      done(null, user)
    } catch (error) {
      this.logger.error(`ERROR | GoogleStrategy: `, error)
      // throw new UnauthorizedException('unauthorized', error.message)
      done(error, false)
    }
  }
}