import { Router } from 'express'

const api = Router()

api.get('/', (req, res) => {
  res.json({ message: 'hi from decured route' })
})

export default api
