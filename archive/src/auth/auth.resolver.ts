import { UseGuards, InternalServerErrorException } from '@nestjs/common'
import { Mutation, Resolver, Args } from '@nestjs/graphql'

import { Users } from '../users/users.entity'
import { AuthService } from './auth.service'

import { GqlAuthGuardGoogleToken } from '../common/guards/gqlAuth.guard'
import { GqlUser } from '../common/decorators/gql-user.decorator'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { AuthTokensDto } from './dto/auth-tokens.dto'

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // * +------------------------------------------+
  // * |          AUTHENTICATION: JWT             |
  // * +------------------------------------------+

  @Mutation(_returns => AuthTokensDto)
  async refreshToken(@Args('refreshTokenDto') refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken)
  }

  // * +------------------------------------------+
  // * |        AUTHENTICATION: GOOGLETOKEN       |
  // * +------------------------------------------+

  @Mutation(_returns => AuthTokensDto)
  @UseGuards(GqlAuthGuardGoogleToken)
  async loginGoogleToken(@GqlUser() user: Users) {
    if (!user) {
      throw new InternalServerErrorException('Users not found.')
    }
    return await this.authService.createAuthTokens(user.id)
  }
}
