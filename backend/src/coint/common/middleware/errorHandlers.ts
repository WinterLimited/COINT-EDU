import { Request, Response, NextFunction, Router } from "express";
import { HTTPClientError, HTTP404Error } from "../errors";
import { RestResponse } from "../RestResponse";
import { ValidationError } from 'sequelize'

const handle404Error = (router: Router) => {
  router.use((req: Request, res: Response) => {
    throw new HTTP404Error("Method not found.");
  });
};

const handleClientError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HTTPClientError) {
      console.warn(err);
      RestResponse.Fail(res, err.message, err.statusCode);
    } else if (err instanceof ValidationError) {
      console.warn(err);
      RestResponse.Fail(res, err.message, 400);
    } else {
      next(err);
    }

  });
};

const handleServerError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (process.env.NODE_ENV === "production") {
      RestResponse.Fail(res, "Internal Server Error", 500);
    } else {
      RestResponse.Fail(res, err.stack, 500);
    }
  });
};

export default [handle404Error, handleClientError, handleServerError];