# keq-exception

[![version](https://img.shields.io/npm/v/keq-exception.svg?style=flat-square)](https://www.npmjs.com/package/keq-exception)
[![downloads](https://img.shields.io/npm/dm/keq-exception.svg?style=flat-square)](https://www.npmjs.com/package/keq-exception)
[![license](https://img.shields.io/npm/l/keq-exception.svg?style=flat-square)](https://www.npmjs.com/package/keq-exception)
[![dependencies](https://img.shields.io/librariesio/github/keq-request/keq-exception.svg?style=flat-square)](https://www.npmjs.com/package/keq-exception)
[![coveralls](https://img.shields.io/coveralls/github/keq-request/keq-exception.svg?style=flat-square)](https://coveralls.io/github/keq-request/keq-exception)



<!-- description -->
The keq-exception module is a package that can be used to throw and catch exceptions in keq-request.
<!-- description -->

## Usage

<!-- usage -->
```typescript
import { request } from 'keq'
import { throwException, catchException, RequestException } from 'keq-exception'


request
  .use(catchException(err => {
    if (err instanceof RequestException) {
      context.redirect('/login')
    }

    context.redirect('/login')
    throw err
  }))
  .use(throwException({
    // there is the default options
    // wether or not to redirect to throw request exception
    condition: () => ctx => ctx.response && ctx.response.status >= 400,
    // the status code of request exception
    statusCode: ctx => ctx.response.status,
    // the message of request exception
    message: ctx => ctx.response.text(),
  }))
```

> The order of keq middleware is important(like an onion).
<!-- usage -->

<!-- addition --><!-- addition -->


## Contributing & Development

If there is any doubt, it is very welcome to discuss the issue together.
Please read [Contributor Covenant Code of Conduct](.github/CODE_OF_CONDUCT.md) and [CONTRIBUTING](.github/CONTRIBUTING.md).
