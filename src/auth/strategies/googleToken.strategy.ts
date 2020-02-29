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
      const id = await this.authService.validateOAuthLogin(profile, AuthProvider.GOOGLE)

      const { accessToken, refreshToken } = await this.authService.createAuthTokens(id)

      const user = {
        id,
        accessToken,
        refreshToken
      }

      done(null, user)
    } catch (error) {
      this.logger.error(`ERROR | GoogleTokenStrategy: `, error.message)
      // throw new UnauthorizedException('unauthorized', error.message)
      done(error, false)
    }
  }
}
