import { Express, Request, Response } from 'express'
import { Redis } from 'ioredis'
import { Connection } from 'typeorm'

export interface Context {
  req: Request
  res: Response
  session: Session
  redis: any //Redis;
}

export interface ServerContext {
  app: Express
  db: Connection
  redis: Redis
}
