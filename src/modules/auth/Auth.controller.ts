import request from 'request'
import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import { systemConfig } from '../../configs'

import { User } from '../user/User.entity'
import { UserService } from '../user/User.service'

class AuthController {
  static authenticateSocialLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return res.status(401).send('User Not Authenticated')
    }
    // req.auth = {
    //   id: req.user.id
    // }
    next()
  }

  static authenticateTwitterReverse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    request.post(
      {
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
          callback: 'http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback',
          consumer_key: systemConfig.auth.TwitterToken, // eslint-disable-line
          consumer_secret: systemConfig.auth.TwitterSecret // eslint-disable-line
        }
      },
      function(error, r, body) {
        if (error) {
          return res.status(500).send({ message: error.message })
        }
        var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}'
        res.send(JSON.parse(jsonStr))
      }
    )
  }

  static authenticateTwitter = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    request.post(
      {
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
          token: req.query.oauth_token,
          consumer_key: systemConfig.auth.TwitterToken, // eslint-disable-line
          consumer_secret: systemConfig.auth.TwitterSecret // eslint-disable-line
        },
        form: { oauth_verifier: req.query.oauth_verifier } // eslint-disable-line
      },
      function(error, r, body) {
        if (error) {
          return res.status(500).send({ message: error.message })
        }

        const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}'
        const parsedBody = JSON.parse(bodyString)

        req.body['oauth_token'] = parsedBody.oauth_token
        req.body['oauth_token_secret'] = parsedBody.oauth_token_secret
        req.body['user_id'] = parsedBody.user_id

        next()
      }
    )
  }

  static changePassword = async (req: Request, res: Response, next: NextFunction) => {
    //Get ID from JWT
    const id = res.jwtPayload && res.jwtPayload.userId
    //Get parameters from the body
    const { oldPassword, newPassword } = req.body
    if (!(oldPassword && newPassword)) {
      res.status(400).send()
    }
    //Get user from the database
    const userRepository = getRepository(User)
    const userService = new UserService(userRepository)

    let user: User | undefined = undefined
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (error) {
      res.status(401).send()
    }

    //Check if old password matchs
    if (
      !user ||
      !user.password ||
      !userService.comparePasswords(user.password, oldPassword)
    ) {
      res.status(401).send()
      return
    }

    user.password = newPassword
    const errors = await validate(user)
    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }
    //Hash the new password and save
    userRepository.save(user)
    res.status(204).send()
  }
}
export default AuthController
