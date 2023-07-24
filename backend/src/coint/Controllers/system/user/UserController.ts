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
    path: "/api/v1/base/userCode",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        // execute query
        const data: [] = await models.sequelize.query(
          `
          select 
            id code,
            userName name
          from tb_user
          where delYn = 'N'
          order by id desc
        `,
          { type: QueryTypes.SELECT, replacements: { ...req.query } }
        );
        RestResponse.Ok(res, data);
      },
    ],
  },
  {
    // Select
    path: "/api/v1/base/user",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const data: [] = await models.sequelize.query(
          `
        select
          u.id,
          u.loginId,
          u.loginPw,
          u.userName,
          u.userDiv,
          isnull(u.userPosition,'') userPosition,
          u.phone,
          u.email,
          u.userGroupId,
          ug.userGroupName,
          u.regUserId,
		      (select userName from tb_user where id = u.regUserId)  as regUserName,
          convert(varchar,u.regDtm ,23)regDtm,
          u.modUserId,
		      (select userName from tb_user where id = u.modUserId)  as modUserName,
          convert(varchar,u.modDtm ,23)modDtm,
          u.delYn
        from tb_user u
        left join tb_user_group ug
        on u.userGroupId = ug.id
        where u.delYn = 'N'
        order by u.id asc
        `,
          { type: QueryTypes.SELECT, replacements: { ...req.query } }
        );
        RestResponse.Ok(res, data);
      },
    ],
  },
  {
    path: "/api/v1/base/user",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const salt = bcryptjs.genSaltSync(10);
        const loginPw = bcryptjs.hashSync(req.body.loginPw, salt);
        const tb_user = await models.tb_user.create({
          ...req.body,
          loginPw: loginPw,
          delYn: "N",
          regDtm: new Date(),
        });
        RestResponse.Ok(res, tb_user.id);
      },
    ],
  },
  {
    path: "/api/v1/base/user",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        const salt = bcryptjs.genSaltSync(10);
        const loginPw = bcryptjs.hashSync(req.body.loginPw, salt);
        const tb_user = await models.tb_user.update(
          {
            ...req.body,
            loginPw: loginPw,
          },
          { where: { id: req.body.id } }
        );
        RestResponse.Ok(res, tb_user.id);
      },
    ],
  },
  {
    path: "/api/v1/base/user",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        const tb_user = await models.tb_user.update(
          {
            delYn: "Y",
          },
          { where: { id: req.body.id } }
        );
        RestResponse.Ok(res, tb_user.id);
      },
    ],
  },
];
