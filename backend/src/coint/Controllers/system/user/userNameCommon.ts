import { Request, Response, NextFunction } from "express";
import models from "../../../models";
import { RestResponse } from "../../../common/RestResponse";
import { HTTP400Error } from "../../../common/errors";
import { QueryTypes } from 'sequelize';
import multer from 'multer'
import path from 'path'
import fs, { ReadStream } from 'fs'
import { commonHandlers } from "../../../common/middleware";
import cors from 'cors';
import { RequestError } from "request-promise/errors";

export default [
  {// Select
    path: "/api/v1/user/userName",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const data: [] = await models.sequelize.query(`
        SELECT
          id,
          userName
        from tb_user
        where delYn = 'N'
        ORDER BY id asc
        `,
          {
            type: QueryTypes.SELECT,
            replacements: {
              ...req.query
            }
          },
        )
        RestResponse.Ok(res, data)
      }
    ]
  }
];
