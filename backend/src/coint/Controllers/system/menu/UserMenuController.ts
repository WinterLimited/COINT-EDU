import { Request, Response } from "express";
import models from "../../../models";
import { RestResponse } from "../../../common/RestResponse";
import { HTTP400Error } from "../../../common/errors";
import { QueryTypes } from "sequelize";
const schema = process.env.COINT_SCHEMA

export default [
  {
    path: "/api/v1/usermenu",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const curruser = req.user as any
        const data: [] = await models.sequelize.query(
          `
          select
            id,
            parentId,
            menuName as name,
            menuSname as sname,
            menuPath as path,
            menuIcon as icon
          from ${schema}.tb_menu
          where delYn = 'N'
          and userGroupId >= (select userGroupId from ${schema}.tb_user where id = :userId)
          order by menuOrder
          `, {
          replacements: { ...req.query, userId: curruser.id },
          type: QueryTypes.SELECT
        }
        );
        const menus: any = {}
        let x: any
        for (x of data) {
          menus[x.id] = x
        }
        const roots: any[] = []
        for (x of data) {
          if (!x.parentId) {
            roots.push(x)
          } else {
            const parent = menus[x.parentId]
            if (parent) {
              if (!parent.children) {
                parent.children = []
              }
              parent.children.push(x)
            }
          }
        }
        return RestResponse.Ok(res, roots)
      }
    ]
  },
  {
    path: "/api/v1/usermenu_insert",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const curruser = req.user as any
        let idx = 0
        for (const x of req.body) {
          idx += 1
          if (x.path) {
            const path = x.path.trim()
            if (!path.endsWith('/')) {
              x.path = path + "/"
            }
          }
          const parent = await models.Menu.upsert({
            id: idx,
            parentId: null,
            menuName: x.name,
            menuPath: x.path || null,
            menuIcon: x.icon,
            menuOrder: idx,
            regUserId: curruser.id,
            modUserId: curruser.id,
          })
          await models.UserMenu.upsert({
            id: idx,
            userGroupId: 1,
            menuId: idx,
            regUserId: curruser.id,
            modUserId: curruser.id,
          })
          const parentId = idx

          for (const c of x.children || []) {
            idx += 1
            if (c.path) {
              const path = c.path.trim()
              if (!path.endsWith('/')) {
                c.path = path + "/"
              }
            }
            const menu = await models.Menu.upsert({
              id: idx,
              parentId,
              menuName: c.name,
              menuPath: c.path,
              menuIcon: null,
              menuOrder: idx,
              regUserId: curruser.id,
              modUserId: curruser.id,
            })
            await models.UserMenu.upsert({
              id: idx,
              userGroupId: 1,
              menuId: idx,
              regUserId: curruser.id,
              modUserId: curruser.id,
            })
          }
        }
        return RestResponse.Ok(res, 'OK')
      }
    ]
  }
];