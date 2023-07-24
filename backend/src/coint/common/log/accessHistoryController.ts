import { Request, Response, NextFunction } from "express";
import models from "../../models";
import { RestResponse } from "../RestResponse";

export default [
  {// Insert by Use History
    auth: false,
    path: "/api/v1/accessHistory/:type/",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const curruser = req.user as any
        const data = await models.accessHistory.create({
          ...req.body,
          type: req.params.type
        })
        RestResponse.Ok(res, undefined);
      }
    ]
  }
];