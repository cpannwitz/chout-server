import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository, DeleteResult } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  // ? Single Entity Operations
  findOne(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne(id)
  }

  findOneByParams(user: Partial<User>): Promise<User | undefined> {
    return this.usersRepository.findOne(user)
  }

  createOne(data: Partial<User>): Promise<User | undefined> {
    const user = this.usersRepository.create(data)
    return this.usersRepository.save(user)
  }

  async updateOne(id: string, data: Partial<User>): Promise<User | undefined> {
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
  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }
}
