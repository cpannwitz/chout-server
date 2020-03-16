import { createParamDecorator } from '@nestjs/common'
import { Response } from 'express'
import { GraphQLExecutionContext } from '@nestjs/graphql'

export const GqlRes = createParamDecorator(
  (_, gqlCtx: GraphQLExecutionContext): Response => {
    // [root, args, ctx, info]
    const [, , ctx] = gqlCtx.getArgs()
    return ctx.res
  }
)
