import { Resolver, Query, Args, Mutation, Ctx, Arg, Authorized } from 'type-graphql'
import { Repository, getRepository } from 'typeorm'
import { User } from './User.entity'
import { Context } from '../../types/global'
import { RegisterUserInput, GetUsersArgs, LoginUserInput } from './User.types'
import { createTokens } from '../../utils/jwt'
import { cryptoVerify } from '../../utils/crypto'

@Resolver(User)
export class UserResolver {
  constructor(private repository: Repository<User>) {
    this.repository = getRepository(User)
  }

  // @Query(returns => User)
  // async me(@Ctx() { session }: Context) {
  //   return this.repository.findOne({ where: { id: session.userId } })
  // }

  @Authorized()
  @Query(returns => [User])
  async getUsers(@Args() { skip, take }: GetUsersArgs) {
    try {
      const users = await this.repository.find({
        skip,
        take
      })
      return users
    } catch (err) {
      return err
    }
  }

  @Mutation(returns => User)
  async loginUser(@Arg('data') data: LoginUserInput, @Ctx() context: Context) {
    const { email, password } = data

    const user = await this.repository.findOne({
      where: { email }
    })

    if (user && user.password) {
      const validPassword = await this.comparePasswords(user.password, password)
      if (validPassword) {
        const [accessToken, refreshToken] = await createTokens(user.id)
        // return user
        context.res.set('x-auth-token', accessToken)
        context.res.set('x-auth-refreshtoken', refreshToken)
        return user
      } else {
        throw new Error('Credentials incorrect.')
      }
    } else {
      throw new Error('No user found for this set of credentials.')
    }
  }

  @Mutation(returns => User)
  async registerUser(@Arg('data') data: RegisterUserInput) {
    const { email, password, username } = data
    const userAlreadyExists = await this.repository.findOne({
      where: { email },
      select: ['id']
    })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const newUser = await this.repository
      .create({
        email,
        password,
        username
      })
      .save()
    return newUser
  }

  // * UTIL
  async comparePasswords(currentPassword: string, password: string) {
    if (currentPassword && password) {
      return await cryptoVerify(currentPassword, password)
    } else {
      throw new Error('No password found')
    }
  }
}
