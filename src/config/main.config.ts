import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export default () => ({
  system: {
    port: parseInt(process.env.PORT || '') || 4000,
    host: process.env.HOST || '0.0.0.0',
    nodeEnv: process.env.NODE_ENV || 'develop'
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
    entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'production' ? false : true,
    logging: 'all'
  } as TypeOrmModuleOptions
})
