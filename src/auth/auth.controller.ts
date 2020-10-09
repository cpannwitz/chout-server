import { Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common'
import { RestUser } from '../common/decorators/rest-user.decorator'
import { RestAuthGuard } from '../common/guards/rest-auth.guard'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(RestAuthGuard)
  @Post('validateUser')
  async validateUser(@RestUser() user: string) {
    try {
      return await this.authService.validateUser(user)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
