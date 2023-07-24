import { Request, Response } from "express";
import models from "../../models";
import { RestResponse } from "../../common/RestResponse";
import { HTTP400Error } from "../../common/errors";
import { Op, QueryTypes, Sequelize } from "sequelize";
import validator from "validator";
import assert from "assert";
// import { CODE } from "../../../models/tb_code";


function convertDataType(value: string, type: string) {
    let insertValue = value.trim()
    let retunvalue = undefined
    switch (type) {
        case 'int':
            retunvalue = Number(insertValue)
            break;
        case 'string':
            retunvalue = String(insertValue)
            break
        case 'flaot':
            retunvalue = Number(insertValue)
            break
        case 'date':
        case 'datetime':
            retunvalue = new Date(insertValue)
            break
        case 'boolearn':
        case 'bool':
            switch (insertValue) {
                case '1':
                case 'true':
                case 'TRUE':
                    retunvalue = true
                    break;
                case '0':
                case 'false':
                case 'FALSE':
                    retunvalue = false
                    break;
                default:
                    retunvalue = Boolean(insertValue)
                    break;
            }
            break

        default:
            break;
    }
    return retunvalue
}

export default [
    {
        auth: false,
        path: "/api/v1/columnBuilder/getPages",
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                const t = await models.sequelize.transaction()
                const parent = await models.tb_menu.findAll({
                    where: {
                        parentId: {
                            [Op.is]: null,
                        }, delYn: 'N'
                    },
                    order: [['parentId', 'ASC'], ['id', 'ASC']]
                }, { transaction: t })
                const child = await models.tb_menu.findAll({
                    where: {
                        menuPath: {
                            [Op.not]: null,
                        }, delYn: 'N'
                    },
                    order: [['parentId', 'ASC'], ['id', 'ASC']]
                }, { transaction: t })
                await t.commit();
                let pages = {
                    parent: parent,
                    child: child
                }
                return RestResponse.Ok(res, pages);
            }
        ]
    },

    {
        auth: false,
        path: "/api/v1/columnBuilder/getGrids",
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                // req.params.menuId
                console.log(req.query)
                const t = await models.sequelize.transaction()
                // const pages = await models.tb_menu.findOne({
                //     where: {
                //         id: req.query.menuId,
                //         // menuPath: {
                //         //     [Op.not]: null,
                //         // }, 
                //         delYn: 'N'
                //     },
                //     order: [['parentId', 'ASC'], ['id', 'ASC']]
                // }, { transaction: t })
                const grids = await models.tb_grids.findAll({
                    include: [
                        {
                            model: models.tb_menu,
                            attributes: ['menuName'],
                            association: 'menu',
                            where:
                            {
                                delYn: 'N'
                            },
                            required: false
                        }
                    ],
                    where: { menuId: req.query.menuId, yn_del: 'N' },
                    order: [['id', 'ASC']]
                }, { transaction: t })
                // console.log('===============\n', grids)
                for (const key in grids) {
                    if (Object.prototype.hasOwnProperty.call(grids, key)) {
                        const element = grids[key];
                        element.dataValues.menuName = element.dataValues.menu.menuName
                    }
                }

                await t.commit();
                return RestResponse.Ok(res, grids);
            }
        ]
    },
    {
        auth: false,
        path: "/api/v1/columnBuilder/getGridOptions",
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                // req.params.menuId
                console.log(req.query)
                const t = await models.sequelize.transaction()
                const columns = await models.tb_gridsColumn.findAll({
                    include: [
                        {
                            model: models.tb_valueType,
                            attributes: ['valueTypeName'],
                            association: 'vt',
                            where:
                            {
                                yn_del: 'N'
                            },
                            required: false
                        }
                    ],
                    where: {
                        grdId: req.query.grdId
                        , yn_del: 'N'
                    },
                    order: [['id', 'DESC']]

                }, { transaction: t })
                // console.log('===============\n', grids)
                // for (const key in grids) {
                //     if (Object.prototype.hasOwnProperty.call(grids, key)) {
                //         const element = grids[key];
                //         element.dataValues.menuName = element.dataValues.menu.menuName
                //     }
                // }

                await t.commit();
                return RestResponse.Ok(res, columns);
            }
        ]
    },
    {
        auth: false,
        path: "/api/v1/columnBuilder/test",
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                // req.params.menuId
                console.log(req.query)
                const tblname = 'tb_gridsColumn'
                const t = await models.sequelize.transaction()
                const columns = await models[tblname].findAll({
                    include: [
                        {
                            model: models.tb_valueType,
                            attributes: ['valueTypeName'],
                            association: 'vt',
                            where:
                            {
                                yn_del: 'N'
                            },
                            required: false
                        }
                    ],
                    attributes: {

                        include: [[Sequelize.literal(`CASE WHEN [${tblname}].parentId is null THEN [${tblname}].id ELSE [${tblname}].parentId END`), 'orderId']],
                    }
                    ,
                    where: {
                        grdId: req.query.grdId
                        , yn_del: 'N'
                    },
                    order: [['id', 'DESC']]

                }, { transaction: t })
                // console.log('===============\n', grids)
                // for (const key in grids) {
                //     if (Object.prototype.hasOwnProperty.call(grids, key)) {
                //         const element = grids[key];
                //         element.dataValues.menuName = element.dataValues.menu.menuName
                //     }
                // }

                await t.commit();
                return RestResponse.Ok(res, columns);
            }
        ]
    },
    {
        auth: false,
        path: "/api/v1/columnBuilder/getPageInfo",
        method: "post",
        handler: [
            async (req: Request, res: Response) => {
                const t = await models.sequelize.transaction()
                const menu = await models.tb_menu.findOne({
                    where: { menuPath: req.body.path, delYn: 'N' },
                    order: [['id', 'DESC']]
                }, { transaction: t })

                let menuId = menu.id
                //menu.parentId ? menu.parentId : menu.id
                const grids = await models.tb_grids.findAll({
                    where: { menuId: menuId, yn_del: 'N' },
                    order: [['id', 'ASC']]
                }, { transaction: t })

                for (const key in grids) {
                    if (Object.prototype.hasOwnProperty.call(grids, key)) {
                        const grid = grids[key];

                        const columns = await models.tb_gridsColumn.findAll({
                            include: [
                                {
                                    model: models.tb_valueType,
                                    attributes: ['valueTypeName'],
                                    association: 'vt',
                                    where:
                                    {
                                        yn_del: 'N'
                                    },
                                    required: false
                                }
                            ],
                            where: {
                                grdId: grid.parentId ? grid.parentId : grid.id
                                , yn_del: 'N'
                            },
                            order: [['id', 'DESC']]

                        }, { transaction: t })
                        let jsonobj: any = []
                        for (const columnkey in columns) {
                            if (Object.prototype.hasOwnProperty.call(columns, columnkey)) {
                                const column = columns[columnkey];
                                let text = convertDataType(column.text, column.vt.valueTypeName)

                                let colOptions: any = {
                                    text: text,
                                    value: column.columnName,
                                    colidx: column.columnIdx
                                }
                                // console.log('=====================\n', column.id)
                                const columnOption = await models.tb_gridsColumnOption.findAll({
                                    include: [
                                        {
                                            model: models.tb_valueType,
                                            attributes: ['valueTypeName'],
                                            association: 'vt',
                                            where:
                                            {
                                                yn_del: 'N'
                                            },
                                            required: false
                                        }
                                    ],
                                    where: {
                                        grdColId: column.parentId ? column.parentId : column.id
                                        , yn_del: 'N'
                                    },
                                    order: [['id', 'DESC']]

                                }, { transaction: t })
                                for (const coloptkey in columnOption) {
                                    if (Object.prototype.hasOwnProperty.call(columnOption, coloptkey)) {
                                        const opt = columnOption[coloptkey]
                                        // console.log('---------------\n', opt)
                                        let optValue = convertDataType(opt.value, opt.vt.valueTypeName)
                                        // console.log(optValue)
                                        let optName = opt.paramName
                                        colOptions[optName] = optValue
                                    }
                                }
                                // console.log('---------------\n', columnOption)
                                jsonobj.push(colOptions)
                                //[columnname] = 
                            }
                        }
                        grid.dataValues.gridColumn = jsonobj
                        grid.dataValues.gridColumn.sort((a: any, b: any) => {
                            // console.log('===============\n', a.colidx, b.colidx)
                            return a.colidx - b.colidx
                        })
                    }

                }

                await t.commit();

                return RestResponse.Ok(res, grids)
            }
        ]
    },
];