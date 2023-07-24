import { Request, Response, NextFunction } from "express";
import models from "../models";
import { RestResponse } from "../common/RestResponse";
import { HTTP400Error } from "../common/errors";
import { QueryTypes } from 'sequelize';
import multer from 'multer'
import path from 'path'
import fs, { ReadStream } from 'fs'
import { commonHandlers } from "../common/middleware";
import cors from 'cors';
import { RequestError } from "request-promise/errors";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { uuid, fromString } from "uuidv4"; // if you get an error on this line, run 'npm i uuidv4' , how to use https://www.npmjs.com/package/uuidv4
import moment from "moment";

const tableName = 'tb_file' // file table name
const dirpath = path.resolve('C:/mesFile/FileUpload2') // set file storage location
const storageroot: string = dirpath as string
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const directory: string = path.normalize(storageroot)
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }
    cb(null, directory)
  },
  async filename(req, file, cb) {
    // const reqAny: any = req as any
    // cb(null,`${file.originalname}`)
    const name = file.originalname.split('.')
    const fileName = uuid() //
    req.body.newFileName = fileName // set filename data in req.body
    req.body.newFileExt = name[1] // filename extension
    cb(null, `${fileName}.${name[1]}`)
  }
})
const upload = multer({ storage })

export default [
  {
    path: "/api/v1/mes/file/upload/",
    method: "post",
    handler: [
      async (req: Request, res: Response, next: NextFunction) => {
        const reqAny: any = req as any

        next()
      },
      upload.single('file'),
      async (req: Request, res: Response) => {
        const data = await models.tb_file.create({ // post tb_file data
          // ID: id[0].ID,
          nm_file: req.file?.originalname,
          type_file: req.body.newFileExt,
          uuid_file: req.body.newFileName,
          dt_regist: moment().format("YYYY-MM-DD HH:mm"),

        })
        RestResponse.Ok(res, data.id);
      }
    ]
  },
  {
    path: "/api/v1/mes/file/download/:ID_FILE",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const file: any = await models.tb_file.findOne({ where: { ID: req.params.ID_FILE } })

        if (!file) {
          throw new HTTP400Error("The file doesn't exists")

        } else {
          const filename = file.uuid_file + '.' + file.type_file // file name search
          const filepath: string = path.join(storageroot, filename)
          const exist = fs.existsSync(filepath)
          if (exist) {
            const rs: ReadStream = fs.createReadStream(filepath)
            rs.pipe(res)
          }

        }

      }
    ]
  },
  {
    // Select
    path: "/api/v1/mes/file/search/:id",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        // execute query
        const data: [] = await models.sequelize.query(
          `
            select * from tb_file where id = :id
        `,
          {
            type: QueryTypes.SELECT,
            replacements: { id: req.params.id, ...req.query },
          }
        );
        RestResponse.Ok(res, data);
      },
    ],
  },
  {
    path: "/api/v1/mes/file/delete/:ID_FILE/:table/:tableId",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        const t = await models.sequelize.transaction();
        const data = await models.tb_file.destroy({ where: { ID: req.params.ID_FILE } }, { transaction: t })
        await models.sequelize.query(`
        update ${req.params.table} set ID_FILE = null where ID = ${req.params.tableId}
        `, { type: QueryTypes.SELECT })
        await t.commit();
        RestResponse.Ok(res, req.params.id);
      }
    ]
  }
];