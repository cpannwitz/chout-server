let {
  NODE_ENV,
  DATABASE_URL,
  DBHOST,
  DBPORT,
  DBDATABASE,
  DBUSER,
  DBPASSWORD,
} = process.env

const isDev = NODE_ENV === 'development' ? true : false
const isProd = NODE_ENV === 'production' ? true : false
const isTest = NODE_ENV === 'test' ? true : false

if(isTest) {
  DBHOST = 'localhost',
  DBPORT = '5432',
  DBDATABASE = 'choutdbtest',
  DBUSER = 'chout',
  DBPASSWORD = '_'
}

module.exports = {
  url: DATABASE_URL,
  host: DATABASE_URL ? undefined : DBHOST,
  port: DATABASE_URL ? undefined : DBPORT,
  database: DATABASE_URL ? undefined : DBDATABASE,
  username: DATABASE_URL ? undefined : DBUSER,
  password: DATABASE_URL ? undefined : DBPASSWORD,
  type: 'postgres',
  logging: isDev ? 'all' : false,
  synchronize: isTest ? true : false,
  dropSchema: isTest ? true : false,
  cache: isProd ? true : false,
  entities: isProd ? ['./dist/modules/**/*.entity.js'] : ['./src/modules/**/*.entity.ts'],
  migrations: isProd ? ['./dist/migration/*.js'] : ['./src/migration/*.js'],
  subscribers: isProd ? ['./dist/subscriber/**/*'] : ['./src/subscriber/**/*'],
  cli: {
    entitiesDir: './src/modules',
    migrationsDir: './src/migration/',
    subscribersDir: './src/subscriber'
  },
  extra: {
    ssl: isProd ? true : false
  }
}

//   {
//   name: 'default',
//   url: DATABASE_URL,
//   host: DBHOST,
//   port: DBPORT,
//   database: DBDATABASE,
//   username: DBUSER,
//   password: DBPASSWORD,
//   type: 'postgres',
//   logging: 'all',
//   synchronize: false,
//   dropSchema: false,
//   cache: true,
//   entities: ['./dist/modules/**/*.entity.js'],
//   migrations: ['./dist/migration/*.js'],
//   subscribers: ['./dist/subscriber/**/*'],
//   cli: {
//     entitiesDir: './src/modules',
//     migrationsDir: './src/migration/',
//     subscribersDir: './src/subscriber'
//   },
//   extra: {
//     ssl: false
//   }
// },
//   {
//   name: 'development',
//   url: DATABASE_URL,
//   host: DBHOST,
//   port: DBPORT,
//   database: DBDATABASE,
//   username: DBUSER,
//   password: DBPASSWORD,
//   type: 'postgres',
//   logging: 'all',
//   synchronize: false,
//   dropSchema: false,
//   cache: true,
//   entities: ['./src/modules/**/*.entity.ts'],
//   migrations: ['./src/migration/*.js'],
//   subscribers: ['./src/subscriber/**/*'],
//   cli: {
//     entitiesDir: './src/modules',
//     migrationsDir: './src/migration/',
//     subscribersDir: './src/subscriber'
//   },
//   extra: {
//     ssl: false
//   }
// },
//   {
//   name: 'production',
//   url: DATABASE_URL,
//   host: DATABASE_URL ? undefined : DBHOST,
//   port: DATABASE_URL ? undefined : DBPORT,
//   database: DATABASE_URL ? undefined : DBDATABASE,
//   username: DATABASE_URL ? undefined : DBUSER,
//   password: DATABASE_URL ? undefined : DBPASSWORD,
//   type: 'postgres',
//   logging: false,
//   synchronize: false,
//   dropSchema: false,
//   cache: true,
//   entities: ['./dist/modules/**/*.entity.js'],
//   migrations: ['./dist/migration/*.js'],
//   subscribers: ['./dist/subscriber/**/*'],
//   cli: {
//     entitiesDir: './src/modules',
//     migrationsDir: './src/migration/',
//     subscribersDir: './src/subscriber'
//   },
//   extra: {
//     ssl: true
//   }
// },
//   {
//   name: 'test',
//   url: DATABASE_URL,
//   host: DBHOST,
//   port: DBPORT,
//   database: DBDATABASE,
//   username: DBUSER,
//   password: DBPASSWORD,
//   type: 'postgres',
//   logging: false,
//   synchronize: true,
//   dropSchema: true,
//   cache: false,
//   entities: ['./dist/modules/**/*.entity.js'],
//   migrations: ['./dist/migration/*.js'],
//   subscribers: ['./dist/subscriber/**/*'],
//   cli: {
//     entitiesDir: './src/modules',
//     migrationsDir: './src/migration/',
//     subscribersDir: './src/subscriber'
//   },
//   extra: {
//     ssl: false
//   }
// },
// ]
