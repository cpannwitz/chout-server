import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger'

export default (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Chout - Events')
    .setDescription('Chout API Backend description')
    .setVersion(process.env.API_VERSION || 'v1')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
  // return document
}
