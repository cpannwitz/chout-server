import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthResolver } from './auth.resolver'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

import { OrmModule } from '../orm/orm.module'
import { FirebaseModule } from '../firebase/firebase.module'
import { GqlAuthGuard } from '../common/guards/gql-auth.guard'
import { UserModule } from '../user/user.module'
import { FirebaseAuthStrategy } from './strategies/firebase-jwt.strategy'

@Module({
  imports: [OrmModule, FirebaseModule, PassportModule, UserModule],
  controllers: [AuthController],
  providers: [AuthResolver, AuthService, GqlAuthGuard, FirebaseAuthStrategy]
})
export class AuthModule {}
