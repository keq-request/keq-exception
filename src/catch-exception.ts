import { KeqMiddleware } from 'keq'


export function catchException(handler: (e: unknown) => void): KeqMiddleware {
  return async(ctx, next) => {
    try {
      await next()
    } catch (err) {
      handler(err)
    }
  }
}
