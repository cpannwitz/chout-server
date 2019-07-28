import { Router } from 'express'
import auth from './auth'
import user from './user'

import { missingRoute } from './404'
import { pingRoute } from './ping'
import { healthCheck } from './healthCheck'

const router = Router()

router.get('/', (req: any, res: any) => {
  res.render('index', { title: 'Chout' })
})
router.use('/health', healthCheck)
router.use('/ping', pingRoute)
router.use('/v1/auth', auth)
router.use('/v1/user', user)

router.use(missingRoute)

export default router
