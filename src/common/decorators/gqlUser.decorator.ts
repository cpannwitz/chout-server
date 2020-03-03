import { createParamDecorator } from '@nestjs/common'

export const GqlUser = createParamDecorator((data, [root, args, ctx, info]) => ctx.req.user)
