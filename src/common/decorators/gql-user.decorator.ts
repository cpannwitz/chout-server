import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from '../../user/user.entity'

// Returns the req.user object, which holds - after successful authentication - the User Class
export const GqlUser = createParamDecorator(async (_, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  return ctx.getContext<{ req: { user: User } }>().req.user
})
