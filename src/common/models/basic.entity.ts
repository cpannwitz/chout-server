import { Field, ObjectType, ID } from '@nestjs/graphql'

@ObjectType({ isAbstract: true })
export abstract class BasicEntity {
  @Field(_type => ID)
  id: string
  createdAt: Date
  updatedAt: Date
}
