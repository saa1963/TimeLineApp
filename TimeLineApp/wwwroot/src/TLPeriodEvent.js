"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TLPeriod_1 = require("./TLPeriod");
class TLPeriodEvent extends TLPeriod_1.TLPeriod {
    /**
     * Создает TLPeriodEvent из объекта десериализованного из JSON
     * @param o
     */
    static CreateTLPeriodEvent(o) {
        let rt;
        rt = TLPeriod_1.TLPeriod.CreateTLPeriod(o);
        return rt;
    }
}
exports.TLPeriodEvent = TLPeriodEvent;
//# sourceMappingURL=TLPeriodEvent.js.map