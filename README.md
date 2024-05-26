# keq-exception

[![version](https://img.shields.io/npm/v/keq-exception.svg?style=for-the-badge)](https://www.npmjs.com/package/keq-exception)
[![downloads](https://img.shields.io/npm/dm/keq-exception.svg?style=for-the-badge)](https://www.npmjs.com/package/keq-exception)
[![license](https://img.shields.io/npm/l/keq-exception.svg?style=for-the-badge)](https://www.npmjs.com/package/keq-exception)
[![dependencies](https://img.shields.io/librariesio/release/npm/keq-exception?style=for-the-badge)](https://www.npmjs.com/package/keq-exception)
[![codecov](https://img.shields.io/codecov/c/gh/keq-request/keq-exception?logo=codecov&token=HWP4GTMWV8&style=for-the-badge)](https://codecov.io/gh/keq-request/keq-exception)

The keq-exception module is a package that can be used to throw and catch exceptions in keq-request.

## Usage

```typescript
import { request } from "keq";
import {
  throwException,
  catchException,
  RequestException,
} from "keq-exception";

request
  .use(
    catchException((err) => {
      if (err instanceof RequestException) {
        context.redirect("/login");
      }

      context.redirect("/login");
      throw err;
    })
  )
  // Callback will run after `await next()`.
  // This way you can throw errors based on the response body.
  .use(
    throwException(async (ctx) => {
      if (ctx.response && ctx.response.status >= 400) {
        const body = await ctx.response.json();
        throw new RequestException(ctx.response.status, body.message);
      }
    })
  );
```

> The order of keq middleware is important(like an onion).
