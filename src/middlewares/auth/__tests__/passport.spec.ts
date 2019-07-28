import { processTokenLoginStrategy, processLocalLoginStrategy } from '../passport'
import UserService from '../../../modules/user/User.service'

function upsertSuccessMock() {
  return new Promise((res, rej) => {
    res({ id: '1' })
  })
}

function upsertFailMock() {
  return new Promise((res, rej) => {
    rej('error')
  })
}

// function getByMailMock(email: string) {
//   return new Promise((res, rej) => {
//     rej('WRONG')
//     // if (email === 'hello') {
//     //   res({ id: '1' })
//     // } else {
//     // }
//   })
// }
// function comparePasswordsMock(password: string) {
//   return new Promise((res, rej) => {
//     rej(false)
//     // if (password === 'world') {
//     //   res(false)
//     // } else {
//     // }
//   })
// }

describe('passport tests', () => {
  describe('=> processTokenLoginStrategy', () => {
    // it('calls done with user', async done => {
    //   jest.mock('../../../modules/user/User.service', () => {
    //     return jest.fn(() => {
    //       return {
    //         upsertSocialUser: upsertSuccessMock
    //       }
    //     })
    //   })

    //   await processTokenLoginStrategy('', '', {} as any, (error: any, user: any) => {
    //     expect(user).toMatchObject({ id: '1' })
    //     expect(error).toBeNull()
    //   })
    //   done()
    // })
    it('calls error with fail', async done => {
      jest.mock('../../../modules/user/User.service', () => {
        return jest.fn(() => {
          return {
            upsertSocialUser: upsertFailMock()
          }
        })
      })

      await processTokenLoginStrategy('', '', {} as any, (error: any, user: any) => {
        expect(user).toBeNull()
        expect(error).not.toBeNull()
      })
      done()
    })
  })

  // describe('=> processLocalLoginStrategy', () => {
  //   it('returns a valid user with correct password', done => {
  //     jest.mock('../../../modules/user/User.service', () => {
  //       return jest.fn(() => {
  //         return {
  //           getByEmail: getByMailMock,
  //           comparePasswords: comparePasswordsMock
  //         }
  //       })
  //     })

  //     processLocalLoginStrategy('hello', 'wÖrld', (error: any, user: any) => {
  //       expect(user).toMatchObject({ id: '1' })
  //       expect(error).toBeNull()
  //     })
  //     done()
  //   })

  // it('fails with incorrect password', done => {
  //   jest.mock('../../../modules/user/User.service', () => {
  //     return jest.fn(() => {
  //       return {
  //         getByEmail: getByMailMock,
  //         comparePasswords: comparePasswordsMock
  //       }
  //     })
  //   })

  //   processLocalLoginStrategy('', '', (error: any, user: any) => {
  //     expect(user).toMatchObject({ id: '1' })
  //     expect(error).toBeNull()
  //   })
  //   done()
  // })
  // })
})
