import { Request, Response, NextFunction } from 'express'

export function pingRoute(req: Request, res: Response, next: NextFunction) {
  res.status(200).send('pong')
}
