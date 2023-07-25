import { Request, Response, NextFunction } from "express";
import models from "../../../models";
import { RestResponse } from "../../../common/RestResponse";
import { QueryTypes } from "sequelize";
import bcryptjs from "bcryptjs";
const schema = process.env.COINT_SCHEMA

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
          from ${schema}.tb_user
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
          COALESCE(u.userPosition,'') userPosition,
          u.phone,
          u.email,
          u.userGroupId,
          ug.userGroupName,
          u.regUserId,
		      (select userName from ${schema}.tb_user where id = u.regUserId)  as regUserName,
          TO_CHAR(u.regDtm, 'YYYY-MM-DD') as regDtm,
          u.modUserId,
		      (select userName from ${schema}.tb_user where id = u.modUserId)  as modUserName,
          TO_CHAR(u.modDtm, 'YYYY-MM-DD') as modDtm,
          u.delYn
        from ${schema}.tb_user u
        left join ${schema}.tb_user_group ug
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
