import { Request, Response, NextFunction } from 'express'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthenticated' })
  }

  const [, token] = authorization.split(' ')

  if (token !== 'Coinhouse') {
    return res.status(401).json({ message: 'Unauthenticated' })
  }

  next()
}
