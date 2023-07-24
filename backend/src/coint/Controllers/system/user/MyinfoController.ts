import { Request, Response } from "express";
import models from "../../../models";
import { RestResponse } from "../../../common/RestResponse";
import { HTTP400Error } from "../../../common/errors";
import bcryptjs from 'bcryptjs'
import passportjwt from 'passport-jwt'
import jwt from 'jsonwebtoken';
import { getSession } from '../account'
import { QueryTypes } from "sequelize";

export default [
  {
    path: "/api/v1/myinfo",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const session: any = getSession(req);
        const data: [] = await models.sequelize.query(
          `
          SELECT
            u.id
            ,u.loginId
            ,u.userName
            ,u.userDiv
            ,u.userPosition
            ,u.phone
            ,u.email
            ,u.userGroupId
            ,u.delYn
            ,u.regUserId
            ,u.regDtm
            ,u.modUserId
            ,u.modDtm
            ,reguser.userName as regUserName
            ,moduser.userName as modUserName
            ,usergroup.userGroupName
          FROM tb_user u
          LEFT OUTER JOIN tb_user_group usergroup
            ON u.userGroupId = usergroup.id
          LEFT OUTER JOIN tb_user reguser
            ON u.regUserId = reguser.id
          LEFT OUTER JOIN tb_user moduser
            ON u.modUserId = moduser.id
          WHERE u.delYn = :delYn
            AND u.id = :id
          ORDER BY u.id desc
          `, {
          replacements: { delYn: 'N', id: session.id },
          type: QueryTypes.SELECT
        }
        )



        if (data.length === 0) {

          RestResponse.Ok(res, null)
        } else {

          req.user = data

          RestResponse.Ok(res, data.pop())
        }
      }
    ]
  },
  {
    path: "/api/v1/divUser",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const session: any = getSession(req);
        const data: [] = await models.sequelize.query(
          `
          select
            u.id as cd,
            case when userPosition  is not null then userName + ' ' + userPosition
                when userPosition is null then userName
            end
            as name,
            userName
          from tb_user u
          left join tb_account a
          on u.account = a.id
          where account = :id
          and u.delYn != :delYn
          order by u.seq
          `, {
          replacements: { delYn: 'Y', id: session.id },
          type: QueryTypes.SELECT
        }
        )

        if (data.length === 0) {
          RestResponse.Ok(res, null)
        } else {
          RestResponse.Ok(res, data)
        }
      }
    ]
  },
  {
    path: "/api/v1/divUser2",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const session: any = getSession(req);
        const data: [] = await models.sequelize.query(
          `
          select
            case when userDiv like '생산%' then -1 else max(u.id) end cd,
            userDiv as name,
            userDiv as  userName
          from tb_user u
          left join tb_account a
          on u.account = a.id
          where account = :id
          and u.delYn = :delYn
          group by userDiv
          `, {
          replacements: { delYn: 'N', id: session.id },
          type: QueryTypes.SELECT
        }
        )

        if (data.length === 0) {
          RestResponse.Ok(res, null)
        } else {
          RestResponse.Ok(res, data)
        }
      }
    ]
  }
];