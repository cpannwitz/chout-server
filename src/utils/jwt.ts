import jwt from 'jsonwebtoken'
import { systemConfig } from '../configs'

export type JWTPayload = { userId: string } | null

type SignVariant = 'accessToken' | 'refreshToken'
interface SignJWT {
  payload: object | string | Buffer
  variant?: SignVariant
}
export function signJWT({ payload, variant = 'accessToken' }: SignJWT) {
  return jwt.sign(payload, systemConfig.auth.JWTSecret, {
    expiresIn:
      variant === 'refreshToken'
        ? systemConfig.auth.JWTRefreshTTL
        : systemConfig.auth.JWTTTL
  })
}

export function decodeJWT(token: string) {
  return jwt.decode(token)
}

export function verifyJWT(token: string) {
  return jwt.verify(token, systemConfig.auth.JWTSecret) as object
}

export async function createTokens(userId: string) {
  const token = signJWT({
    payload: {
      userId
    }
  })

  const refreshToken = signJWT({
    payload: {
      userId
    },
    variant: 'refreshToken'
  })

  return Promise.all([token, refreshToken])
}
