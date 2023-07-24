import { Router, Request, Response, NextFunction } from "express";
import controllers from "./controllers"
import passport from 'passport'
import cors from 'cors'

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | void;

type Route = {
  auth?: boolean | undefined;
  path: string;
  method: string;
  handler: Handler | Handler[];
};

const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) {
    const auth: boolean = route.auth === undefined ? true : route.auth;
    const method: string = route.method;
    const path: string = route.path;
    const handler: any = route.handler;

    if (auth) {
      (router as any)[method](path, [passport.authenticate('jwt', { session: false }), ...handler]);
      // (router as any)[method](path, [...handler]);
    } else {
      (router as any)[method](path, [...handler]);
    }
  }
};

export {
  applyRoutes,
  controllers,
}
