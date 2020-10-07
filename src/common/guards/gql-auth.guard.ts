import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

export enum AuthProvider {
  GOOGLE = 'google',
  GOOGLETOKEN = 'googletoken',
  JWT = 'JWT'
}

// See: https://github.com/nestjs/graphql/issues/48#issuecomment-606361795

function getRequestBlueprint(context: ExecutionContext) {
  return GqlExecutionContext.create(context).getContext().req
}

// * +------------------------------------------+
// * |          AUTHENTICATION: JWT             |
// * +------------------------------------------+

@Injectable()
export class GqlAuthGuardJwt extends AuthGuard(AuthProvider.JWT) {
  getRequest = getRequestBlueprint
}

// * +------------------------------------------+
// * |          AUTHENTICATION: GOOGLE          |
// * +------------------------------------------+

@Injectable()
export class GqlAuthGuardGoogle extends AuthGuard(AuthProvider.GOOGLE) {
  getRequest = getRequestBlueprint
}
@Injectable()
export class GqlAuthGuardGoogleToken extends AuthGuard(AuthProvider.GOOGLETOKEN) {
  getRequest = getRequestBlueprint
}
