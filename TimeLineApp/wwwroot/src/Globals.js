"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Globals {
    static getCookie(name) {
        let c = document.cookie;
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
}
Globals.IsAuthentificated = false;
exports.Globals = Globals;
//# sourceMappingURL=Globals.js.map