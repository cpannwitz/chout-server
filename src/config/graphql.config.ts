import { GqlModuleOptions } from '@nestjs/graphql'
import { registerAs } from '@nestjs/config'
import { UsersModule } from '../users/users.module'
import { AuthModule } from '../auth/auth.module'
import corsConfig from './cors.config'

// GraphQL Manager: https://engine.apollographql.com/org/chout

// Help:
// https://github.com/nikitakot/nestjs-boilerplate/blob/master/src/post/post.resolver.ts

export default registerAs(
  'graphql',
  () =>
    ({
      // * For schema-first definition
      include: [AuthModule, UsersModule],
      // autoSchemaFile: true,
      autoSchemaFile: 'schema.gql', // https://github.com/nestjs/graphql/issues/205
      installSubscriptionHandlers: true,
      subscriptions: {
        // https://github.com/nestjs/graphql/issues/48#issuecomment-583640594
        onConnect: connectionParams => connectionParams
      },
      engine: {
        apiKey: process.env.ENGINE_API_KEY,
        schemaTag: process.env.NODE_ENV
      },
      cors: corsConfig(),
      context: ({ req, res }) => ({ req, res }),
      debug: process.env.NODE_ENV === 'development' ? true : false,
      playground: process.env.NODE_ENV === 'development' ? true : false
    } as GqlModuleOptions)
)
