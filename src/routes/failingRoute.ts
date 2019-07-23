import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import logger from '../services/logger'

export function failingRoute(req: Request, res: Response, next: NextFunction) {
  try {
    throw new Error('shit what!!!')
  } catch (error) {
    logger.error(error)
    res.status(500).json(error)
  }
  // throw new Error('shit what!!!')
  // res.status(404).format({
  //   html: () => {
  //     res.render('404', { url: req.url })
  //   },

  //   json: () => {
  //     res.json(createError(404))
  //   },
  //   default: () => {
  //     res.send(`404: Requested resource not found.`)
  //   }
  // })
}
