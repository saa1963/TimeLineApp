"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TLPeriod_1 = require("./TLPeriod");
const TLPeriodEvent_1 = require("./TLPeriodEvent");
const TLEvent_1 = require("./TLEvent");
class TimeLineData {
    constructor() {
        this.Periods = [];
    }
    static CreateTimeLineData(data) {
        let rt = new TimeLineData();
        rt.Name = data.Name;
        rt.Periods = [];
        data.Periods.forEach(o => {
            if (TLEvent_1.TLEvent.Equal(o.Begin, o.End))
                rt.Periods.push(TLPeriodEvent_1.TLPeriodEvent.CreateTLPeriodEvent(o));
            else
                rt.Periods.push(TLPeriod_1.TLPeriod.CreateTLPeriod(o));
        });
        return rt;
    }
}
exports.TimeLineData = TimeLineData;
//# sourceMappingURL=TimeLineData.js.map