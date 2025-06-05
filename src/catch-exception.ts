import { KeqMiddleware } from 'keq'


export function catchException(handler: (e: unknown) => void | Promise<void>): KeqMiddleware {
  return async function catchException(ctx, next) {
    try {
      await next()
    } catch (err) {
      await handler(err)
    }
  }
}
