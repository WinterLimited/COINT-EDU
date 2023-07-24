import { Request, Response, NextFunction } from "express";
import models from "../../models";
import { RestResponse } from "../RestResponse";

export default [
    {// Insert by Use History
        auth: false,
        path: "/api/v1/log/",
        method: "post",
        handler: [
            async (req: Request, res: Response) => {
                const t = await models.sequelize.transaction();
                // console.log('test', req.body)
                const task = await models.requestLog.create(req.body, { transaction: t })
                await t.commit();
                RestResponse.Ok(res, undefined);
            }
        ]
    }
];