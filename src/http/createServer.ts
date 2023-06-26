import express, { Application, Response, NextFunction, Request } from 'express'
import * as http from 'http'
import { promisify } from 'util'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes'

export type Server = {
  start(): Promise<void>
  stop(): Promise<void>
}

const BASE_PATH = '/api/v1'
const PORT = 8080
const HOST = 'localhost'

export const createServer = (): Server => {
  const app: Application = express()

  app.set('etag', false)
  app.set('trust proxy', true)
  app.disable('x-powered-by')

  app.use((_, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, Content-Length, Authorization')

    next()
  })

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan('dev'))
  app.use(BASE_PATH, router)

  app.get('/health', (_, res: Response) => {
    res.json({ message: 'ok' }).status(200)
  })

  const httpServer = http.createServer(app)

  return {
    start: async () => {
      await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))
      console.log(`🚀 Server ready at http://${HOST}:${PORT}${BASE_PATH}`)
    },
    stop: async () => {
      await promisify(httpServer.close).bind(httpServer)()
    },
  }
}
