# Chout-Server
Based on NestJS, with TypeORM and GraphQL.

## Authentication
There are two ways of authentication via OAuth available:
- Implicit Grant
- Auth Code Grant

For graphql, there is only implicit grant flow available (due to lack of callback functionality from oauth provider)