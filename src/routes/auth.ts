import { Router } from 'express'
import passport from 'passport'
import AuthController from '../modules/auth/Auth.controller'
import { generateToken, sendToken } from '../middlewares/auth/tokenMiddleware'

const router = Router()
router.post(
  '/facebook',
  passport.authenticate('facebook', { session: false }),
  AuthController.authenticateSocialLogin,
  generateToken,
  sendToken
)
router.post(
  '/google',
  passport.authenticate('google', { session: false }),
  AuthController.authenticateSocialLogin,
  generateToken,
  sendToken
)
router.post('/twitter/reverse', AuthController.authenticateTwitterReverse)
router.post(
  '/twitter',
  passport.authenticate('twitter', { session: false }),
  AuthController.authenticateTwitter,
  AuthController.authenticateSocialLogin,
  generateToken,
  sendToken
)

router.post(
  '/login',
  passport.authenticate('locallogin', { session: false }),
  generateToken,
  sendToken
)

router.post(
  '/signup',
  passport.authenticate('localsignup', { session: false }),
  generateToken,
  sendToken
)

// TODO: request password reset

// TODO: change password

//Change my password
// router.post('/change-password', [checkJwt], AuthController.changePassword)

export default router
