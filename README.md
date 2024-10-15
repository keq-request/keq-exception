# keq-exception

[![version](https://img.shields.io/npm/v/keq-exception.svg?style=for-the-badge)](https://www.npmjs.com/package/keq-exception)
[![downloads](https://img.shields.io/npm/dm/keq-exception.svg?style=for-the-badge)](https://www.npmjs.com/package/keq-exception)
[![license](https://img.shields.io/npm/l/keq-exception.svg?style=for-the-badge)](https://www.npmjs.com/package/keq-exception)
[![dependencies](https://img.shields.io/librariesio/release/npm/keq-exception?style=for-the-badge)](https://www.npmjs.com/package/keq-exception)
[![codecov](https://img.shields.io/codecov/c/gh/keq-request/keq-exception?logo=codecov&token=HWP4GTMWV8&style=for-the-badge)](https://codecov.io/gh/keq-request/keq-exception)

[Document EN]: https://keq-request.github.io/guide/libraries/keq-exception
[Document CN]: https://keq-request.github.io/zh/guide/libraries/keq-exception

[**Document**][Document EN] | [**中文文档**][Document CN]

`Middleware` for throwing/catching exceptions. And it can control whether the exception trigger `retry`.

## Usage

<!-- prettier-ignore -->
```typescript
import { request } from "keq"
import {
  throwException,
  catchException,
  RequestException,
} from "keq-exception"

request
  .use(
    catchException((err) => {
      if (err instanceof RequestException && err.code === 401) {
        context.redirect("/login")
        return
      }

      throw err
    })
  )

  // Callback will run after `await next()`.
  // This way you can throw errors based on the response body.
  .use(
    throwException(async (ctx) => {
      if (ctx.response && ctx.response.status >= 400) {
        const body = await ctx.response.json()
        throw new RequestException(ctx.response.status, body.message)
      }
    })
  )
```

### RequestException(statusCode[, errorMessage[, retry]])

| **Parameter** | **Default** | **Description**                              |
| :------------ | :---------- | -------------------------------------------- |
| statusCode    | -           | Error code                                   |
| message       | `''`        | Error message                                |
| retry         | `true`      | Whether the thrown error can trigger a retry |
