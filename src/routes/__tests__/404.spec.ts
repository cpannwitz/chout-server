import request from 'supertest'
import getApp from '../../app'

describe('Special Route tests', () => {
  it('sends status 404 missing correctly', done => {
    request(getApp)
      .get('/thisisntallowed')
      .expect(404)
    done()
  })
})
