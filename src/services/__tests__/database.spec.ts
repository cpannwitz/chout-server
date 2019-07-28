import getDatabase from '../database'

describe('database connection test', () => {
  it('connects successfully with credentials via node_env', async done => {
    const connection = await getDatabase()
    expect(connection).toBeDefined()
    connection.close()
    return done()
  })

  it('connects NOT successfully with wrong credentials', done => {
    expect(getDatabase('lol')).rejects.toContain(
      'DATABASE CONNECTION CANT BE ESTABLISHED:'
    )
    done()
  })
})
