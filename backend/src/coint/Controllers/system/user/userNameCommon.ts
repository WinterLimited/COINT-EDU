import { Request, Response } from "express";
import models from "../../../models";
import { RestResponse } from "../../../common/RestResponse";
import { QueryTypes } from 'sequelize';
const schema = process.env.COINT_SCHEMA


export default [
  {
    path: "/api/v1/user/userName",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const data: [] = await models.sequelize.query(`
        SELECT
          id,
          userName
        FROM ${schema}.tb_user
        WHERE delYn = 'N'
        ORDER BY id ASC
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
