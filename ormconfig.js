const {
  NODE_ENV,
  DBHOST = 'localhost',
  DBPORT = '5432',
  DBDATABASE = '',
  DBUSER = '',
  DBPASSWORD = ''
} = process.env
const isEnvDev = NODE_ENV === 'development' ? true : false
const isEnvTEST = NODE_ENV === 'test' ? true : false
const envdir = isEnvDev ? 'src/' : 'dist/'

module.exports = {
  host: DBHOST,
  port: DBPORT,
  database: DBDATABASE,
  username: DBUSER,
  password: DBPASSWORD,
  type: 'postgres',
  logging: isEnvDev ? 'all' : false,
  synchronize: isEnvTEST,
  dropSchema: isEnvTEST,
  cache: isEnvDev,
  entities: [envdir + 'modules/**/*.entity{.ts,.js}'],
  migrations: [envdir + 'migration/**/*'],
  subscribers: [envdir + 'subscriber/**/*'],
  cli: {
    entitiesDir: './src/modules',
    migrationsDir: './src/migration',
    subscribersDir: './src/subscriber'
  }
}
