import { UseGuards } from '@nestjs/common'
import { Mutation, Resolver } from '@nestjs/graphql'
import { AuthenticationError } from 'apollo-server-express'

import { GqlAuthGuard } from '../common/guards/gql-auth.guard'
import { GqlUser } from '../common/decorators/gql-user.decorator'

import { User } from '../user/user.entity'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(_ => User, { nullable: true })
  async validateUser(@GqlUser() user: string) {
    try {
      return await this.authService.validateUser(user)
    } catch (error) {
      throw new AuthenticationError(error)
    }
  }
}
