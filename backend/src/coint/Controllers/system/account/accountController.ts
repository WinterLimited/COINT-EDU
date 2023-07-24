import { Request, Response, NextFunction } from "express";
import models from "../../../models";
import { RestResponse } from "../../../common/RestResponse";
import { HTTP400Error } from "../../../common/errors";
import { QueryTypes } from 'sequelize';
import bcryptjs from 'bcryptjs'
import validator from "validator";
import assert from "assert";
import multer from 'multer'
import path from 'path'
import fs, { ReadStream } from 'fs'
import { commonHandlers } from "../../../common/middleware";
import cors from 'cors';
import { RequestError } from "request-promise/errors";

export default [
  {// Insert
    path: "/api/v1/account/account",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        assert(!validator.isEmpty(String(req.body.loginId || '').trim()), '아이디 입력이 올바르지 않습니다.')
        assert(!validator.isEmpty(String(req.body.loginPw || '').trim()), '패스워드 입력이 올바르지 않습니다.')
        assert(!validator.isEmpty(String(req.body.divName || '').trim()), '부서명 입력이 올바르지 않습니다.')
        const curruser = req.user as any
        let account: any = await models.tb_account.findOne({ where: { loginId: req.body.loginId } })
        if (account) {
          return RestResponse.Fail(res, "이미 존재하는 아이디 입니다.", 400)
        }
        const salt = bcryptjs.genSaltSync(10);
        const loginPw = bcryptjs.hashSync(req.body.loginPw, salt);

        const seq = await models.sequelize.query(`exec sp_getMaxSeq 'tb_account'`, { type: QueryTypes.SELECT, replacements: { ...req.query } })

        account = await models.tb_account.create({
          ...req.body,
          loginPw,
          seq: seq[0].seq,
          regUserId: curruser.loginUser,
          modUserId: curruser.loginUser,
          regDtm: new Date(new Date().toUTCString())
        })
        return RestResponse.Ok(res, account.id);
      }
    ]
  },
  {// Select
    path: "/api/v1/account/account",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const data: [] = await models.sequelize.query(`
        select
          *
        from tb_account
        where delYn = 'N'
        ORDER BY seq
        `,
          { type: QueryTypes.SELECT, replacements: { ...req.query } },
        )
        RestResponse.Ok(res, data)
      }

    ]
  },
  {// Select
    path: "/api/v1/account/account/:id",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const data: [] = await models.sequelize.query(`
        select
          *
        from tb_account
        where id = :id
        and delYn = 'N'
        `,
          {
            type: QueryTypes.SELECT,
            replacements: { id: req.params.id, ...req.query }
          },
        )
        if (data.length <= 0) {
          throw new HTTP400Error("Invalid id")
        }
        RestResponse.Ok(res, data.pop())
      }
    ]
  },
  {
    path: "/api/v1/account/account/:id",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        const curruser = req.user as any
        const item = await models.tb_account.findOne({ where: { id: req.params.id } });
        if (!item) {
          throw new HTTP400Error("Invalid id");
        }

        if (req.body.delYn !== 'Y') {
          // assert(!validator.isEmpty(String(req.body.userName || '')), 'UserName is empty')
          const { id, loginPw, ...body } = req.body
          if (loginPw) {
            const salt = bcryptjs.genSaltSync(10);
            const hash = bcryptjs.hashSync(loginPw, salt);
            const cnt = await models.tb_account.update({
              ...body,
              loginPw: hash,
              modUserId: curruser.loginUser,
              modDtm: new Date(new Date().toString())
            }, { where: { id: req.params.id } })
          } else {
            const cnt = await models.tb_account.update({
              ...body,
              modUserId: curruser.loginUser,
              modDtm: new Date(new Date().toString())
            }, { where: { id: req.params.id } })
          }
        } else {
          const cnt = await models.tb_account.update({
            delYn: 'Y',
            modUserId: req.body.modUserId,
            modDtm: new Date(new Date().toString())
          }, { where: { id: req.params.id } })
        }
        return RestResponse.Ok(res, req.params.id);
      }
    ]
  },
  {
    path: "/api/v1/account/seq/:id",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        const seq = await models.sequelize.query(`exec sp_getMaxSeq 'tb_account'`, { type: QueryTypes.SELECT, replacements: { ...req.query } })

        if (req.body.flag === 'up') {
          if (req.body.seq !== 1) {
            await models.sequelize.query(`
              update tb_account set seq = seq + 1 where seq = ${req.body.seq - 1}
              update tb_account set seq = seq - 1 where id = ${req.body.id}
            `, { replacements: { ...req.query }, type: QueryTypes.SELECT });
          }
        } else {
          if (req.body.seq < seq[0].seq - 1) {
            await models.sequelize.query(`
              update tb_account set seq = seq - 1 where seq = ${req.body.seq + 1}
              update tb_account set seq = seq + 1 where id = ${req.body.id}
            `, { replacements: { ...req.query }, type: QueryTypes.SELECT });
          }
        }
        return RestResponse.Ok(res, req.body.id);
      }
    ]
  },
  {// Delete
    path: "/api/v1/account/account/:id",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        const t = await models.sequelize.transaction();
        const cntStep = await models.tb_account.update({ delYn: 1 }, { where: { id: req.params.id } }, { transaction: t })
        await t.commit();
        RestResponse.Ok(res, req.params.id);
      }
    ]
  },
  {// Select
    path: "/api/v1/account/divgroup",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const data: [] = await models.sequelize.query(`
          select
            *
          from tb_user_group
          where 1=1
          ${req.query.delYn === 'YN' ? '' : 'AND delYn = :delYn'}
          ORDER BY id asc
          `, {
          replacements: { delYn: 'N', ...req.query },
          type: QueryTypes.SELECT
        }
        );
        return RestResponse.Ok(res, data)
      }
    ]
  }
];
