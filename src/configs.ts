import { normalizePort } from './utils/serverUtils'

const {
  NODE_ENV = 'development',
  ENVIRONMENT = 'development',
  PORT = 3000,
  // DBHOST = 'localhost',
  // DBPORT = '5432',
  // DBDATABASE = '',
  // DBUSER = '',
  // DBPASSWORD = '',
  REDIS_PORT = '',
  REDIS_HOST = 'localhost',
  REDIS_PW = '',
  SESSIONSECRET = '',
  SENTRY_DSN = '',
  AUTH_JWT_SECRET = 'testsecret',
  AUTH_JWT_TTL = '1d',
  AUTH_JWT_REFRESH_TTL = '7d',
  AUTH_TWITTER_TOKEN = '',
  AUTH_TWITTER_SECRET = '',
  AUTH_GOOGLE_CLIENTID = '',
  AUTH_GOOGLE_CLIENTKEY = '',
  AUTH_FACEBOOK_CLIENTID = '',
  AUTH_FACEBOOK_CLIENTKEY = '',
  LOGDNA_KEY = ''
} = process.env

export function isEnvDev() {
  return NODE_ENV === 'development'
}
export function isEnvProd() {
  return NODE_ENV === 'production'
}
export function isEnvTest() {
  return NODE_ENV === 'test'
}

export const systemConfig = {
  isEnvDev,
  isEnvProd,
  isEnvTest,
  env: NODE_ENV,
  environment: ENVIRONMENT,
  port: PORT,
  sessionSecret: SESSIONSECRET,
  // dbHost: DBHOST,
  // dbPort: DBPORT,
  // dbDatabase: DBDATABASE,
  // dbUser: DBUSER,
  // dbPassword: DBPASSWORD,
  redis: {
    port: normalizePort(REDIS_PORT),
    host: REDIS_HOST,
    password: REDIS_PW
  },
  sentryDSN: SENTRY_DSN,
  auth: {
    JWTSecret: AUTH_JWT_SECRET,
    JWTTTL: AUTH_JWT_TTL,
    JWTRefreshTTL: AUTH_JWT_REFRESH_TTL,
    TwitterToken: AUTH_TWITTER_TOKEN,
    TwitterSecret: AUTH_TWITTER_SECRET,
    GoogleClientId: AUTH_GOOGLE_CLIENTID,
    GoogleClientKey: AUTH_GOOGLE_CLIENTKEY,
    FacebookClientId: AUTH_FACEBOOK_CLIENTID,
    FacebookClientKey: AUTH_FACEBOOK_CLIENTKEY
  },
  globalTimeout: '30s'
}

// export const sessionConfig = {
//   name: 'msh',
//   secret: SESSIONSECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     secure: isEnvProd(),
//     maxAge: 1000 * 60 * 60 * 24 * 7, // One week
//     path: '/graphql' // Done for testing resolvers in playground
//   }
// }

export const apolloPlaygroundConfig = {
  settings: {
    // put in entire setting object because of bug with Typscript and apollo-server (issue #1713)
    'general.betaUpdates': false,
    'editor.cursorShape': 'line',
    'editor.fontSize': 14,
    'editor.fontFamily':
      "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
    'editor.theme': 'dark',
    'editor.reuseHeaders': true,
    'prettier.printWidth': 80,
    'request.credentials': 'same-origin',
    'tracing.hideTracingResponse': true
  }
}

export const corsConfig = {
  credentials: true,
  // origin: `http://localhost:${PORT}`
  origin: true,
  exposedHeaders: ['x-auth-token', 'x-auth-refreshtoken']
}

export const logdnaConfig = {
  key: LOGDNA_KEY, // the only field required
  // hostname: myHostname,
  // ip: ipAddress,
  // mac: macAddress,
  // app: appName,
  // env: envName,
  index_meta: true, // Defaults to false, when true ensures meta object will be searchable
  handleExceptions: true
}

export const ratelimitConfig = {
  windowMs: 60 * 1000, // 1 minutes
  max: 60 // limit each IP to 60 requests per windowMs
  // delayMs: 0 // disable delaying - full speed until the max limit is reached
}
