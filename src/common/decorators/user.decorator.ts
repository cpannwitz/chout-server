import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const UserDecorator = createParamDecorator((identifier: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()
  return identifier && req.user ? (req.user as any)[identifier] : req.user
})
