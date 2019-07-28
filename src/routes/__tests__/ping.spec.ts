import request from 'supertest'
import getApp from '../../app'

describe('Special Route tests', () => {
  it('responds correctly with "pong"', done => {
    request(getApp())
      .get('/ping')
      .expect(200, 'pong')
    done()
  })
})
