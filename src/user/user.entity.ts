import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { BasicEntity } from '../common/models/basic.entity'
import { Role } from '@prisma/client'

// // export enum Role {
// //   USER = 'USER',
// //   ORGANISATION = 'ORGANISATION',
// //   MODERATOR = 'MODERATOR',
// //   ADMIN = 'ADMIN'
// }

registerEnumType(Role, {
  name: 'Role',
  description: 'User role'
})

@ObjectType()
export class User extends BasicEntity {
  verified: boolean
  @Field(() => Date)
  lastSignInTime: Date | null
  @Field(() => String, { nullable: true })
  provider: string | null
  @Field(() => Role)
  role: Role
  email: string
  username: string
  @Field(() => String, { nullable: true })
  image: string | null
  @Field(() => String, { nullable: true })
  phoneNumber: string | null
}
