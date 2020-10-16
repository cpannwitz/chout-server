import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { BasicEntity } from '../common/models/basic.entity'
import { Role, AuthProvider } from '@prisma/client'

registerEnumType(AuthProvider, {
  name: 'AuthProvider',
  description: 'AuthProvider name'
})

registerEnumType(Role, {
  name: 'Role',
  description: 'User role'
})

@ObjectType()
export class User extends BasicEntity {
  verified: boolean
  @Field(() => Date)
  lastSignInTime: Date | null
  @Field(() => AuthProvider, { nullable: true })
  provider: AuthProvider | null
  @Field(() => String, { nullable: true })
  providerId: string | null
  @Field(() => Role)
  role: Role
  email: string
  username: string
  @Field(() => String, { nullable: true })
  image: string | null
  @Field(() => String, { nullable: true })
  phoneNumber: string | null
}
