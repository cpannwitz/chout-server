import { UseGuards, InternalServerErrorException } from '@nestjs/common'
import { Query, Resolver, Args } from '@nestjs/graphql'

import { Users } from './users.entity'
import { UsersService } from './users.service'

import { GqlAuthGuardJwt } from '../common/guards/gqlAuth.guard'
import { GqlUser } from '../common/decorators/gql-user.decorator'

@Resolver(Users)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuardJwt)
  @Query(_returns => Users)
  public async getUser(@Args({ name: 'id', type: () => String }) id: string) {
    return this.usersService.findOne(id)
  }

  @UseGuards(GqlAuthGuardJwt)
  @Query(_returns => Users)
  public async getMe(@GqlUser() user: Users) {
    if (!user) {
      throw new InternalServerErrorException('Users not found.')
    }
    return user
  }
}
