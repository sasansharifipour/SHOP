"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var APIInterceptor = /** @class */ (function () {
    function APIInterceptor() {
    }
    APIInterceptor.prototype.intercept = function (req, next) {
        var apiReq = req.clone({ url: "https://localhost:44351/ " + req.url });
        return next.handle(apiReq);
    };
    return APIInterceptor;
}());
exports.APIInterceptor = APIInterceptor;
//# sourceMappingURL=http.Interceptor.js.map