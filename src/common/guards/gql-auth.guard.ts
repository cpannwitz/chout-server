import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { DEFAULT_AUTH_STRATEGY } from '../../auth/auth.constants'

@Injectable()
export class GqlAuthGuard extends AuthGuard(DEFAULT_AUTH_STRATEGY) {
  getRequest(context: ExecutionContext) {
    // creates and establishes request context for graphql requests
    // which in turn enables the AuthGuard to access the req.user object
    // which is provided by the DEFAULT_AUTH_STRATEGY
    return GqlExecutionContext.create(context).getContext().req
  }
}
