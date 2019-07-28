import { Router } from 'express'
import UserController from '../modules/user/User.controller'
import { authGuard } from '../middlewares/auth/authGuard'
// import { roleHandler } from '../middlewares/roleHandler'

const router = Router()

router.get('/me', authGuard, UserController.getCurrentUser)

//Get all users
// router.get("/", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);

// Get one user
// router.get(
//   "/:id([0-9]+)",
//   [checkJwt, checkRole(["ADMIN"])],
//   UserController.getOneById
// );

//Create a new user
// router.post("/", [checkJwt, checkRole(["ADMIN"])], UserController.newUser);

//Edit one user
// router.patch(
//   "/:id([0-9]+)",
//   [checkJwt, checkRole(["ADMIN"])],
//   UserController.editUser
// );

//Delete one user
// router.delete(
//   "/:id([0-9]+)",
//   [checkJwt, checkRole(["ADMIN"])],
//   UserController.deleteUser
// );

export default router
