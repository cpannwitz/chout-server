import { Express } from 'express'
import { Redis } from 'ioredis'
import { Connection } from 'typeorm'

export interface ServerContext {
  app: Express
  db: Connection
  redis: Redis
}
