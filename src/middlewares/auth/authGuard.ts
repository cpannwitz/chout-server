import { verifyJWT } from './jwt-utils'
import logger from '../../services/logger'
import { Request, Response, NextFunction } from 'express'

export async function authGuard(req: Request, res: Response, next: NextFunction) {
  logger.debug(`Server: Connection from: ${req.connection.remoteAddress}`)
  //Get the jwt token from the head
  const token = req.headers.authorization || ''
  let jwtPayload

  //Try to validate the token and get data
  if (!token) return res.status(401).send()
  try {
    jwtPayload = verifyJWT(token)
    req.jwtPayload = jwtPayload
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    return res.status(401).send()
  }

  //Call the next middleware or controller
  next()
}
