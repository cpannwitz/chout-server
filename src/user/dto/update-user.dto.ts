import { ObjectType } from '@nestjs/graphql'
import { Role, AuthProvider } from '@prisma/client'
import { IsBoolean, IsEmail, IsString, IsUrl } from 'class-validator'

@ObjectType()
export class UpdateUserDto {
  @IsBoolean()
  verified?: boolean
  lastSignInTime?: Date
  provider?: AuthProvider
  role?: Role
  @IsEmail()
  email?: string
  @IsString()
  username?: string
  @IsUrl()
  image?: string
  @IsString()
  phoneNumber?: string
}
