import { Router } from 'express'
import secured from './secured'
import { authenticate } from '@/http/middlewares/authenticate'

const api = Router()

api.use('/', secured)

export default secured
