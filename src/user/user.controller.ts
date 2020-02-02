import { Controller, Get } from '@nestjs/common'
import { User } from './interfaces/user.interface'

@Controller('user')
export class UserController {
  @Get()
  findOne(): User {
    return ('' as unknown) as User
  }
}
