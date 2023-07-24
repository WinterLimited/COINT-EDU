import { Request, Response } from "express";
import passportjwt from 'passport-jwt'
import jwt from 'jsonwebtoken';

const getSession = (req: Request): any => {
    const jwtPayloadRequest: any = passportjwt.ExtractJwt.fromAuthHeaderAsBearerToken()
    const token: string = jwtPayloadRequest(req)
    return decodeToken(token)
}

const decodeToken = (token: string): any => {
    const jwtPayload: any = jwt.verify(token, process.env.COINT_JWT_SECRET as string)
    return jwtPayload
}

export {
    getSession,
    decodeToken
}