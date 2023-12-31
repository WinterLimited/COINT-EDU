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
    path: "/api/v1/base/menuReg",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        // execute query
        console.log("reqaaaaa");
        console.log(req.body);
        const data: [] = await models.sequelize.query(
          `
          select
            *
          from tb_menu x
          where x.delYn ='N'
          and x.parentId is null
          order by x.menuOrder
        `,
          { type: QueryTypes.SELECT, replacements: { ...req.query } }
        );
        RestResponse.Ok(res, data);
      },
    ],
  },
  {
    // Select
    path: "/api/v1/base/menuRegChild",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        // execute query
        const data: [] = await models.sequelize.query(
          `
          select
            *
          from tb_menu x
          where x.delYn ='N'
          and x.parentId is not null
          order by x.menuOrder
        `,
          { type: QueryTypes.SELECT, replacements: { ...req.query } }
        );
        RestResponse.Ok(res, data);
      },
    ],
  },
  {
    // Select
    path: "/api/v1/base/menuRegPopup",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        // execute query
        const data: [] = await models.sequelize.query(
          `
          select
            menuName
          from tb_menu x
          where x.delYn ='N'
          and x.parentId is null
          order by x.parentId
        `,
          { type: QueryTypes.SELECT, replacements: { ...req.query } }
        );
        RestResponse.Ok(res, data);
      },
    ],
  },
  {
    auth: false,
    path: "/api/v1/base/menuReg",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const menu = await models.tb_menu.create({
          ...req.body,
          delYn: "N",
          modUserId: 4,
          regUserId: 4,
          userGroupId: 1,
          regDtm: moment().format("YYYY-MM-DD HH:mm"),
        });
        RestResponse.Ok(res, menu.id);
      },
    ],
  },
  {
    path: "/api/v1/base/menuReg",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        const menu = await models.tb_menu.update(
          {
            ...req.body,
          },
          { where: { id: req.body.id } }
        );
        RestResponse.Ok(res, menu.id);
      },
    ],
  },
  {
    path: "/api/v1/base/menuReg",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        const menu = await models.tb_menu.update(
          {
            delYn: "Y",
          },
          { where: { id: req.body.id } }
        );
        RestResponse.Ok(res, menu.id);
      },
    ],
  },
];
