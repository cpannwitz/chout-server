import { ArgsType, Field, InputType, Int } from 'type-graphql'
import { IsEmail, IsString, Min, Max } from 'class-validator'

@InputType()
export class LoginUserInput {
  @Field(type => String)
  @IsEmail()
  email: string

  @Field(type => String)
  @IsString()
  password: string

  // @Field(type => String)
  // @IsString()
  // username: string
  // TODO: allow usernames to be used for login mechanics
}

@InputType()
export class RegisterUserInput {
  @Field(type => String)
  @IsEmail()
  email: string

  @Field(type => String)
  @IsString()
  password: string

  @Field(type => String)
  @IsString()
  username: string
}

@ArgsType()
export class GetUsersArgs {
  @Field(type => Int, { defaultValue: 0 })
  @Min(0)
  skip: number

  @Field(type => Int)
  @Min(1)
  @Max(100)
  take = 10

  // helpers - index calculations
  // startIndex = this.skip
  // takeIndex = this.take
  // endIndex = this.skip + this.take
}
