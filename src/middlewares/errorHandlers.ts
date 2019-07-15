import createError from 'http-errors'
import { RequestHandler } from 'express'
import { Request, Response, NextFunction } from 'express'

export function notFoundErrorHandler(req: Request, res: Response, next: NextFunction) {
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

export function finalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err)
  }

  res.status(err.status || 500)
  res.json({ message: err.message, error: err })
}

export function asyncErrorHandler(fn: Function): RequestHandler {
  return function(req, res, next) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next)
  }
}
