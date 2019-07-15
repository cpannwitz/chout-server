declare namespace Express {
  export interface Request {
    auth?: {
      id?: string
    }
    token?: string
    refreshtoken?: string
    jwtPayload?: {
      userId?: string
    }
  }

  export interface Response {
    jwtPayload?: {
      userId?: string
    }
  }
}
