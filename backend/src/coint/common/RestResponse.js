"use strict";
exports.__esModule = true;
exports.RestResponse = void 0;
var RestResponse = /** @class */ (function () {
    function RestResponse() {
    }
    RestResponse.Ok = function (response, data) {
        return response.status(200)
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE")
            .header("Access-Control-Allow-Credentials", "true")
            .header("Access-Control-Expose-Headers", "true")
            .send({
            "code": "OK",
            "message": "",
            "data": data
        });
    };
    RestResponse.Fail = function (response, message, statuscode) {
        if (statuscode === void 0) { statuscode = 200; }
        return response.status(statuscode || 200)
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE")
            .header("Access-Control-Allow-Credentials", "true")
            .header("Access-Control-Expose-Headers", "true")
            .send({
            "code": "FAIL",
            "message": message,
            "data": null
        });
    };
    return RestResponse;
}());
exports.RestResponse = RestResponse;
