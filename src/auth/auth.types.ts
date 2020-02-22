export interface JwtPayload {
  sub: string
  iat: number
  exp: number
}

export enum AuthProvider {
  GOOGLE = 'google'
}
