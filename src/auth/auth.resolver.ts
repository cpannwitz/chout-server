import { Mutation, Resolver, Args } from '@nestjs/graphql'
import { UseGuards, InternalServerErrorException } from '@nestjs/common'
import { GqlUser } from '../common/decorators/gqlUser.decorator'
import { GqlAuthGuardGoogleToken } from '../common/guards/gqlAuth.guard'
import { User } from '../users/user.entity'
import { AuthService } from './auth.service'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { AuthTokensDto } from './dto/auth-tokens.dto'

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(_returns => AuthTokensDto)
  @UseGuards(GqlAuthGuardGoogleToken)
  async login(@GqlUser() user: User) {
    if (!user) {
      throw new InternalServerErrorException('Missing user.')
    }
    return await this.authService.createAuthTokens(user.id)
  }

  @Mutation(_returns => AuthTokensDto)
  async refreshToken(@Args('refreshTokenDto') refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken)
  }
}
