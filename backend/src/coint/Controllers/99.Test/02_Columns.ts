import { Request, Response, NextFunction } from "express";
import models from "../../models";
import { RestResponse } from "../../common/RestResponse";

export default [
  {
    // Select
    path: "/api/v1/base/Columns",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const data: [] = await models.tb_Columns.findAll({
          // where: { yn_del: "N" },
          order: [["id"]],
        });
        RestResponse.Ok(res, data);
      },
    ],
  },
  {
    path: "/api/v1/base/Columns",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const Columns = await models.tb_Columns.create({
          ...req.body,
          // yn_del: "N",
          // dt_regist: moment().format("YYYY-MM-DD HH:mm"),
        });
        RestResponse.Ok(res, Columns.id);
      },
    ],
  },
  {
    path: "/api/v1/base/Columns",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        const Columns = await models.tb_Columns.update(
          {
            ...req.body,
          },
          { where: { id: req.body.id } }
        );
        RestResponse.Ok(res, Columns.id);
      },
    ],
  },
  {
    path: "/api/v1/base/Columns",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        const Columns = await models.tb_Columns.update(
          {
            // yn_del: "Y",
          },
          { where: { id: req.body.id } }
        );
        RestResponse.Ok(res, Columns.id);
      },
    ],
  },
];
