import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '../auth.service'
import { AuthProvider } from '../../common/types/authProvider.type'
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
    done: VerifyCallback
  ) {
    try {
      const user = await this.authService.upsertSocialUser(profile, AuthProvider.GOOGLE)

      if (!user) {
        return done(new Error('Failed to upsert social user.'), undefined)
      }

      return done(undefined, user)
    } catch (error) {
      this.logger.error(`ERROR | GoogleStrategy: `, error)
      return done(error, undefined)
    }
  }
}
