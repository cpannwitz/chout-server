import { GqlModuleOptions } from '@nestjs/graphql'
import { registerAs } from '@nestjs/config'
import { applyMiddleware } from 'graphql-middleware'
import { UsersModule } from '../users/users.module'
import { AuthModule } from '../auth/auth.module'
import corsConfig from './cors.config'
import graphqlAccessControlConfig from './graphqlAccessControl.config'
// import { join } from 'path'

// GraphQL Manager: https://studio.apollographql.com/org/chout

export default registerAs(
  'graphql',
  () =>
    ({
      include: [AuthModule, UsersModule],
      context: ({ req, res }) => ({ req, res }),
      resolverValidationOptions: {
        requireResolversForResolveType: false
      },
      installSubscriptionHandlers: true,
      subscriptions: {
        // https://github.com/nestjs/graphql/issues/48#issuecomment-583640594
        onConnect: connectionParams => connectionParams
      },
      engine: {
        apiKey: process.env.ENGINE_API_KEY,
        graphVariant: process.env.NODE_ENV
      },
      cors: corsConfig(),
      debug: process.env.NODE_ENV === 'development' ? true : false,
      playground: process.env.NODE_ENV === 'development' ? true : false,
      introspection: process.env.NODE_ENV === 'development' ? true : false,
      // * For code-first definition
      autoSchemaFile: 'schema.gql', // autoSchemaFile: true, | https://github.com/nestjs/graphql/issues/205 | https://github.com/nestjs/graphql/issues/721
      buildSchemaOptions: {
        dateScalarMode: 'isoDate'
      },
      transformSchema: schema => {
        schema = applyMiddleware(schema, graphqlAccessControlConfig())
        return schema
      }
    } as GqlModuleOptions)
)
