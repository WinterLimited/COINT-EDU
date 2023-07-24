import { Router } from "express";
import commonHandlers from "./commonHandlers"
import errorHandlers from "./errorHandlers"

type Wrapper = ((router: Router) => void);
const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};

export {
  applyMiddleware,
  commonHandlers,
  errorHandlers,
}