import { Injectable } from '@nestjs/common'
import { OrmService } from '../orm/orm.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { FindManyUserArgs, FindOneUserArgs } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private orm: OrmService) {}

  // * CRUD functions

  findOne(args: FindOneUserArgs) {
    return this.orm.user.findOne(args)
  }

  findOneById(id: string) {
    return this.orm.user.findOne({ where: { id } })
  }

  findMany(args: FindManyUserArgs) {
    return this.orm.user.findMany(args)
  }

  create(data: CreateUserDto) {
    return this.orm.user.create({ data })
  }

  update(id: string, data: UpdateUserDto) {
    return this.orm.user.update({
      data,
      where: {
        id
      }
    })
  }

  delete(id: string) {
    return this.orm.user.delete({
      where: {
        id
      }
    })
  }
}
