"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateutils_1 = require("../wwwroot/src/dateutils");
const chai_1 = require("chai");
require("mocha");
describe('DateUtils', () => {
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
    describe('FirstDayOfMonth - сборный', () => {
        it('111', () => {
            const result = dateutils_1.DateUtils.getMonthFromYMD({ year: 1963, month: 6, day: 5 });
            const result0 = dateutils_1.DateUtils.FirstDayOfMonth(result);
            const result1 = dateutils_1.DateUtils.YMDFromAD(result0);
            chai_1.expect(result1).to.deep.equal({ year: 1963, month: 6, day: 1 });
        });
        it('222', () => {
            const result = dateutils_1.DateUtils.getMonthFromYMD({ year: -1963, month: 6, day: 5 });
            const result0 = dateutils_1.DateUtils.FirstDayOfMonth(result);
            const result1 = dateutils_1.DateUtils.YMDFromAD(result0);
            chai_1.expect(result1).to.deep.equal({ year: -1963, month: 6, day: 1 });
        });
    });
    describe('FirstDayOfMonth', () => {
        it('13 -> 366', () => {
            const result = dateutils_1.DateUtils.FirstDayOfMonth(13);
            chai_1.expect(result).to.equal(366);
        });
        it('-13 -> -396', () => {
            const result = dateutils_1.DateUtils.FirstDayOfMonth(-13);
            chai_1.expect(result).to.equal(-396);
        });
    });
    describe('LastDayOfMonth', () => {
        it('13 -> 396', () => {
            const result = dateutils_1.DateUtils.LastDayOfMonth(13);
            chai_1.expect(result).to.equal(396);
        });
        it('-13 -> -366', () => {
            const result = dateutils_1.DateUtils.LastDayOfMonth(-13);
            chai_1.expect(result).to.equal(-366);
        });
    });
    describe('FirstDayOfYear', () => {
        it('2 -> 366', () => {
            const result = dateutils_1.DateUtils.FirstDayOfYear(2);
            chai_1.expect(result).to.equal(366);
        });
        it('-2 -> -730', () => {
            const result = dateutils_1.DateUtils.FirstDayOfYear(-2);
            chai_1.expect(result).to.equal(-730);
        });
    });
    describe('LastDayOfYear', () => {
        it('2 -> 730', () => {
            const result = dateutils_1.DateUtils.LastDayOfYear(2);
            chai_1.expect(result).to.equal(730);
        });
        it('-2 -> -366', () => {
            const result = dateutils_1.DateUtils.LastDayOfYear(-2);
            chai_1.expect(result).to.equal(-366);
        });
    });
    describe('FirstDayOfDecade', () => {
        it('2 -> 3653', () => {
            const result = dateutils_1.DateUtils.FirstDayOfDecade(2);
            chai_1.expect(result).to.equal(3653);
        });
        it('-2 -> -7305', () => {
            const result = dateutils_1.DateUtils.FirstDayOfDecade(-2);
            chai_1.expect(result).to.equal(-7305);
        });
    });
    describe('LastDayOfDecade', () => {
        it('2 -> 7305', () => {
            const result = dateutils_1.DateUtils.LastDayOfDecade(2);
            chai_1.expect(result).to.equal(7305);
        });
        it('-2 -> -3653', () => {
            const result = dateutils_1.DateUtils.LastDayOfDecade(-2);
            chai_1.expect(result).to.equal(-3653);
        });
    });
});
//# sourceMappingURL=test1.js.map