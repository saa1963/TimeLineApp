"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateutils_1 = require("../wwwroot/src/dateutils");
const chai_1 = require("chai");
require("mocha");
//import { describe } from 'mocha';
describe('DateUtils', () => {
    describe('YMDFromAD', () => {
        it('(730) -> { year: 2, month: 12, day: 31 }', () => {
            const result = dateutils_1.DateUtils.YMDFromAD(730);
            chai_1.expect(result).to.deep.equal({ year: 2, month: 12, day: 31 });
        });
        it('(-730) -> { year: -2, month: 1, day: 1 }', () => {
            const result = dateutils_1.DateUtils.YMDFromAD(-730);
            chai_1.expect(result).to.deep.equal({ year: -2, month: 1, day: 1 });
        });
        it('(0) -> null', () => {
            const result = dateutils_1.DateUtils.YMDFromAD(0);
            chai_1.expect(result).to.null;
        });
    });
    describe('DaysFromAD', () => {
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
    describe('DaysFromAD - YMDFromAD', () => {
        it('5.6.1963 -> 5.6.1963', () => {
            const result = dateutils_1.DateUtils.YMDFromAD(dateutils_1.DateUtils.DaysFromAD(1963, 6, 5));
            chai_1.expect(result).to.deep.equal({ year: 1963, month: 6, day: 5 });
        });
        it('5.6.-1963 -> 5.6.-1963', () => {
            const result = dateutils_1.DateUtils.YMDFromAD(dateutils_1.DateUtils.DaysFromAD(-1963, 6, 5));
            chai_1.expect(result).to.deep.equal({ year: -1963, month: 6, day: 5 });
        });
    });
    describe('FirstDayOfMonth', () => {
        it('13 -> 366', () => {
            const result = dateutils_1.DateUtils.FirstDayOfMonth(13);
            chai_1.expect(result).to.equal(366);
        });
        it('-13 -> -366', () => {
            const result = dateutils_1.DateUtils.FirstDayOfMonth(-13);
            chai_1.expect(result).to.equal(-366);
        });
    });
    describe('LastDayOfMonth', () => {
        it('13 -> 396', () => {
            const result = dateutils_1.DateUtils.LastDayOfMonth(13);
            chai_1.expect(result).to.equal(396);
        });
        it('-13 -> -396', () => {
            const result = dateutils_1.DateUtils.LastDayOfMonth(-13);
            chai_1.expect(result).to.equal(-396);
        });
    });
    describe('FirstDayOfYear', () => {
        it('2 -> 366', () => {
            const result = dateutils_1.DateUtils.FirstDayOfYear(2);
            chai_1.expect(result).to.equal(366);
        });
        it('-2 -> -366', () => {
            const result = dateutils_1.DateUtils.FirstDayOfYear(-2);
            chai_1.expect(result).to.equal(-366);
        });
    });
    describe('LastDayOfYear', () => {
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