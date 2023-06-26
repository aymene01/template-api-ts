import { createServer } from '@/http/createServer'

type Signal = 'SIGINT' | 'SIGTERM'

export const waitForSignal = (signals: Signal[]): Promise<string> =>
  new Promise(resolve => {
    signals.forEach(signal => {
      process.on(signal, () => resolve(signal))
    })
  })

const api = async () => {
  const server = createServer()

  await server.start()
  await waitForSignal(['SIGINT', 'SIGTERM'])
  await server.stop()
}

api().catch(err => {
  console.log(err)
  process.exit(0)
})
