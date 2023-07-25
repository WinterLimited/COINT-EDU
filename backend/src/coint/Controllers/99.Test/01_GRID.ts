import { Request, Response, NextFunction } from "express";
import models from "../../models";
import { RestResponse } from "../../common/RestResponse";

export default [
  {
    // Select
    path: "/api/v1/base/GRID",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const data: [] = await models.tb_GRID.findAll({
          // where: { yn_del: "N" },
          order: [["id"]],
        });
        RestResponse.Ok(res, data);
      },
    ],
  },
  {
    path: "/api/v1/base/GRID",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const GRID = await models.tb_GRID.create({
          ...req.body,
          // yn_del: "N",
          // dt_regist: moment().format("YYYY-MM-DD HH:mm"),
        });
        RestResponse.Ok(res, GRID.id);
      },
    ],
  },
  {
    path: "/api/v1/base/GRID",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        const GRID = await models.tb_GRID.update(
          {
            ...req.body,
          },
          { where: { id: req.body.id } }
        );
        RestResponse.Ok(res, GRID.id);
      },
    ],
  },
  {
    path: "/api/v1/base/GRID",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        const GRID = await models.tb_GRID.update(
          {
            // yn_del: "Y",
          },
          { where: { id: req.body.id } }
        );
        RestResponse.Ok(res, GRID.id);
      },
    ],
  },
];
