import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'

export function missingRoute(req: Request, res: Response, next: NextFunction) {
  res.status(404).format({
    html: () => {
      res.render('404', { url: req.url })
    },

    json: () => {
      res.json(createError(404))
    },
    default: () => {
      res.send(`404: Requested resource not found.`)
    }
  })
}
