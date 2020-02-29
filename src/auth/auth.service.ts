import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Profile } from 'passport'
import { JwtPayload } from './auth.types'
import { UsersService } from '../users/users.service'
import { User } from '../users/user.entity'
import { AuthProvider } from '../common/types/authProvider.type'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateOAuthLogin(profile: Profile, provider: AuthProvider): Promise<string> {
    try {
      // ! currently no upsert support, https://github.com/typeorm/typeorm/issues/1090
      let user = await this.usersService.findOneByParams({ provider, providerId: profile.id })
      if (!user) {
        user = await this.usersService.createOne({
          username: profile.displayName,
          image: profile.photos ? profile.photos[0].value : null,
          email: profile.emails ? profile.emails[0].value : undefined,
          // verified: // TODO: get verified from different providers
          providerId: profile.id,
          provider: provider
        })
      }

      return (user as User).id
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message)
    }
  }

  async validateJwtUser(userId: string) {
    const user = await this.usersService.findOne(userId)
    if (!user) {
      throw new UnauthorizedException('Unauthorized')
    }
    return user
  }

  async createAuthTokens(userId: string) {
    const accessToken = await this.signToken({ sub: userId })
    const refreshToken = await this.signToken(
      { sub: userId },
      this.configService.get('auth.jwtRefresh.signOptions')
    )

    return {
      accessToken,
      refreshToken
    }
  }

  async refreshToken(
    oldRefreshToken?: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!oldRefreshToken) {
      throw new BadRequestException('Missing RefreshToken')
    }

    try {
      const payload = await this.validateToken(oldRefreshToken)
      const { accessToken, refreshToken } = await this.createAuthTokens(payload.sub)
      return {
        accessToken,
        refreshToken
      }
    } catch (error) {
      throw new UnauthorizedException('Unauthorized', error.message)
    }
  }

  async signToken(payload: any, options?: {}) {
    return this.jwtService.signAsync(payload, options)
  }
  async validateToken(token: string) {
    return this.jwtService.verifyAsync<JwtPayload>(token)
  }
}
