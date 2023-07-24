"use strict";
exports.__esModule = true;
exports.decodeToken = exports.getSession = void 0;
var passport_jwt_1 = require("passport-jwt");
var jsonwebtoken_1 = require("jsonwebtoken");
var getSession = function (req) {
    var jwtPayloadRequest = passport_jwt_1["default"].ExtractJwt.fromAuthHeaderAsBearerToken();
    var token = jwtPayloadRequest(req);
    return decodeToken(token);
};
exports.getSession = getSession;
var decodeToken = function (token) {
    var jwtPayload = jsonwebtoken_1["default"].verify(token, process.env.COINT_JWT_SECRET);
    return jwtPayload;
};
exports.decodeToken = decodeToken;
