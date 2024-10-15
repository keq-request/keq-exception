import { expect, test } from '@jest/globals'
import { throwException } from './throw-exception.js'
import { RequestException } from './exception.js'
import { KeqContext } from 'keq'


test('throw exception', async () => {
  const context = {
    request: {
      url: new URL('https://example.com'),
      method: 'get',
      headers: new Headers(),
      routeParams: {},
      body: {},
    },
    options: {},
    res: new Response('{ "message": "Bad Request" }', {
      status: 400,
      statusText: 'Bad Request',
      headers: new Headers(),
    }),
    get response() {
      return context.res?.clone()
    },
    global: {},
    output: '',
    abort() {

    },
  } as unknown as KeqContext

  const middleware = throwException(async (ctx) => {
    if (ctx.response && ctx.response.status >= 400) {
      const body = await ctx.response.json()
      throw new RequestException(ctx.response.status, body)
    }
  })
  expect(middleware(context, () => {})).rejects.toThrow(RequestException)
})
