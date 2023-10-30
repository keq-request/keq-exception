import { KeqContext, KeqMiddleware } from 'keq'
import { RequestException } from './exception'


export interface ThrowExceptionKeqMiddlewareOptions {
  /**
   * @default 'ctx => ctx.response && ctx.response.status >= 400'
   */
  condition?: (ctx: KeqContext) => boolean | Promise<boolean>
  /**
   * @default 'ctx => ctx.response.status'
   */
  statusCode?: (ctx: KeqContext) => number | Promise<number>
  /**
   * @default 'ctx => ctx.response.text()'
   */
  message?: (ctx: KeqContext) => string | Promise<string>
}

export function throwException(options: ThrowExceptionKeqMiddlewareOptions = {}): KeqMiddleware {
  const {
    condition = ctx => (ctx.response && ctx.response.status >= 400) as boolean,
    statusCode = ctx => (ctx.response?.status ?? 500),
    message = ctx => (ctx.response?.text() ?? 'exception') as Promise<string>,
  } = options

  return async(ctx, next) => {
    await next()

    if (condition(ctx)) {
      throw new RequestException(await statusCode(ctx), await message(ctx))
    }
  }
}

