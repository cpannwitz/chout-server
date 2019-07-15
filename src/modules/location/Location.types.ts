import { ArgsType, Field, Int, InputType } from 'type-graphql'
import { Min, Max, IsString } from 'class-validator'
import GeoPoint from '../../graphql/scalars/GeoPoint'

@ArgsType()
export class GetLocationsArgs {
  @Field(type => Int, { defaultValue: 0 })
  @Min(0)
  skip: number

  @Field(type => Int)
  @Min(1)
  @Max(100)
  take = 10
}

@InputType()
export class CreateLocationInput {
  @Field(type => GeoPoint)
  coordinates: [number, number]

  @Field(type => String, { nullable: true })
  @IsString()
  name?: string

  @Field(type => String, { nullable: true })
  @IsString()
  description?: string

  @Field(type => String)
  author: string
}
