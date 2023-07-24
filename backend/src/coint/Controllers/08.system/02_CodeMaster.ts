import { Request, Response, NextFunction } from "express";
import models from "../../models";
import { RestResponse } from "../../common/RestResponse";
import { HTTP400Error } from "../../common/errors";
import { QueryTypes } from "sequelize";
import bcryptjs from "bcryptjs";
import validator from "validator";
import assert from "assert";
import moment from "moment";

export default [
  {
    // Select
    path: "/api/v1/base/codeMasterCode",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        // execute query
        const data: [] = await models.sequelize.query(
          `
            select
              cd_process code,
              nm_process name
            from tb_process where yn_del = 'N'
            order by id
        `,
          { type: QueryTypes.SELECT, replacements: { ...req.query } }
        );
        RestResponse.Ok(res, data);
      },
    ],
  },
  {
    // Select
    path: "/api/v1/base/codeMaster",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        // execute query
        const data: [] = await models.sequelize.query(
          `
          select
            ROW_NUMBER() over(order by (select 1)) as seq,
            *
          from tb_codeMaster
          where yn_del = 'N'
          and id_parent is null      
          and id != 2    
        `,
          { type: QueryTypes.SELECT, replacements: { ...req.query } }
        );
        RestResponse.Ok(res, data);
      },
    ],
  },
  {
    // Select
    path: "/api/v1/base/codeMasterChild",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        // execute query
        const data: [] = await models.sequelize.query(
          `
          select 
            *,
            (select nm_page from tb_codeMaster where id = x.id_parent) nm_page,
            (select nm_code from tb_codeMaster where id = x.id_parent) nm_code 
          from tb_codeMaster x
          where x.yn_del ='N'
          and x.id_parent is not null
        `,
          { type: QueryTypes.SELECT, replacements: { ...req.query } }
        );
        RestResponse.Ok(res, data);
      },
    ],
  },
  {
    path: "/api/v1/base/codeMaster",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const codeMaster = await models.tb_codeMaster.create({
          ...req.body,
          yn_del: "N",
          dt_regist: new Date(),
        });
        RestResponse.Ok(res, codeMaster.id);
      },
    ],
  },
  {
    path: "/api/v1/base/codeMaster",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        const codeMaster = await models.tb_codeMaster.update(
          {
            ...req.body,
          },
          { where: { id: req.body.id } }
        );
        RestResponse.Ok(res, codeMaster.id);
      },
    ],
  },
  {
    path: "/api/v1/base/codeMaster",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        const codeMaster = await models.tb_codeMaster.update(
          {
            yn_del: "Y",
          },
          { where: { id: req.body.id } }
        );
        RestResponse.Ok(res, codeMaster.id);
      },
    ],
  },
];
