import { Router, Request, Response, NextFunction } from "express";
import cors from 'cors'
import { idText } from "typescript";

export class RestResponse {
    static Ok(response: Response, data: any) {
        return response.status(200)
        .header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE")
        .header("Access-Control-Allow-Credentials","true")
        .header("Access-Control-Expose-Headers","true")
        .send({
            "code": "OK",
            "message": "",
            "data": data
        });
    }
    static Fail(response: Response, message: any, statuscode: number = 200) {
        return response.status(statuscode || 200)
        .header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE")
        .header("Access-Control-Allow-Credentials","true")
        .header("Access-Control-Expose-Headers","true")
        .send({
            "code": "FAIL",
            "message": message,
            "data": null
        });
    }
}

