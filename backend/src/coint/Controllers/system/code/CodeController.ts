import { Request, Response } from "express";
import models from "../../../models";
import { RestResponse } from "../../../common/RestResponse";
import { HTTP400Error } from "../../../common/errors";
import { QueryTypes } from "sequelize";
import validator from "validator";
import assert from "assert";
import { CODE } from "../../../models/tb_code";

export default [
  {
    path: "/api/v1/code/:groupCd",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        assert(!validator.isEmpty(String(req.params.groupCd || '').trim()), 'Group Code is empty')
        assert(!validator.isEmpty(String(req.body.cd || '').trim()), 'Code is empty')
        assert(!validator.isEmpty(String(req.body.name || '').trim()), 'Name is empty')
        // assert(!validator.isEmpty(String(req.body.order || '').trim()), 'Order is empty')
        const curruser = req.user as any
        if (req.params.groupCd === '000') {
          return RestResponse.Fail(res, 'Code \'000\' is reserved for the system', 400);
        }
        let code: any = await models.Code.findOne({ where: { groupCd: req.params.groupCd, cd: req.body.cd } })
        if (code) {
          return RestResponse.Fail(res, "Code already exists", 400)
        }
        const groupcode: any = await models.Code.findOne({ where: { groupCd: "000", cd: req.params.groupCd } })
        if (!groupcode) {
          return RestResponse.Fail(res, `Invalid Group Code`, 400);
        }
        code = await models.Code.create({
          ...req.body,
          groupCd: req.params.groupCd,
          regUserId: curruser.loginUser,
          modUserId: curruser.loginUser,
        })
        return RestResponse.Ok(res, code.cd);
      }
    ]
  },
  {
    path: "/api/v1/code",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const data: [] = await models.sequelize.query(
          `
          SELECT code.*
            , reguser.userName as regUserName
            , moduser.userName as modUserName
          FROM tb_code code
          LEFT OUTER JOIN tb_user reguser
            ON reguser.id = code.regUserId
          LEFT OUTER JOIN tb_user moduser
            ON moduser.id = code.modUserId
          WHERE 1=1
            ${req.query.groupCd !== undefined ? 'AND code.groupCd = :groupCd' : ''}
            ${req.query.cd !== undefined ? 'AND code.cd = :cd' : ''}
            ${req.query.delYn === 'YN' ? '' : 'AND code.delYn = :delYn'}
          ORDER BY code.[order] ASC, code.cd ASC
          `, {
          replacements: { delYn: 'N', ...req.query },
          type: QueryTypes.SELECT
        }
        );
        return RestResponse.Ok(res, data)
      }
    ]
  },
  {
    path: "/api/v1/code/groupCd",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const data: [] = await models.sequelize.query(
          `
          SELECT code.*
            , reguser.userName as regUserName
            , moduser.userName as modUserName
          FROM tb_code code
          LEFT OUTER JOIN tb_user reguser
            ON reguser.id = code.regUserId
          LEFT OUTER JOIN tb_user moduser
            ON moduser.id = code.modUserId
          WHERE 1=1
            AND code.groupCd = :groupCd
            AND code.delYn = 'N'
          ORDER BY code.[order] ASC, code.cd ASC
          `, {
          replacements: {
            groupCd: req.query[0],
            ...req.query
          },
          type: QueryTypes.SELECT
        }
        );
        return RestResponse.Ok(res, data)
      }
    ]
  },
  {
    path: "/api/v1/code/:groupCd/:cd",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const item: any = await models.Code.findOne({ where: { groupCd: req.params.groupCd, cd: req.params.cd } });
        if (!item) {
          return RestResponse.Ok(res, null)
        }
        return RestResponse.Ok(res, item)
      }
    ]
  },
  {
    path: "/api/v1/code/:groupCd/:cd",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        const curruser = req.user as any
        if (req.params.groupCd === '000') {
          return RestResponse.Fail(res, 'Invalid groupCd: use groupcode api', 400);
        }
        if (req.body.groupCd === '000') {
          return RestResponse.Fail(res, 'Code \'000\' is reserved for the system', 400);
        }
        const item = await models.Code.findOne({ where: { groupCd: req.params.groupCd, cd: req.params.cd } });
        if (!item) {
          throw new HTTP400Error("Invalid id");
        }
        const groupcode: any = await models.Code.findOne({ where: { groupCd: "000", cd: req.body.groupCd } })
        if (!groupcode) {
          return RestResponse.Fail(res, `Invalid Group Code`, 400);
        }
        if (req.body.delYn !== 'Y') {
          assert(!validator.isEmpty(String(req.params.groupCd || '').trim()), 'Group Code is empty')
          assert(!validator.isEmpty(String(req.params.cd || '').trim()), 'Code is empty')
          assert(!validator.isEmpty(String(req.body.name || '').trim()), 'Code Name is empty')
          // assert(!validator.isEmpty(String(req.body.order || '').trim()), 'Order is empty')
          await models.Code.update({
            ...req.body,
            groupCd: req.params.groupCd,
            cd: req.params.cd,
            modUserId: req.body.modUserId,
            modDtm: new Date(new Date().toUTCString())
          }, { where: { groupCd: req.params.groupCd, cd: req.params.cd } })
        } else {
          await models.Code.update({
            delYn: 'Y',
            modUserId: req.body.modUserId,
            modDtm: new Date(new Date().toUTCString())
          }, { where: { groupCd: req.params.groupCd, cd: req.params.cd } })
        }
        return RestResponse.Ok(res, req.body.cd);
      }
    ]
  },
  {
    path: "/api/v1/code/:groupCd/:cd",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        if (req.params.groupCd === '000') {
          return RestResponse.Fail(res, 'Invalid groupCd: use groupcode api', 400);
        }
        const item = await models.Code.findOne({ where: { groupCd: req.params.groupCd, cd: req.params.cd } });
        if (!item) {
          throw new HTTP400Error("Invalid id");
        }

        await models.Code.destroy({ where: { groupCd: req.params.groupCd, cd: req.params.cd } });
        return RestResponse.Ok(res, req.params.cd);
      }
    ]
  }
];