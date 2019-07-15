import * as ClassValidator from 'class-validator'
import * as TypeORM from 'typeorm'
import { Container } from 'typedi'
ClassValidator.useContainer(Container)
TypeORM.useContainer(Container)

function getDatabase() {
  return new Promise<TypeORM.Connection>((resolve, reject) => {
    TypeORM.createConnection()
      .then(dbconnection => {
        resolve(dbconnection)
      })
      .catch(() => {
        reject({ message: 'DATABASE CONNECTION CANT BE ESTABLISHED' })
      })
  })
}

export default getDatabase
