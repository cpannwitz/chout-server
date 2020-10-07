// import { PrismaService } from './../../services/prisma.service';
// import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { Resolver, Query, Parent, Mutation, Args, ResolveField } from '@nestjs/graphql'
import { BadRequestException, UseGuards } from '@nestjs/common'
import { User } from './user.entity'
import { UserService } from './user.service'
import { GqlUser } from '../common/decorators/gql-user.decorator'
import { GetUserInput } from './dto/get-user.input'
import {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
  ValidationError,
  SchemaError,
  SyntaxError
} from 'apollo-server-express'

// import { User as UserModel } from '@prisma/client'
// import { User } from '../users/users.entity'
// import { UserEntity } from '../../decorators/user.decorator';
// import { User } from '../../models/user.model';
// import { ChangePasswordInput } from './dto/change-password.input';
// import { UserService } from 'src/services/user.service';
// import { UpdateUserInput } from './dto/update-user.input';

// @UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(_returns => User)
  async me(@GqlUser() user: User): Promise<User> {
    return user
  }

  @Query(_returns => User, { nullable: true })
  async user(@Args('data') data: GetUserInput): Promise<User | null> {
    const user = await this.userService.findOneById(data.id)
    if (!user) {
      throw new UserInputError('User not found.')
    }
    return user
  }

  // @UseGuards(GqlAuthGuard)
  // @Mutation(_returns => User)
  // async updateUser(@GqlUser() user: User, @Args('data') newUserData: UpdateUserInput) {
  //   return this.userService.updateUser(user.id, newUserData)
  // }

  // @UseGuards(GqlAuthGuard)
  // @Mutation(_returns => User)
  // async changePassword(@GqlUser() user: User, @Args('data') changePassword: ChangePasswordInput) {
  //   return this.userService.changePassword(user.id, user.password, changePassword)
  // }

  // @ResolveField('posts')
  // posts(@Parent() author: User) {
  //   return this.prisma.user.findOne({ where: { id: author.id } }).posts();
  // }
}
