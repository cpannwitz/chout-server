// import { plainToClass } from 'class-transformer'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { User } from './User.entity'
import { Profile } from 'passport'
import { cryptoVerify } from '../../utils/crypto'

@Service()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>
  ) {}

  async getAll(skip: number = 0, take: number = 100, filter: any) {
    const users = await this.repository.find({
      skip,
      take,
      where: filter
    })
    return users
  }
  async getById(id: string) {
    const user = await this.repository.findOne({ where: { id } })
    return user
  }

  async getByEmail(email: string) {
    const user = await this.repository.findOne({ where: { email } })
    return user
  }

  async getByParam(params: { [key: string]: any }) {
    const user = await this.repository.findOne({ where: params })
    return user
  }

  async createOne(data: Partial<User>) {
    const user = await this.repository.create(data).save()
    return user
  }

  async createMany(data: Partial<User>[]) {
    const result = await this.repository.insert(data)
    return result
  }

  async updateOne(id: string, data: Partial<User>) {
    return await this.repository.update(id, data)
  }

  async removeOne(id: string) {
    return await this.repository.delete(id)
  }

  async removeMany(ids: string[]) {
    return Promise.all(ids.map(id => this.removeOne(id)))
  }

  // * ========= UTILS

  async comparePasswords(currentPassword: string, password: string) {
    if (currentPassword && password) {
      return await cryptoVerify(currentPassword, password)
    } else {
      throw new Error('No password found')
    }
  }

  // * ========= SOCIAL PROVIDERS

  async upsertSocialUser(profile: Profile) {
    let user: User | undefined = undefined

    user = await this.repository.findOne({
      where: {
        [`${profile.provider}Id`]: profile.id
      }
    })
    if (!user) {
      user = await this.createOne({
        email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : '',
        username: profile.displayName,
        password: '_',
        image: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : '',
        [`${profile.provider}Id`]: profile.id
      })
    }
    user = await this.repository.findOne(user.id)
    return user as any
  }

  // async findIndex(recipe: Recipe) {
  //   return this.items.findIndex(it => it.id === recipe.id)
  // }
  // private createRecipe(recipeData: Partial<Recipe>): Recipe {
  //   const recipe = plainToClass(Recipe, recipeData)
  //   recipe.id = this.getId()
  //   return recipe
  // }
  // private getId(): string {
  // return (++this.autoIncrementValue).toString()
  // }
}
