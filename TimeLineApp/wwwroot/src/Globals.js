"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Globals = /** @class */ (function () {
    function Globals() {
    }
    Globals.getCookie = function (name) {
        var c = document.cookie;
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };
    Globals.IsAuthentificated = false;
    return Globals;
}());
exports.Globals = Globals;
//# sourceMappingURL=Globals.js.map