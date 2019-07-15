// import 'dotenv/config'
// import request from 'supertest'
// import startServer from '../../app'
// import { ServerContext } from '../../types/global'
// // import '../../types/ioredis-mock'
// import '../../configs'

describe('test', () => {
  it('tests', () => {
    expect(true).toBe(true)
  })
})

// // import Redis from 'ioredis'
// // import RedisMock from 'ioredis-mock'
// // jest.mock('ioredis', () => RedisMock)

// // import passport from 'passport'

// // a helper function to make a POST request
// // export function post(url: string, body: object){
// //   const httpRequest = request(app).post(url);
// //   httpRequest.send(body);
// //   httpRequest.set('Accept', 'application/json')
// //   httpRequest.set('Origin', 'http://localhost:3000')
// //   return httpRequest;
// // }
// let expapp: any = undefined
// beforeAll(async () => {
//   await startServer.run().then(({ app }: ServerContext) => {
//     expapp = app
//   })
// })

// describe('Login', () => {
//   it('calls the check correctly', async done => {
//     // passport.authenticate = jest.fn((authType, options, callback) => () => { callback('This is an error', null); });

//     request(expapp)
//       .get('/health')
//       // .end(function(err, res) {
//       //   if (err) throw err
//       //   expect(res.body).toMatchObject({ status: 'OK' })
//       //   done
//       // })
//       // .then(done)
//       .expect(
//         200,
//         {
//           status: 'OK'
//         },
//         done
//       )
//     // .end((error, res) => {
//     //   console.log('LOG | : res', res.body)
//     //   expect(res.body).toMatchObject({ status: 'thefuck' })
//     // })
//   })

//   //  it('succeeds with correct credentials', async () => {
//   //    const response = await post(`login`, demoUser)
//   //      .expect(200);
//   //     expect(res.body.user.email).toBe(demoUser.email);
//   //   })

//   //  it('fails with invalid credentials', async () => {
//   //    const user = {email:'notarealmail@mycompany.com', password: 'somepassword'};
//   //    await post(`login`, user)
//   //      .expect(400);
//   //   })

//   //  it('fails with missing credentials', async () => {
//   //    const user = {};
//   //    await post(`login`, user)
//   //      .expect(400);
//   //   })
// })
