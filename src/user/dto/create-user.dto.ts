import { ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator'
import { AuthProvider } from '@prisma/client'

@ObjectType()
export class CreateUserDto {
  @IsBoolean()
  verified?: boolean

  @IsString()
  providerId?: string

  provider?: AuthProvider

  @IsEmail()
  email: string

  @IsNotEmpty()
  username: string

  @IsUrl()
  image?: string

  @IsString()
  phoneNumber?: string
}
