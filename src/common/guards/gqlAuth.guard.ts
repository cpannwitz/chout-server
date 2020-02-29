import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthProvider } from '../types/authProvider.type'

@Injectable()
export class GqlAuthGuardJwt extends AuthGuard(AuthProvider.JWT) {
  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext().req
  }
}
@Injectable()
export class GqlAuthGuardGoogle extends AuthGuard(AuthProvider.GOOGLE) {
  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext().req
  }
}
@Injectable()
export class GqlAuthGuardGoogleToken extends AuthGuard(AuthProvider.GOOGLETOKEN) {
  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext().req
  }
}
