"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateutils_1 = require("../wwwroot/src/dateutils");
const chai_1 = require("chai");
require("mocha");
const mocha_1 = require("mocha");
mocha_1.describe('DateUtils', () => {
    mocha_1.describe('YMDFromAD', () => {
        it('(1) -> { year: 1, month: 1, day: 1 }', () => {
            const result = dateutils_1.DateUtils.YMDFromAD(1);
            chai_1.expect(result).to.deep.equal({ year: 1, month: 1, day: 1 });
        });
        it('(-1) -> { year: -1, month: 1, day: 1 }', () => {
            const result = dateutils_1.DateUtils.YMDFromAD(-1);
            chai_1.expect(result).to.deep.equal({ year: -1, month: 1, day: 1 });
        });
        it('(0) -> null', () => {
            const result = dateutils_1.DateUtils.YMDFromAD(0);
            chai_1.expect(result).to.null;
        });
    });
    mocha_1.describe('DaysFromAD', () => {
        it('( year = 2, month = 12, day = 31 ) -> 730', () => {
            const result = dateutils_1.DateUtils.DaysFromAD(2, 12, 31);
            chai_1.expect(result).to.equal(730);
        });
        it('{ year = -2, month = 1, day = 1 } -> -730', () => {
            const result = dateutils_1.DateUtils.DaysFromAD(-2, 1, 1);
            chai_1.expect(result).to.equal(-730);
        });
        it('{ year = 1, month = 4, day = 31 } -> exception', () => {
            let fn = dateutils_1.DateUtils.DaysFromAD;
            chai_1.expect(() => fn(2019, 4, 31)).to.throw();
        });
        it('{ year = 1, month = 3, day = 31 } -> not exception', () => {
            let fn = dateutils_1.DateUtils.DaysFromAD;
            chai_1.expect(() => fn(2019, 3, 31)).to.not.throw();
        });
    });
    mocha_1.describe('FirstDayOfMonth', () => {
        it('13 -> 366', () => {
            const result = dateutils_1.DateUtils.FirstDayOfMonth(13);
            chai_1.expect(result).to.equal(366);
        });
        it('-13 -> -366', () => {
            const result = dateutils_1.DateUtils.FirstDayOfMonth(-13);
            chai_1.expect(result).to.equal(-366);
        });
    });
    mocha_1.describe('LastDayOfMonth', () => {
        it('13 -> 396', () => {
            const result = dateutils_1.DateUtils.LastDayOfMonth(13);
            chai_1.expect(result).to.equal(396);
        });
        it('-13 -> -396', () => {
            const result = dateutils_1.DateUtils.LastDayOfMonth(-13);
            chai_1.expect(result).to.equal(-396);
        });
    });
    mocha_1.describe('FirstDayOfYear', () => {
        it('2 -> 366', () => {
            const result = dateutils_1.DateUtils.FirstDayOfYear(2);
            chai_1.expect(result).to.equal(366);
        });
        it('-2 -> -366', () => {
            const result = dateutils_1.DateUtils.FirstDayOfYear(-2);
            chai_1.expect(result).to.equal(-366);
        });
    });
    mocha_1.describe('LastDayOfYear', () => {
        it('2 -> 730', () => {
            const result = dateutils_1.DateUtils.LastDayOfYear(2);
            chai_1.expect(result).to.equal(730);
        });
        it('-2 -> -730', () => {
            const result = dateutils_1.DateUtils.LastDayOfYear(-2);
            chai_1.expect(result).to.equal(-730);
        });
    });
});
//# sourceMappingURL=test1.js.map