import { createParamDecorator } from '@nestjs/common'
import { User } from '../../users/user.entity'
import { GraphQLExecutionContext } from '@nestjs/graphql'

export const GqlUser = createParamDecorator(
  (_, gqlCtx: GraphQLExecutionContext): User => {
    // [root, args, ctx, info]
    const [, , ctx] = gqlCtx.getArgs()
    return ctx.req && ctx.req.user
  }
)
