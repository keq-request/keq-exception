import { Middleware } from 'keq'


export function catchException(handler: (e: unknown) => void): Middleware {
  return async(ctx, next) => {
    try {
      await next()
    } catch (err) {
      handler(err)
    }
  }
}
