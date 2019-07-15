import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import { User } from './User.entity'
// import { systemConfig } from '../../configs'
// import { validate } from 'class-validator'

// import * as jwt from 'jsonwebtoken'
// import { getRepository } from 'typeorm'

class UserController {
  static getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    if (req.jwtPayload) {
      //Get user from the database
      const userRepository = getRepository(User)

      try {
        const user = await userRepository.findOneOrFail(req.jwtPayload.userId)
        if (user) {
          res.status(200).json(user)
        }
      } catch (error) {
        res.status(500).send()
      }
    }
  }
}
export default UserController
