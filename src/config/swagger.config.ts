import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import basicAuth from 'express-basic-auth'
import { version } from '../../package.json'

const DEFAULT_DOCS_PATH = '/api'
const DEFAULT_DOCS_USER = process.env.DOCS_USER || 'chout'
const DEFAULT_DOCS_PASS = process.env.DOCS_PASS || 'chout'

export default (app: INestApplication) => {
  // enable basic authentication for OpenAPI documentation with credentials
  app.use(
    DEFAULT_DOCS_PATH,
    basicAuth({
      challenge: true,
      users: { [DEFAULT_DOCS_USER]: DEFAULT_DOCS_PASS }
    })
  )

  // configure the OpenAPI documentation
  const options = new DocumentBuilder()
    .setTitle('Chout - Events')
    .setDescription('Chout API Backend description')
    .setVersion(version || 'v1')
    .build()

  // initialize the OpenAPI documentation
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(DEFAULT_DOCS_PATH, app, document)
}
