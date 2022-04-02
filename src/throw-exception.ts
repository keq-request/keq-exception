import { Middleware, Context } from 'keq'
import { RequestException } from './exception'


export interface ThrowExceptionMiddlewareOptions {
  /**
   * @default 'ctx => ctx.response && ctx.response.status >= 400'
   */
  condition?: (ctx: Context) => boolean | Promise<boolean>
  /**
   * @default 'ctx => ctx.response.status'
   */
  statusCode?: (ctx: Context) => number | Promise<number>
  /**
   * @default 'ctx => ctx.response.text()'
   */
  message?: (ctx: Context) => string | Promise<string>
}

export function throwException(options: ThrowExceptionMiddlewareOptions = {}): Middleware {
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

