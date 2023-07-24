import { Request, Response, NextFunction } from "express";
import models from "../../../models";
import { RestResponse } from "../../../common/RestResponse";
import { HTTP400Error } from "../../../common/errors";
import { QueryTypes } from "sequelize";
import bcryptjs from "bcryptjs";
import validator from "validator";
import assert from "assert";
import multer from "multer";
import path from "path";
import fs, { ReadStream } from "fs";
import { commonHandlers } from "../../../common/middleware";
import cors from "cors";
import { RequestError } from "request-promise/errors";

export default [
  {
    // Select
    path: "/api/v1/base/usergroupCode",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const data: [] = await models.sequelize.query(
          `
        select id as code,userGroupName as name  from tb_user_group where delYn = 'N' order by id asc
        `,
          { type: QueryTypes.SELECT, replacements: { ...req.query } }
        );
        // const data = await models.tb_user_group.findAll({ where: { delYn: 'N' } });
        RestResponse.Ok(res, data);
      },
    ],
  },
  {
    // Select
    path: "/api/v1/base/usergroup",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        // const data: [] = await models.sequelize.query(`
        // select
        //   u.id,
        //   u.loginId,
        //   u.loginPw,
        //   u.userName,
        //   u.userDiv,
        //   u.userPosition,
        //   u.phone,
        //   u.email,
        //   u.userGroupId,
        //   ug.userGroupName,
        //   u.regUserId,
        //   convert(varchar,u.regDtm ,23)regDtm,
        //   u.modUserId,
        //   convert(varchar,u.modDtm ,23)modDtm,
        //   u.delYn
        // from tb_user u
        // left join tb_user_group ug
        // on u.userGroupId = ug.id
        // where u.delYn = 'N'
        // `,
        //   { type: QueryTypes.SELECT, replacements: { ...req.query } },
        // )
        const data = await models.tb_user_group.findAll({
          where: { delYn: "N" },
          order: [["id", "DESC"]],
        });
        RestResponse.Ok(res, data);
      },
    ],
  },
  {
    path: "/api/v1/base/usergroup",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const usergroup = await models.tb_user_group.create({
          ...req.body,
          delYn: "N",
          regDtm: new Date(),
        });
        RestResponse.Ok(res, usergroup.id);
      },
    ],
  },
  {
    path: "/api/v1/base/usergroup",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        const usergroup = await models.tb_user_group.update(
          {
            ...req.body,
          },
          { where: { id: req.body.id } }
        );
        RestResponse.Ok(res, usergroup.id);
      },
    ],
  },
  {
    path: "/api/v1/base/usergroup",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        const usergroup = await models.tb_user_group.update(
          {
            delYn: "Y",
          },
          { where: { id: req.body.id } }
        );
        RestResponse.Ok(res, usergroup.id);
      },
    ],
  },
];
