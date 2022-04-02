import { CustomError } from 'ts-custom-error'

export class RequestException extends CustomError {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)

    this.statusCode = statusCode

    Object.defineProperty(this, 'name', { value: 'RequestException' })
  }
}
