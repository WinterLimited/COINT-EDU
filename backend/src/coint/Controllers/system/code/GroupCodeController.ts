import { Request, Response } from 'express';
import models from '../../../models';
import { RestResponse } from '../../../common/RestResponse';
import { HTTP400Error } from '../../../common/errors';
import { QueryTypes } from 'sequelize';
import validator from "validator";
import assert from "assert";
import { CODE } from "../../../models/tb_code";

export default [
  {
    path: '/api/v1/groupcode',
    method: 'post',
    handler: [
      async (req: Request, res: Response) => {
        assert(!validator.isEmpty(String(req.body.cd || '').trim()), 'Group Code is empty')
        assert(!validator.isEmpty(String(req.body.name || '').trim()), 'Group Name is empty')

        const curruser = req.user as any
        let code: any = await models.Code.findOne({ where: { groupCd: '000', cd: req.body.cd } })
        if (code) {
          return RestResponse.Fail(res, 'Code already exists', 400)
        }
        code = await models.Code.create({
          ...req.body,
          groupCd: '000',
          regUserId: req.body.regUserId,
          modUserId: req.body.regUserId,
        })
        RestResponse.Ok(res, code.cd);
      }
    ]
  },
  {
    path: '/api/v1/groupcode',
    method: 'get',
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
            AND code.groupCd = '000'
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
    path: '/api/v1/groupcode/:cd',
    method: 'get',
    handler: [
      async (req: Request, res: Response) => {
        const item: any = await models.Code.findOne({ where: { groupCd: '000', cd: req.params.cd } });
        if (!item) {
          return RestResponse.Ok(res, null)
        } else {
          return RestResponse.Ok(res, item)
        }
      }
    ]
  },
  {
    path: '/api/v1/groupcode/:cd',
    method: 'put',
    handler: [
      async (req: Request, res: Response) => {
        const curruser = req.user as any
        const item = await models.Code.findOne({ where: { groupCd: '000', cd: req.params.cd } });
        if (!item) {
          throw new HTTP400Error('Invalid id');
        }

        if (req.body.delYn !== 'Y') {
          assert(!validator.isEmpty(String(req.params.cd || '').trim()), 'Group Code is empty')
          assert(!validator.isEmpty(String(req.body.name || '').trim()), 'Group Name is empty')
          // update group code
          await models.Code.update({
            groupCd: '000',
            ...req.body,
            cd: req.params.cd,
            modUserId: req.body.modUserId,
            modDtm: new Date(new Date().toUTCString())
          }, { where: { groupCd: '000', cd: req.params.cd } })
          // update codes cascadly
          if (req.body.cd !== req.params.cd) {
            await models.Code.update({
              groupCd: req.body.cd,
              modUserId: req.body.modUserId
            }, { where: { groupCd: req.params.cd } })
          }
        } else {
          // update group code
          await models.Code.update({
            delYn: 'Y',
            modUserId: req.body.modUserId,
            modDtm: new Date(new Date().toUTCString())
          }, { where: { groupCd: '000', cd: req.params.cd } })
          // update codes cascadly
          if (req.body.cd !== req.params.cd) {
            await models.Code.update({
              delYn: 'Y',
              modUserId: req.body.modUserId
            }, { where: { groupCd: req.params.cd } })
          }
        }
        return RestResponse.Ok(res, req.body.cd);
      }
    ]
  },
  {
    path: '/api/v1/groupcode/:cd',
    method: 'delete',
    handler: [
      async (req: Request, res: Response) => {
        const item = await models.Code.findOne({ where: { groupCd: '000', cd: req.params.cd } });
        if (!item) {
          throw new HTTP400Error('Invalid id');
        }

        // delete group code
        await models.Code.destroy({ where: { groupCd: '000', cd: req.params.cd } });
        // delete code cascadly
        await models.Code.destroy({ where: { groupCd: req.params.cd } });
        return RestResponse.Ok(res, req.params.cd);
      }
    ]
  }
];