"use strict";
exports.__esModule = true;
exports.HTTP404Error = exports.HTTP403Error = exports.HTTP401Error = exports.HTTP400Error = exports.HTTPClientError = void 0;
var base_1 = require("./base");
exports.HTTPClientError = base_1.HTTPClientError;
var http400_1 = require("./http400");
exports.HTTP400Error = http400_1.HTTP400Error;
var http401_1 = require("./http401");
exports.HTTP401Error = http401_1.HTTP401Error;
var http403_1 = require("./http403");
exports.HTTP403Error = http403_1.HTTP403Error;
var http404_1 = require("./http404");
exports.HTTP404Error = http404_1.HTTP404Error;
