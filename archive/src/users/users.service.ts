import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from './users.entity'
import { Repository, DeleteResult } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {}

  // ? Single Entity Operations
  findOne(id: string): Promise<Users | undefined> {
    return this.usersRepository.findOne(id)
  }

  findOneByParams(user: Partial<Users>): Promise<Users | undefined> {
    return this.usersRepository.findOne(user)
  }

  createOne(data: Partial<Users>): Promise<Users | undefined> {
    const user = this.usersRepository.create(data)
    return this.usersRepository.save(user)
  }

  async updateOne(id: string, data: Partial<Users>): Promise<Users | undefined> {
    const user = await this.usersRepository.findOne(id)
    if (user) {
      this.usersRepository.merge(user, data)
      return this.usersRepository.save(user)
    }
  }

  removeOne(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id)
  }

  // ? Multi Entity Operations
  findAll(): Promise<Users[]> {
    return this.usersRepository.find()
  }
}
