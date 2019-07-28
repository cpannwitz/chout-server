![Logo of the project](./src/static/public/logo.png)

# Chout - NodeJS Server &middot; [![CircleCI](https://circleci.com/gh/cpannwitz/chout-server.svg?style=svg)](https://circleci.com/gh/cpannwitz/chout-server)

This is the NodeJS Server, based on Express, for Chout.

## Installing / Getting started

To get started working on this repository, first clone the it via Github.

```shell
git clone https://github.com/cpannwitz/chout-server
```

## Developing

### Built With

- Express
- TypeORM
- Postgres
- Redis
- (Apollo-Server / GraphQL SOON!)

### Prerequisites

### Setting up Dev

Furthermore, you need to install npm dependencies:

```shell
yarn install
```

Additionally, we need a Postgres DB and Redis DB running locally. You may install this via Brew:

Postgres:

```shell
brew install postgresql
brew services start postgresql
psql postgres
```

In `psql` shell:

```psql
CREATE DATABASE choutdb;
CREATE DATABASE choutdb-test;
CREATE USER chout;
GRANT ALL PRIVILEGES ON DATABASE choutdb TO chout;
GRANT ALL PRIVILEGES ON DATABASE choutdb-test TO chout;
```

Redis:

```shell
brew install redis
```

To start the server, run:

```shell
yarn start:dev
```

### Building

Build the project almost always happens on the designated server/service, so there's almost never a need to build the project locally.
How to build:

```shell
yarn build
```

How to start the builded server:

```shell
yarn start
```

### Deploying / Publishing

TODO

## Versioning

## Configuration

Please see `env.example` for all available environment variables.

Also there's a `config.ts` in `/src` which contains more configuration.

## Tests

To test the project locally, run:

```shell
yanr test:cli
```

To run it like it should be run in CI:

```shell
yarn test
```

## Style guide

## Api Reference

## Database

- Postgres (latest)

## Licensing

Unlicensed currently.
