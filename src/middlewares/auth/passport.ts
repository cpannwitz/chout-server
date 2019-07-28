import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local'
import TwitterTokenStrategy from 'passport-twitter-token'
import FacebookTokenStrategy from 'passport-facebook-token'
import { Strategy as GoogleTokenStrategy } from 'passport-google-token'
import { Profile } from 'passport'
import { User } from '../../modules/user/User.entity'
import UserService from '../../modules/user/User.service'
import { systemConfig } from '../../configs'
import { Request } from 'express'

export async function processTokenLoginStrategy(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: (error: any, user: User | null) => void
) {
  try {
    const userService = new UserService()
    const user = await userService.upsertSocialUser(profile)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
}

export async function processLocalLoginStrategy(
  email: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions) => void
) {
  try {
    const userService = new UserService()

    const user = await userService.getByEmail(email)
    if (user && user.password) {
      const validPassword = await userService.comparePasswords(user.password, password)
      if (validPassword) {
        done(null, user)
      }
    } else {
      done(null, null)
    }
  } catch (error) {
    done(error, null)
  }
}

async function processLocalSignupStrategy(
  req: Request,
  email: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions) => void
) {
  try {
    const userService = new UserService()

    const user = await userService.getByEmail(email)
    if (!user) {
      const username = req.body.username

      if (username) {
        const newUser = userService.createOne({
          username,
          email,
          password
        })

        done(null, newUser)
      }
    }
    done(null, null)
  } catch (error) {
    done(error, null)
  }
}

export const passportTwitter = new TwitterTokenStrategy(
  {
    consumerKey: systemConfig.auth.TwitterToken,
    consumerSecret: systemConfig.auth.TwitterSecret,
    includeEmail: true
  },
  processTokenLoginStrategy
)

export const passportFacebook = new FacebookTokenStrategy(
  {
    clientID: systemConfig.auth.FacebookClientId,
    clientSecret: systemConfig.auth.FacebookClientKey
  },
  processTokenLoginStrategy
)

export const passportGoogle = new GoogleTokenStrategy(
  {
    clientID: systemConfig.auth.GoogleClientId,
    clientSecret: systemConfig.auth.GoogleClientKey
  },
  processTokenLoginStrategy
)

export const passportLocalLogin = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  processLocalLoginStrategy
)

export const passportLocalSignup = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  },
  processLocalSignupStrategy
)

export const passportLogout = {}

export const passportRefresh = {}
