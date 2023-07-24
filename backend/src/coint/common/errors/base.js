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
exports.HTTPClientError = void 0;
var HTTPClientError = /** @class */ (function (_super) {
    __extends(HTTPClientError, _super);
    function HTTPClientError(message) {
        var _this = this;
        if (message instanceof Object) {
            _this = _super.call(this, JSON.stringify(message)) || this;
        }
        else {
            _this = _super.call(this, message) || this;
        }
        _this.name = _this.constructor.name;
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return HTTPClientError;
}(Error));
exports.HTTPClientError = HTTPClientError;
