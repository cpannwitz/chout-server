import { ArgsType, Field, Int, InputType } from 'type-graphql'
import { Min, Max, IsString } from 'class-validator'

@ArgsType()
export class GetEventsArgs {
  @Field(type => Int, { defaultValue: 0 })
  @Min(0)
  skip: number

  @Field(type => Int)
  @Min(1)
  @Max(100)
  take = 10
}

@InputType()
export class CreateEventInput {
  @Field(type => String)
  @IsString()
  title: string

  @Field(type => String)
  location: string

  @Field(type => String)
  author: string
}
