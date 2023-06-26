import { Router } from 'express'
import secured from './secured'
import { authenticate } from '@/middlewares/authenticate'

const api = Router()

api.get('/', (req, res) => {
  res.json({ message: 'Hello from router' })
})

api.use('/secured', authenticate, secured)

export default api
