import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './users.entity'
import { UsersService } from './users.service'

export class UserRepositoryMock {
  public find(): Promise<void> {
    return new Promise(() => {})
  }
  public findOne(): Promise<void> {
    return new Promise(() => {})
  }
  public create(): void {}
  public save(): Promise<void> {
    return new Promise(() => {})
  }
  public merge(): void {}
  public delete(): Promise<void> {
    return new Promise(() => {})
  }
}

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: UserRepositoryMock
        }
      ]
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
