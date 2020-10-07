import { ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsEmail, IsNotEmpty, IsUrl } from 'class-validator'

@ObjectType()
export class CreateUserDto {
  @IsBoolean()
  verified?: boolean
  provider?: string

  @IsEmail()
  email: string
  @IsNotEmpty()
  username: string
  @IsUrl()
  image?: string
  phoneNumber?: string
}
