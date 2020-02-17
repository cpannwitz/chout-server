import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Profile } from 'passport'
import { AuthProvider } from './auth.types'
import { UsersService } from '../users/users.service'
import { User } from '../users/user.entity'
import { RefreshTokenDto } from './dto/refresh-token.dto'

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
          // verified:
          providerId: profile.id,
          provider: provider
        })
        // user = await this.usersService.registerOAuthUser( new CreateOAuthUserDto ({ provider, providerId: profile.id }));
      }
      // const user = await this.usersService.findOne({ oAuthLogins: { provider, providerId: profile.id } });
      // if (!user) { user = await this.usersService.registerOAuthUser( new CreateOAuthUserDto ({ provider, providerId: profile.id })); }

      return (user as User).id
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message)
    }
  }

  async createAuthTokens(payload: { sub: string }) {
    const accessToken = await this.jwtService.signAsync(payload)
    const refreshToken = await this.jwtService.signAsync(
      payload,
      this.configService.get('auth.jwtRefresh.signOptions')
    )

    return {
      accessToken,
      refreshToken
    }
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!refreshTokenDto.refreshToken) {
      throw new BadRequestException('Missing RefreshToken')
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken)
      const { accessToken, refreshToken } = await this.createAuthTokens({ sub: payload.sub })
      return {
        accessToken,
        refreshToken
      }
    } catch (error) {
      throw new UnauthorizedException('Unauthorized', error.message)
    }
  }
}
