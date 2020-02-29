import { Query, Resolver, Args } from '@nestjs/graphql'
import { User } from './user.entity'
import { UsersService } from './users.service'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuardJwt } from '../common/guards/gqlAuth.guard'
import { GqlUser } from '../common/decorators/gqlUser.decorator'

@Resolver(User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(_returns => User)
  async getUser(@Args({ name: 'id', type: () => String }) id: string) {
    return this.usersService.findOne(id)
  }

  @Query(_returns => User)
  @UseGuards(GqlAuthGuardJwt)
  async getMe(@GqlUser() user: User) {
    // return this.usersService.findOne(user.id)
    return user
  }

  // @ResolveProperty()
  // async posts(@Parent() author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}

// @UseGuards(GqlAuthGuardJwt)
// @Query('doSomething')
// async doSomething(@GqlUser() user: User): Promise<User> {
//     return await this.userService.findById(user.id);
//   }

// TODO: https://github.com/nikitakot/nestjs-boilerplate/blob/master/src/post/post.resolver.ts
/**
 * TODO: !
 * Use https://github.com/iamolegga/nestjs-session for setting up reading and setting to session
 * with JWT, based on example in nestjs-boilerplate repo
 *
 * Find out potential cross usage between passport oauth callbacks and graphql,
 *
 * Find out session setting after oauth callback
 *
 * Find out, what and where to set information in the httponly cookie
 *
 * Find out, if schema first approach is viable via nestjs-docs
 *
 */
