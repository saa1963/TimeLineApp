"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TLPeriod_1 = require("../wwwroot/src/TLPeriod");
const chai_1 = require("chai");
require("mocha");
describe('TLPeriod', () => {
    describe('IsIntersectIntervals', () => {
        it('-1;1;1;2', () => {
            const result = TLPeriod_1.TLPeriod.isIntersectIntervals(-1, 1, 1, 2);
            chai_1.expect(result).to.equal(true);
        });
    });
});
//# sourceMappingURL=TLPeriodTest.js.map