import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy, ExtractJwt } from 'passport-firebase-jwt'

import { DEFAULT_AUTH_STRATEGY } from '../auth.constants'
import { AuthService } from '../auth.service'

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, DEFAULT_AUTH_STRATEGY) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(token: string) {
    try {
      const user = await this.authService.validateUser(token)
      return user
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
