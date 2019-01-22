define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeColor = function* () {
        var index = 0;
        let colors = ['magenta', 'green', 'rgba(255, 0, 0, 1.0)', 'blue', 'magenta', 'orange'];
        while (true) {
            yield colors[index];
            if (index < 4) {
                index++;
            }
            else {
                index = 0;
            }
        }
    };
});
//# sourceMappingURL=colorutils.js.map