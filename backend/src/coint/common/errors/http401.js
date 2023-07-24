"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.HTTP401Error = void 0;
var base_1 = require("./base");
var HTTP401Error = /** @class */ (function (_super) {
    __extends(HTTP401Error, _super);
    function HTTP401Error(message) {
        if (message === void 0) { message = "Unauthorized"; }
        var _this = _super.call(this, message) || this;
        _this.statusCode = 401;
        return _this;
    }
    return HTTP401Error;
}(base_1.HTTPClientError));
exports.HTTP401Error = HTTP401Error;
