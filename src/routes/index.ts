import { Router } from 'express'
import auth from './auth'
import user from './user'

import { missingRoute } from './missingRoute'
import { failingRoute } from './failingRoute'
import { pingRoute } from './pingRoute'

const router = Router()

router.get('/', (req: any, res: any) => {
  res.render('index', { title: 'Chout' })
})
router.use('/ping', pingRoute)
router.use('/v1/auth', auth)
router.use('/v1/user', user)

router.use('/fail', failingRoute)

router.use(missingRoute)

export default router
