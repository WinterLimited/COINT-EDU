import { Router } from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
import passport from 'passport';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../../resources/swagger.json";

const handleCors = (router: Router) => {
  router.use(cors({ credentials: true, origin: true }));
}

const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

const handleCompression = (router: Router) => {
  router.use(compression());
};

const handleAPIDocs = (router: Router) => {
  router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

const handlePassport = (router: Router) => {
  router.use(passport.initialize());
}

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handlePassport,
  handleAPIDocs,
]
