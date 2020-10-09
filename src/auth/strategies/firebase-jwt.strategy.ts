import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy, ExtractJwt } from 'passport-firebase-jwt'
import { auth } from 'firebase-admin'
import { DEFAULT_AUTH_STRATEGY } from '../auth.constants'

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, DEFAULT_AUTH_STRATEGY) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(token: string) {
    try {
      const user = await auth().verifyIdToken(token, true)
      return user.uid
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
