import { Request, Response } from "express";
import models from "../../../models";
import { RestResponse } from "../../../common/RestResponse";
import { HTTP400Error } from "../../../common/errors";
import { QueryTypes } from "sequelize";
import validator from "validator";
import assert from "assert";

export default [
  {
    path: "/api/v1/menu",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const menu = await models.tb_menu.create({
          ...req.body,
          delYn: "N",
        });
        return RestResponse.Ok(res, menu.id);
      },
    ],
  },

  {
    path: "/api/v1/menucode",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const data: [] = await models.sequelize.query(
          `
          SELECT id as code ,menuname as name from tb_menu where parentId is null and delYn = :delYn order by [menuOrder] asc
          `,
          {
            replacements: { delYn: "N", ...req.query },
            type: QueryTypes.SELECT,
            // ${req.query.delYn === 'YN' ? '' : 'AND menu.delYn = :delYn'}
          }
        );

        return RestResponse.Ok(res, data);
      },
    ],
  },
  {
    path: "/api/v1/menu",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const data: [] = await models.sequelize.query(
          `
          SELECT menu.id
          , menu.parentId
          , menu.menuName
          , menu.menuPath
          , menu.menuIcon
          , menu.menuOrder
          , menu.delYn
          , menu.userGroupId
          , menu.regUserId
          , menu.regDtm
          , menu.modUserId
          , menu.modDtm
          , menu.menuSname
          , reguser.userName as regUserName
          , moduser.userName as modUserName
          , parentmenu.menuName as parentName
          , (select userGroupName from tb_user_group where id = menu.userGroupId) userGroupName
        FROM tb_menu menu
        LEFT OUTER JOIN tb_menu parentmenu
          ON parentmenu.id = menu.parentId
        LEFT OUTER JOIN tb_user reguser
          ON reguser.id = menu.regUserId
        LEFT OUTER JOIN tb_user moduser
          ON moduser.id = menu.modUserId
        WHERE 1=1

        ORDER BY menu.menuOrder asc
          `,
          {
            replacements: { delYn: "N", ...req.query },
            type: QueryTypes.SELECT,
            // ${req.query.delYn === 'YN' ? '' : 'AND menu.delYn = :delYn'}
          }
        );
        const menus: any = {};
        let x: any;
        for (x of data) {
          menus[x.id] = x;
        }
        if (req.query.hierarchy === "Y") {
          // if (true) {
          const roots: any[] = [];
          for (x of data) {
            if (!x.parentId) {
              roots.push(x);
            } else {
              const parent = menus[x.parentId];
              if (parent) {
                if (!parent.children) {
                  parent.children = [];
                }
                parent.children.push(x);
              }
            }
          }
          return RestResponse.Ok(res, roots);
        } else {
          return RestResponse.Ok(res, data);
        }
      },
    ],
  },
  {
    path: "/api/v1/menu",
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
    path: "/api/v1/menu/:id",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const data: [] = await models.sequelize.query(
          `
          SELECT menu.id
            , menu.parentId
            , menu.menuName
            , menu.menuPath
            , menu.menuIcon
            , menu.menuOrder
            , menu.delYn
            , menu.regUserId
            , menu.userGroupId
            , menu.menuAccount
            , menu.regDtm
            , menu.modUserId
            , menu.modDtm
            , menu.menuSname
            , reguser.userName as regUserName
            , moduser.userName as modUserName
            , parentmenu.menuName as parentName
          FROM tb_menu menu
          LEFT OUTER JOIN tb_menu parentmenu
            ON parentmenu.id = menu.parentId
          LEFT OUTER JOIN tb_user reguser
            ON reguser.id = menu.regUserId
          LEFT OUTER JOIN tb_user moduser
            ON moduser.id = menu.modUserId
          WHERE menu.id = :id
          `,
          {
            replacements: { id: req.params.id },
            type: QueryTypes.SELECT,
          }
        );
        if (data.length <= 0) {
          throw new HTTP400Error("Invalid id");
        }
        return RestResponse.Ok(res, data.pop());
      },
    ],
  },
  {
    path: "/api/v1/menu/:id",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        const curruser = req.user as any;
        const item = await models.tb_menu.findOne({
          where: { id: req.params.id },
        });
        if (!item) {
          throw new HTTP400Error("Invalid id");
        }

        if (req.body.delYn !== "Y") {
          assert(
            !validator.isEmpty(String(req.body.menuName || "").trim()),
            "Menu Name is empty"
          );
          const { id, ...body } = req.body;
          await models.tb_menu.update(
            {
              ...body,
              modUserId: curruser.id,
              modDtm: new Date(new Date().toUTCString()),
            },
            { where: { id: req.params.id } }
          );
        } else {
          await models.tb_menu.update(
            {
              delYn: "Y",
              modUserId: curruser.id,
              modDtm: new Date(new Date().toUTCString()),
            },
            { where: { id: req.params.id } }
          );
        }
        return RestResponse.Ok(res, req.params.id);
      },
    ],
  },
  {
    path: "/api/v1/menu/:id",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        const item = await models.tb_menu.findOne({
          where: { id: req.params.id },
        });
        if (!item) {
          throw new HTTP400Error("Invalid id");
        }

        await models.tb_menu.destroy({ where: { id: req.params.id } });
        return RestResponse.Ok(res, req.params.id);
      },
    ],
  },
];
