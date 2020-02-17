import { JwtModuleOptions } from '@nestjs/jwt'

export default () => ({
  auth: {
    clientURI: process.env.CLIENT_URI || 'http://localhost:3000',
    loginSuccessUrl: (process.env.CLIENT_URI || 'http://localhost:3000') + '/login/success',
    jwt: {
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '15m'
      }
    } as JwtModuleOptions,
    jwtRefresh: {
      secret: process.env.JWT_REFRESH_SECRET,
      signOptions: {
        expiresIn: '7d'
      }
    } as JwtModuleOptions,
    google: {
      clientID: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_KEY,
      callbackURL: process.env.SERVER_URI + '/auth/google/callback',
      passReqToCallback: true,
      scope: ['email', 'profile', 'openid']
    }
  }
})