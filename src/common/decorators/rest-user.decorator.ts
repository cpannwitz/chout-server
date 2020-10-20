import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '../../user/user.entity'

// Returns the req.user object, which holds - after successful authentication - the User Class
export const RestUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<{ user: User }>()
  return req.user
})
