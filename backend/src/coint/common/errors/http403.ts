import { HTTPClientError } from "./base"

export class HTTP403Error extends HTTPClientError {
  readonly statusCode = 403;

  constructor(message: string | object = "Forbidden") {
    super(message);
  }
}