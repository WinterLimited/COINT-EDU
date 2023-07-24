import { HTTPClientError } from "./base"

export class HTTP401Error extends HTTPClientError {
  readonly statusCode = 401;
  constructor(message: string | object = "Unauthorized") {
    super(message);
  }
}