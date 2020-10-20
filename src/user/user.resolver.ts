import { Resolver, Query } from '@nestjs/graphql'
import { User } from './user.entity'
import { UserService } from './user.service'
import { GqlUser } from '../common/decorators/gql-user.decorator'
import { UseRoles } from 'nest-access-control'
import { ACLResources } from '../config/accessControl.config'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../common/guards/gql-auth.guard'
import { GqlACGuard } from '../common/guards/gql-ac.guard'

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlAuthGuard, GqlACGuard)
  @UseRoles({
    resource: ACLResources.USER,
    action: 'read',
    possession: 'own'
  })
  @Query(_returns => User)
  async getMe(@GqlUser() user: User): Promise<User> {
    return user
  }

  // @UseGuards(GqlAuthGuard)
  // @Mutation(_returns => User)
  // async updateUser(@GqlUser() user: User, @Args('data') newUserData: UpdateUserInput) {
  //   return this.userService.updateUser(user.id, newUserData)
  // }
}
