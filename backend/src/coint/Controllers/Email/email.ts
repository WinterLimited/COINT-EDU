import { Request, Response, NextFunction } from "express";
import models from "../../models";
import { RestResponse } from "../../common/RestResponse";
import { HTTP400Error } from "../../common/errors";
import { QueryTypes } from 'sequelize';
import bcryptjs from 'bcryptjs'
import validator from "validator";
import assert from "assert";
import multer from 'multer'
import path from 'path'
import fs, { ReadStream } from 'fs'
import { commonHandlers } from "../../common/middleware";
import cors from 'cors';
import { RequestError } from "request-promise/errors";
import moment from "moment"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'pichem.mes@gmail.com',
    pass: 'jluomwykaxgxgsjo'
  }
})

export default [
  {// Send Email
    path: "/api/v1/email/send/single",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const receiver = await models.tb_user.findOne({ where: { id: req.body.receiver } })
        const receive = receiver.email
        const mailOptions = {
          from: `PIC MES/POP SYSTEM<pichem.mes@gmail.com>`,
          to: `${receive}`,
          subject: req.body.subject,
          html: req.body.html
        }
        transporter.sendMail(mailOptions, (error, info) => {
          console.log(info)
        })
        transporter.close();
        RestResponse.Ok(res, 'Complete')
      }
    ]
  },
  {// Send Email
    path: "/api/v1/email/send/multi",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        let requester
        let manager
        let toUser = ''
        let receiver
        if (req.body.manager) {
          manager = await models.tb_user.findOne({ where: { id: req.body.manager } })
          toUser += `<${manager.email}>,`
        }
        if (req.body.receiver) {
          requester = await models.tb_user.findOne({ where: { id: req.body.receiver } })
          if (req.body.temp === 'purchase') {

            const dept = await models.tb_user.findAll({ where: { account: requester.account } })

            for (const iterator of dept) {
              toUser += `<${iterator.email}>, `
            }
          } else {
            toUser += `<${requester.email}>,`
          }
        }
        if (req.body.temp === 'purchase') {
          receiver = await models.tb_user.findAll({ where: { yn_receiver: 'Y' } })
        } else if (req.body.temp === 'outgo') {
          receiver = await models.tb_user.findAll({ where: { yn_receiver_outgo: 'Y' } })
        } else if (req.body.temp === 'salesOrder') {
          receiver = await models.tb_user.findAll({ where: { yn_receiver_salesOrder: 'Y' } })
        } else if (req.body.temp === 'salesEstimate') {
          receiver = await models.tb_user.findAll({ where: { yn_receiver_salesEstimate: 'Y' } })
        }

        for (const iterator of receiver) {
          toUser += `<${iterator.email}>,`

        }

        const mailOptions = {
          from: `PIC MES/POP SYSTEM<pichem.mes@gmail.com>`,
          to: `${toUser}`,
          subject: req.body.subject,
          html: req.body.html
        }
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })
        transporter.close();
        RestResponse.Ok(res, 'Complete')
      }
    ]
  },
  {// Send Email
    path: "/api/v1/email/send/holiday",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const receiver = await models.tb_user.findOne({ where: { id: req.body.id } })
        const receive = receiver.email
        const subject = '[연차정보] ' + moment().format('YYYY-MM-DD') + ' 연차 정보'
        let html
        let holiday
        let log
        if (receive) {
          holiday = await models.sequelize.query(`
            select
              top 1
              id,
              id_user,
              nm_user,
              nm_dept,
              nm_position,
              dt_join,
              seq,
              convert(nvarchar,dt_join, 23) join_convert,
              year(dt_join) join_year,
              year(getDate()) now_year,
              year(getDate()) - year(dt_join)	no_years,
              no_used = isnull((select sum(dt_use) from tb_holidays_log where id_holidays = h.id and  dt_year = year(getDate()) and yn_del = 'N' and yn_unpaid = 'N'), 0),
              no_unpaid = isnull((select sum(dt_use) from tb_holidays_log where id_holidays = h.id and  dt_year = year(getDate()) and yn_del = 'N' and yn_unpaid = 'Y'), 0)
            from tb_holidays h
            where yn_del = 'N'
            and id_user = ${req.body.id}
            order by seq
          `, { type: QueryTypes.SELECT, replacements: { ...req.body } })
          if (holiday) {
            log = await models.holidaysLog.findAll({ where: { id_holidays: holiday[0].id, yn_del: 'N', dt_year: moment().format('YYYY') } })
            if (log) {
              html = emailFormatHoliday(holiday[0], log)
            }
          }
          const mailOptions = {
            from: `PIC MES/POP SYSTEM<pichem.mes@gmail.com>`,
            to: `<${receive}>`,
            subject,
            html
          }

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              transporter.close();
              RestResponse.Ok(res, 'error')
            } else {
              console.log('Email sent: ' + info.response);
              transporter.close();
              RestResponse.Ok(res, 'Complete')
            }
          })
        }
        else {
          console.log(receiver)
          RestResponse.Ok(res, 'Pass')
        }
      }
    ]
  }
];
function emailFormatHoliday(content: any, detail: any) {
  if (content.no_years > 0) {
    // 근속연수가 1년 이상일 경우
    let total = 15
    switch (parseInt(content.no_years, 10) % 2) {
      case 0:
        total += Math.floor((parseInt(content.no_years, 10) - 1) / 2);
        break;
      case 1:
        total += Math.floor(parseInt(content.no_years, 10) / 2);
        break;
    }
    if (total > 25) total = 25
    content.no_total = total
  } else {
    // 근속연수가 1년 미만일 경우
    let total = 0
    const today = moment()
    switch (parseInt(today.format('DD'), 10) < parseInt(moment(content.join_convert).format('DD'), 10)) {
      case true:
        total = parseInt(today.format('MM'), 10) - parseInt(moment(content.join_convert).format('MM'), 10) - 1
        break;
      case false:
        total = parseInt(today.format('MM'), 10) - parseInt(moment(content.join_convert).format('MM'), 10)
        break;
    }
    content.no_total = total
  }
  content.no_remain = content.no_total - content.no_used

  let str = `<!doctype html> <html>`
  str += emailFormatHead()
  str += ` <body>
                <h2 style="padding:10px;">[연차 정보]</h2><br/>
                <div style="width:100%;">
                  <table class="type11">
                    <thead>
                    <tr>
                      <th scope="cols">부서</th><th scope="cols">직급</th><th scope="cols">성명</th><th scope="cols">입사일</th>
                      <th scope="cols">근속연수</th><th scope="cols">연차</th><th scope="cols">사용연차</th>
                      <th scope="cols">잔여연차</th><th scope="cols">무급휴가</th>
                    </tr>
                    </thead>
                    <tbody>`
  // 값 입력
  str += `<tr>
            <td>${content.nm_dept}</td>  <td>${content.nm_position}</td> <td>${content.nm_user}</td> <td>${content.join_convert}</td>
            <td>${content.no_years}</td> <td>${content.no_total}</td>   <td>${content.no_used}</td>
            <td>${content.no_remain}</td><td>${content.no_unpaid}</td>
          </tr>`
  str += `</tbody>
            </table>
                </div>
                <br>
                <br>
                <div style="width:100%;">
                  <table class="type11">
                    <thead>
                    <tr>
                      <th scope="cols" style="width:10em">시작일</th>
                      <th scope="cols" style="width:10em">종료일</th>
                      <th scope="cols" style="width:10em">사용연차</th>
                      <th scope="cols" style="width:10em">무급여부</th>
                      <th scope="cols" style="width:30em">내용</th>
                    </tr>
                    </thead>
                    <tbody>`
  // for
  // for (let i = 0; i < detail.length; i++) {
  //   str += `<tr>  <td>${detail[i].dt_start}</td> <td>${detail[i].dt_finish}</td> <td>${detail[i].dt_use}</td>  <td>${isnullCheck(detail[i].descr)}</td></tr>`
  // }
  for (const iterator of detail) {
    str += `<tr>  <td>${isnullCheck(iterator.dt_start)}</td>
                  <td>${isnullCheck(iterator.dt_finish)}</td>
                  <td>${iterator.dt_use}</td>
                  <td>${iterator.yn_unpaid}</td>
                  <td>${isnullCheck(iterator.descr)}</td>
            </tr>`
  }
  str += ` </tbody>
          </table>
        </div>
      </body>
      <br>
      <br>
      <img style="width:180px;" src='http://drive.google.com/uc?export=view&id=1cLIcRuRd3sbfwiB6xxEZWNXanMbCi-nO' /><br>
    </html>`
  return str
}
function emailFormatHead() {
  return ` <head>
  <meta charset="utf-8">
  <style>
      .labelCSS { width: 20%; text-align: right; margin-right: 10px; margin-bottom: 10px; display: inline-block; margin-bottom: 5px; font-weight: 700; }
      .inputCSS { height: 25px; width: 60%; display: inline-block; color: #66615b; background-color: white !important; border: 1px solid #e8e7e3 !important;
        border-radius: 4px; font-size: 14px; padding: 7px 18px; margin-bottom: 10px; -webkit-box-shadow: none; box-shadow: none; }
      table.type11 { border-collapse: separate; border-spacing: 1px; text-align: center; line-height: 1.5; margin: 10px 10px; }
      table.type11 th { width: 10em; font-weight: bold; vertical-align: top; color: #909399; background: #F5F7FA;
        border-right: 1px solid #c7c7c7; border-bottom: 1px solid #c7c7c7;}
      table.type11 td { width: 10em; height:20px; padding: 2px; vertical-align: top; border-right: 1px solid #c7c7c7;
        border-bottom: 1px solid #c7c7c7; background: #ffffff !important;}
    </style>
</head>`
}
function isnullCheck(value: any) {
  return value === null ? '' : value
}