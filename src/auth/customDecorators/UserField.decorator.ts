import { createParamDecorator } from '@nestjs/common'

export const UserField = createParamDecorator((identifier: string, req) => {
  return identifier ? req.user[identifier] : undefined
})
