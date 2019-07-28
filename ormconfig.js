let {
  DATABASE_URL,
  DBHOST,
  DBPORT,
  DBDATABASE,
  DBUSER,
  DBPASSWORD,
} = process.env

module.exports = [
  {
  name: 'default',
  url: DATABASE_URL,
  host: DATABASE_URL ? undefined : DBHOST,
  port: DATABASE_URL ? undefined : DBPORT,
  database: DATABASE_URL ? undefined : DBDATABASE,
  username: DATABASE_URL ? undefined : DBUSER,
  password: DATABASE_URL ? undefined : DBPASSWORD,
  type: 'postgres',
  logging: 'all',
  synchronize:false,
  dropSchema: false,
  cache: false,
  entities: ['./src/modules/**/*.entity.ts'],
  migrations: ['./src/migration/*.ts'],
  subscribers: ['./src/subscriber/**/*'],
  cli: {
    entitiesDir: './src/modules',
    migrationsDir: './src/migration/',
    subscribersDir: './src/subscriber'
  },
  extra: {
    ssl: false
  }
},
  {
  name: 'development',
  url: DATABASE_URL,
  host: DATABASE_URL ? undefined : DBHOST,
  port: DATABASE_URL ? undefined : DBPORT,
  database: DATABASE_URL ? undefined : DBDATABASE,
  username: DATABASE_URL ? undefined : DBUSER,
  password: DATABASE_URL ? undefined : DBPASSWORD,
  type: 'postgres',
  logging: 'all',
  synchronize:false,
  dropSchema: false,
  cache: false,
  entities: ['./src/modules/**/*.entity.ts'],
  migrations: ['./src/migration/*.ts'],
  subscribers: ['./src/subscriber/**/*'],
  cli: {
    entitiesDir: './src/modules',
    migrationsDir: './src/migration/',
    subscribersDir: './src/subscriber'
  },
  extra: {
    ssl: false
  }
},
{
  name: 'test',
  url: DATABASE_URL,
  host: DATABASE_URL ? undefined : 'localhost',
  port: DATABASE_URL ? undefined : '5432',
  database: DATABASE_URL ? undefined : 'choutdbtest',
  username: DATABASE_URL ? undefined : 'chout',
  password: DATABASE_URL ? undefined : '_',
  type: 'postgres',
  logging: false,
  synchronize:true,
  dropSchema: true,
  cache: false,
  entities: ['./src/modules/**/*.entity.ts'],
  migrations: ['./src/migration/*.ts'],
  subscribers: ['./src/subscriber/**/*'],
  cli: {
    entitiesDir: './src/modules',
    migrationsDir: './src/migration/',
    subscribersDir: './src/subscriber'
  },
  extra: {
    ssl: false
  }
},
{
  name: 'production',
  url: DATABASE_URL,
  host: DATABASE_URL ? undefined : DBHOST,
  port: DATABASE_URL ? undefined : DBPORT,
  database: DATABASE_URL ? undefined : DBDATABASE,
  username: DATABASE_URL ? undefined : DBUSER,
  password: DATABASE_URL ? undefined : DBPASSWORD,
  type: 'postgres',
  logging: false,
  synchronize: false,
  dropSchema: false,
  cache: true,
  entities: ['./dist/modules/**/*.entity.js'] ,
  migrations: ['./dist/migration/*.js'] ,
  subscribers: ['./dist/subscriber/**/*'] ,
  cli: {
    entitiesDir: './src/modules',
    migrationsDir: './src/migration/',
    subscribersDir: './src/subscriber'
  },
  extra: {
    ssl: true
  }
},
]

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
