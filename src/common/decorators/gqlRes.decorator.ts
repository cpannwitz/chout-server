import { createParamDecorator } from '@nestjs/common'
import { GraphQLExecutionContext, GqlExecutionContext } from '@nestjs/graphql'

export const GqlRes = createParamDecorator((_, context: GraphQLExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  return ctx.getContext().res
})
