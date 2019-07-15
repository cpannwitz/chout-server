import path from 'path'
import { Container } from 'typedi'
import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
// import { express as voyagerMiddleware } from 'graphql-voyager/middleware'

import { graphqlAuthHandler } from '../middlewares/authHandlers'

import {
  // apolloPlaygroundConfig,
  systemConfig,
  apolloPlaygroundConfig
} from '../configs'

async function getGraphqlServer(app: Express) {
  const schema = await buildSchema({
    resolvers: [path.resolve('../modules/**/*.resolver{.js,.ts}')],
    authChecker: graphqlAuthHandler,
    container: Container
  })

  // * Apollo-Server Setup
  const apolloServer = new ApolloServer({
    schema: schema,
    // context: ({ req, res }) => ({ req, res, session: req.session, redis: redis }),
    // @ts-ignore: https://github.com/apollographql/apollo-server/issues/1713
    playground: apolloPlaygroundConfig,
    formatError: error => {
      return error // TODO: see: https://www.apollographql.com/docs/apollo-server/features/errors/
    },
    debug: systemConfig.isEnvDev()
  })
  return apolloServer.applyMiddleware({ app })
  // app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));
}

export default getGraphqlServer
