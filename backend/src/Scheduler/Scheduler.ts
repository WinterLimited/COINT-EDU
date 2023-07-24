import schedule from 'node-schedule'
import { Request, Response, NextFunction } from "express";
import models from "../coint/models";
import { RestResponse } from "../coint/common/RestResponse";
import { HTTP400Error } from "../coint/common/errors";
import { QueryTypes } from 'sequelize';




export default {
  scheduler() {
    // */2 * * * *
    const sc = schedule.scheduleJob('0 0/3 * * * ?',async ()=>{
      console.log('schedule start')
      // async (req: Request, res: Response) => {
        const data: [] = await models.sequelize.query(`
        `,
        { type: QueryTypes.SELECT },
        )
      //   RestResponse.Ok(res,data)
        console.log(data)
      // }
      console.log('schedule end')
    })
  }
}




