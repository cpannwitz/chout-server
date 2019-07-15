import { AuthChecker } from 'type-graphql'
import { verifyJWT, JWTPayload, createTokens } from '../utils/jwt'
import logger from '../utils/logger'
import { Request, Response, NextFunction } from 'express'

export const graphqlAuthHandler: AuthChecker<any> = ({ context }) => {
  const { req } = context
  logger.debug(`Server: Connection from: ${req.connection.remoteAddress}`)
  const token =
    (req.headers.authorization && req.headers.authorization.split(' ')[1]) ||
    req.headers.authorization

  if (token) {
    const payload = verifyJWT(token) as JWTPayload

    if (payload) {
      return true
    }
  }
  return false
}

export async function authHandler(req: Request, res: Response, next: NextFunction) {
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

export async function generateToken(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.id) {
    const [token, refreshtoken] = await createTokens(req.user.id)

    Object.assign(req, {
      token: token,
      refreshtoken: refreshtoken
    })
  }
  return next()
}

export async function sendToken(req: Request, res: Response, next: NextFunction) {
  if (req.token && req.refreshtoken) {
    res.setHeader('x-auth-token', req.token)
    res.setHeader('x-auth-refreshtoken', req.refreshtoken)
    return res.status(200).json(req.user)
  }
  return res.status(401).send('Authentication not successful.')
}
