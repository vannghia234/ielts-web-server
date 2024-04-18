"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseBase = exports.ResponseStatus = void 0;
const uuid_1 = require("uuid");
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["Success"] = "Success";
    ResponseStatus["Failure"] = "Failure";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
class ResponseBase {
    constructor(status, message, data) {
        this.id = (0, uuid_1.v4)();
        this.timestamp = new Date();
        this.apiVersion = '1.0';
        this.status = status;
        this.message = message;
        this.data = data;
    }
    toJSON() {
        return {
            id: this.id,
            timestamp: this.timestamp.toISOString(),
            apiVersion: this.apiVersion,
            status: this.status,
            message: this.message,
            data: this.data,
        };
    }
}
exports.ResponseBase = ResponseBase;
//# sourceMappingURL=response_base.js.map