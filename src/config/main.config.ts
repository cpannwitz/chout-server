import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export default () => ({
  system: {
    port: parseInt(process.env.PORT || '') || 4000,
    host: process.env.HOST || '0.0.0.0',
    nodeEnv: process.env.NODE_ENV || 'develop',
    serverURI: process.env.SERVER_URI || 'http://localhost:4000',
    clientURI: process.env.CLIENT_URI || 'http://localhost:3000'
  },
  database: {
    url: process.env.DATABASE_URL,
    db: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT
  },
  typeorm: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: !process.env.IS_LOCAL,
    synchronize: false,
    dropSchema: false,
    logging: true,
    migrationsRun: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    subscribers: [__dirname + '/../_db/subscribers/**/*.{.ts,.js}'],
    migrations: [__dirname + '/../_db/migrations/**/*{.ts,.js}']
  } as TypeOrmModuleOptions
})
