import { createParamDecorator } from '@nestjs/common'
import { Request } from 'express'

export const UserField = createParamDecorator((identifier: string, req: Request) => {
  return identifier && req.user ? (req.user as any)[identifier] : undefined
})
