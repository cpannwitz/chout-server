import { Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { Mutation } from '@nestjs/graphql'
import { AuthenticationError } from 'apollo-server-express'

import { GqlAuthGuard } from '../common/guards/gql-auth.guard'
import { GqlUser } from '../common/decorators/gql-user.decorator'
import { User } from '../user/user.entity'

@Resolver()
export class AuthResolver {
  @UseGuards(GqlAuthGuard)
  @Mutation(_ => User, { nullable: true })
  async validateUser(@GqlUser() user: User) {
    try {
      if (!user) throw new AuthenticationError('User does not exist.')
      return user
    } catch (error) {
      throw new AuthenticationError(error)
    }
  }
}
