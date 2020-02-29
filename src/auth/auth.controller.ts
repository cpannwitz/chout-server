import { Controller, Get, UseGuards, HttpStatus, Post, Body } from '@nestjs/common'
import { ApiExcludeEndpoint } from '@nestjs/swagger'
import { Redirect } from '@nestjsplus/redirect'
import { AuthGuard } from '@nestjs/passport'
import { AuthProvider } from '../common/types/authProvider.type'
import { UserField } from '../common/decorators/userField-rest.decorator'
import { ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {}

  @Get(AuthProvider.GOOGLE)
  @UseGuards(AuthGuard(AuthProvider.GOOGLE))
  googleLogin() {
    // initiates the Google OAuth2 login flow via Passport-Strategy
  }

  @Get(AuthProvider.GOOGLE + '/callback')
  @UseGuards(AuthGuard(AuthProvider.GOOGLE))
  @Redirect()
  @ApiExcludeEndpoint()
  googleLoginCallback(
    @UserField('accessToken') accessToken: string | undefined,
    @UserField('refreshToken') refreshToken: string | undefined
  ) {
    const loginSuccessUrl = this.configService.get('auth.loginSuccessUrl')
    return {
      statusCode: HttpStatus.FOUND,
      url: `${loginSuccessUrl}?jwt=${accessToken}&jwtrefresh=${refreshToken}`
    }
  }

  @Post('refresh')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken)
  }

  @Get('protected')
  @UseGuards(AuthGuard(AuthProvider.JWT))
  protectedResource() {
    return 'JWT is working!'
  }
}
