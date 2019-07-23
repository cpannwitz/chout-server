import * as ClassValidator from 'class-validator'
import * as TypeORM from 'typeorm'
import { Container } from 'typedi'
import { systemConfig } from '../configs'
ClassValidator.useContainer(Container)
TypeORM.useContainer(Container)

function getDatabase(connectionName?: string) {
  return new Promise<TypeORM.Connection>((resolve, reject) => {
    TypeORM.createConnection(connectionName || systemConfig.env)
      .then(dbconnection => {
        resolve(dbconnection)
      })
      .catch(error => {
        reject('DATABASE CONNECTION CANT BE ESTABLISHED: ' + error.message)
      })
  })
}

export default getDatabase
