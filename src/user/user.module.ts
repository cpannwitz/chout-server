import { Module } from '@nestjs/common'
import { OrmModule } from '../orm/orm.module'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'

@Module({
  imports: [OrmModule],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
