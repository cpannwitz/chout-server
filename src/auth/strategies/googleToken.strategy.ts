import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-token'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '../auth.service'
import { AuthProvider } from '../../common/types/authProvider.type'
import { Profile } from 'passport'
import { PinoLogger } from 'nestjs-pino'

// Organize oauth client-id and client-secret
// https://console.developers.google.com/

@Injectable()
export class GoogleTokenStrategy extends PassportStrategy(Strategy, AuthProvider.GOOGLETOKEN) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly logger: PinoLogger
  ) {
    super(configService.get('auth.googletoken'))
    logger.setContext(GoogleTokenStrategy.name)
  }

  async validate(
    // req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function
  ) {
    try {
      const user = await this.authService.upsertSocialUser(profile, AuthProvider.GOOGLE)

      if (!user) {
        return done(new Error('Failed to upsert social user.'), undefined)
      }

      return done(undefined, user)
    } catch (error) {
      this.logger.error(`ERROR | GoogleTokenStrategy: `, error.message)
      return done(error, undefined)
    }
  }
}
