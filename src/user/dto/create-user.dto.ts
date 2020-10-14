import { ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsEmail, IsNotEmpty, IsUrl } from 'class-validator'
import { AuthProvider } from '@prisma/client'

@ObjectType()
export class CreateUserDto {
  @IsBoolean()
  verified?: boolean
  provider?: AuthProvider

  @IsEmail()
  email: string
  @IsNotEmpty()
  username: string
  @IsUrl()
  image?: string
  phoneNumber?: string
}
