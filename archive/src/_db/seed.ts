import { Connection } from 'typeorm'

import { Users } from '../users/users.entity'
import { AuthProvider } from '../config/auth.config'

const seed = async (connection: Connection) => {
  await connection.transaction(async transactionalEntityManager => {
    await transactionalEntityManager.delete(Users, {})

    const user = transactionalEntityManager.create(Users, {
      username: 'testname',
      email: 'test@email.de',
      providerId: '123',
      provider: AuthProvider.GOOGLE,
      roles: ['user']
    })
    await transactionalEntityManager.save(user)
  })
}

export default seed
