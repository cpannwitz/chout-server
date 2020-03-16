import { IsJWT } from 'class-validator'
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class RefreshTokenDto {
  @IsJWT()
  @Field()
  refreshToken: string
}
