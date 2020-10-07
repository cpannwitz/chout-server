# Chout-Server
This server boilerplate is built with [NestJS](https://nestjs.com/) and the [Express](https://expressjs.com/de/) adapter.
Also it includes compatible submodules to work with:
- Prisma -> **Postgres DB**
- Apollo-Express-Server -> **GraphQL**
- Swagger -> **REST Documentation**
- Firebase -> **Authentication and services**
- Redis (currently unused)

## Tooling
Docker-Compose and Docker are used to setup and run the NestJS server locally and on the target system.
Also there are instances of following services started locally:
- Postgres
- Postgres-Test
- pgAdmin
- Redis

Additionally, Gitlab CI is used to deploy the built image.

> Additional scripts can be found in package.json.

## Deployment / Workflow
1. Fill in `.env` according to `.env.example`, for all services and configs
2. Run `npm run start:docker:full` if you want to use Docker, or `npm run start:dev` standalone.
3. To stop Docker, run `npm run stop:docker`
4. If there are database schema changes, run `npm run migrations:generate` with the docker instance running, to generate needed migrations.
5. To apply migrations locally, run `npm run migrations:run:dev`
6. Git commit and push changes, Gitlab CI will build the image and send it right to the deployment destination.

> For successful deploy you need to provide your HEROKU_API_KEY to gitlab CI env variables!

## Authentication
Authentication is done by Firebase SDK, which is used to validate user ID tokens, sent from the clients.
After successful authentication and authorization, the user data will be persisted to our own database.

## Authorization
Based on roles saved on the user record, there are two ways of authorization used:

- **Nest-Access-Control** (REST)
- **GraphQL-Shield** (GraphQL)

## Configuration
Configuration files for all kinds of services and modules are found in `src/config`, which are loaded by @nestjs/config.

## REST vs GraphQL
REST is primarily used for OAuth Authorization Code Flow, which needs callbacks.
GraphQL is primarily used for everything else, which is API related.

## Logging
### Internal - Pino
NestJS provides its own logging for system notifications.
Furthermore we use [nestjs-pino](https://github.com/iamolegga/nestjs-pino) for request and general error logging. (see `app.module.ts`)
Every module which wants to log must inject the logger module.

### External - Sentry
External logging is done by [nest-raven](https://www.npmjs.com/package/nest-raven), which provides Sentry configuration and interceptor.
(see `main.ts` and `app.module.ts`)
Sentry is found here: [sentry.io](https://sentry.io/)

## Additional Modules
- Health checks via Terminus