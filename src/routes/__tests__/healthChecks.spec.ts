import request from 'supertest'
import startServer from '../../app'
import { ServerContext } from '../../types/_ServerTypes'

let expapp: any = undefined
beforeAll(async () => {
  await startServer.run().then(({ app }: ServerContext) => {
    expapp = app
  })
})

describe('Login', () => {
  it('calls the check correctly', done => {
    request(expapp)
      .get('/health')
      .end(function(err, res) {
        if (err) throw err
        expect(res.body).toMatchObject({
          status: 'OK',
          dbStatus: 'OK',
          redisStatus: 'OK'
        })
        done()
      })
  })
})
