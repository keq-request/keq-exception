import { KeqContext, KeqMiddleware } from 'keq'
import { RequestException } from './exception.js'


export type Check = (ctx: KeqContext) => void | Promise<void>

export function throwException(check: Check): KeqMiddleware {
  return async function throwException(ctx, next) {
    const retryOn = typeof ctx.options.retryOn === 'function'
      ? ctx.options.retryOn
      : undefined

    ctx.options.retryOn = async (attempt, error, context) => {
      if (retryOn && await retryOn(attempt, error, context)) {
        return true
      }

      try {
        await check(context)
      } catch (e) {
        if (e instanceof RequestException && e.retry) {
          return true
        }

        return false
      }

      return false
    }

    await next()

    await check(ctx)
  }
}
