import { ObjectType } from '@nestjs/graphql'
import { Role } from '@prisma/client'
import { IsBoolean, IsEmail, IsString, IsUrl } from 'class-validator'

@ObjectType()
export class UpdateUserDto {
  @IsBoolean()
  verified?: boolean
  lastSignInTime?: Date
  @IsString()
  provider?: string
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
