import { Request, Response } from "express";
import models from "../../../models";
import { RestResponse } from "../../../common/RestResponse";

import jwt from 'jsonwebtoken';
import passport from 'passport';
import passportjwt from 'passport-jwt';
import passportlocal from 'passport-local';
import bcryptjs from 'bcryptjs'

passport.use(new passportlocal.Strategy({
  usernameField: 'loginId',
  passwordField: 'loginPw',
},
  async (username: any, password: any, done: any) => {
    const user = await models.tb_user.findOne({ where: { loginId: username } });


    if (!user) {
      done("failed to authorize");
    } else {

      if (bcryptjs.compareSync(password, user.loginPw)) {
        done(null, user, { message: "auth in success" });
      } else {
        done("failed to authorize");
      }
    }
  }
));

passport.use(new passportjwt.Strategy({
  jwtFromRequest: passportjwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.COINT_JWT_SECRET,
},
  async (jwtPayload: any, done: any) => {

    const user = await models.tb_user.findOne({ where: { loginId: jwtPayload.loginId } });
    if (!user) {
      done("failed to authorize");
    } else {
      done(null, user);
    }
  }
));

export default [
  {
    auth: false,
    path: "/api/v1/auth",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {

        passport.authenticate('local', { session: false }, (err, user) => {
          if (err || !user) {
            RestResponse.Fail(res, 401);
            return;
          }

          req.login(user, { session: false }, (err2) => {
            if (err2) {
              RestResponse.Fail(res, "failed to authorize", 401);
            }
            const rawdata = {
              id: user.id,
              loginId: user.loginId,
              timestamp: (new Date()).getTime(),
            }
            const token = jwt.sign(JSON.stringify(rawdata), process.env.COINT_JWT_SECRET as string);


            // const sendData = { token, id: account.id, divName: account.divName }
            RestResponse.Ok(res, token);
          });
        })(req, res);
      }
    ]
  },

];
