import { Request, Response, NextFunction } from 'express'
import { createTokens } from './jwt-utils'

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
