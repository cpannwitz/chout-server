import { Router } from 'express'
import auth from './auth'
import user from './user'

const router = Router()

router.get('/', (req: any, res: any) => {
  res.render('index', { title: 'Chout' })
})
router.use('/v1/auth', auth)
router.use('/v1/user', user)

export default router
