import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { DEFAULT_AUTH_STRATEGY } from '../../auth/auth.constants'

@Injectable()
export class GqlAuthGuard extends AuthGuard(DEFAULT_AUTH_STRATEGY) {
  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext().req
  }
}
