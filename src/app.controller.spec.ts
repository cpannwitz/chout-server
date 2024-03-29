import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigService } from '@nestjs/config'
// import httpMocks from 'node-mocks-http'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ConfigService, AppService]
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  it('rocks', () => {})

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     const res = httpMocks.createResponse()
  //     res.redirect = jest.fn()
  //     appController.defaultRoute(res)
  //     expect(res.redirect.mock.calls.length).toEqual(1)
  //   })
  // })
})
