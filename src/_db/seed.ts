import { Connection } from 'typeorm'

import { User } from '../users/user.entity'
import { AuthProvider } from '../auth/auth.types'

const seed = async (connection: Connection) => {
  await connection.transaction(async transactionalEntityManager => {
    await transactionalEntityManager.delete(User, {})

    const user = transactionalEntityManager.create(User, {
      username: 'testname',
      email: 'test@email.de',
      providerId: '123',
      provider: AuthProvider.GOOGLE
    })
    await transactionalEntityManager.save(user)
  })
}

export default seed