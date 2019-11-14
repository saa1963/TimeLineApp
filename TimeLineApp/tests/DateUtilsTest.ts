﻿import { DateUtils } from '../wwwroot/src/dateutils';
import { expect } from 'chai';
import 'mocha';

describe('DateUtils', () => {

  describe('DaysFromAD - YMDFromAD', () => {
    it('5.6.1963 -> 5.6.1963', () => {
      const result = DateUtils.YMDFromAD(DateUtils.DaysFromAD(1963, 6, 5))
      expect(result).to.deep.equal({ year: 1963, month: 6, day: 5 });
    });
    it('5.6.-1963 -> 5.6.-1963', () => {
      const result = DateUtils.YMDFromAD(DateUtils.DaysFromAD(-1963, 6, 5))
      expect(result).to.deep.equal({ year: -1963, month: 6, day: 5 });
    });
  });

  describe('FirstDayOfMonth - сборный', () => {
    it('111', () => {
      const result = DateUtils.getMonthFromYMD({ year: 1963, month: 6, day: 5 });
      const result0 = DateUtils.FirstDayOfMonth(result);
      const result1 = DateUtils.YMDFromAD(result0);
      expect(result1).to.deep.equal({ year: 1963, month: 6, day: 1 });
    });
    it('222', () => {
      const result = DateUtils.getMonthFromYMD({ year: -1963, month: 6, day: 5 });
      const result0 = DateUtils.FirstDayOfMonth(result);
      const result1 = DateUtils.YMDFromAD(result0);
      expect(result1).to.deep.equal({ year: -1963, month: 6, day: 1 });
    });
  })

  describe('FirstDayOfMonth', () => {
    it('13 -> 366', () => {
      const result = DateUtils.FirstDayOfMonth(13);
      expect(result).to.equal(366);
    });
    it('-13 -> -396', () => {
      const result = DateUtils.FirstDayOfMonth(-13);
      expect(result).to.equal(-396);
    });
  })

  describe('LastDayOfMonth', () => {
    it('13 -> 396', () => {
      const result = DateUtils.LastDayOfMonth(13);
      expect(result).to.equal(396);
    });
    it('-13 -> -366', () => {
      const result = DateUtils.LastDayOfMonth(-13);
      expect(result).to.equal(-366);
    });
  })

  describe('FirstDayOfYear', () => {
    it('2 -> 366', () => {
      const result = DateUtils.FirstDayOfYear(2);
      expect(result).to.equal(366);
    });
    it('-2 -> -730', () => {
      const result = DateUtils.FirstDayOfYear(-2);
      expect(result).to.equal(-730);
    });
  })

  describe('LastDayOfYear', () => {
    it('2 -> 730', () => {
      const result = DateUtils.LastDayOfYear(2);
      expect(result).to.equal(730);
    });
    it('-2 -> -366', () => {
      const result = DateUtils.LastDayOfYear(-2);
      expect(result).to.equal(-366);
    });
  })

  describe('FirstDayOfDecade', () => {
    it('2 -> 3653', () => {
      const result = DateUtils.FirstDayOfDecade(2);
      expect(result).to.equal(3653);
    });
    it('-2 -> -7305', () => {
      const result = DateUtils.FirstDayOfDecade(-2);
      expect(result).to.equal(-7305);
    });
  })

  describe('LastDayOfDecade', () => {
    it('2 -> 7305', () => {
      const result = DateUtils.LastDayOfDecade(2);
      expect(result).to.equal(7305);
    });
    it('-2 -> -3653', () => {
      const result = DateUtils.LastDayOfDecade(-2);
      expect(result).to.equal(-3653);
    });
  })

  describe('getCenturyFromDecade', () => {
    it('40 -> 4', () => {
      const result = DateUtils.getCenturyFromDecade(40)
      expect(result).to.equal(4);
    });
    it('-40 -> -4', () => {
      const result = DateUtils.getCenturyFromDecade(-40)
      expect(result).to.equal(-4);
    });
  })

  describe('getDecadeFromDecade', () => {
    it('40 -> 10', () => {
      const result = DateUtils.getDecadeFromDecade(40)
      expect(result).to.equal(10);
    });
    it('-40 -> 10', () => {
      const result = DateUtils.getDecadeFromDecade(-40)
      expect(result).to.equal(10);
    });
  })

  describe('getYearFromMonth', () => {
    it('13 -> 2', () => {
      const result = DateUtils.getYearFromMonth(13)
      expect(result).to.equal(2);
    });
    it('-13 -> -2', () => {
      const result = DateUtils.getYearFromMonth(-13)
      expect(result).to.equal(-2);
    });
  })

  describe('getMonthFromMonth', () => {
    it('13 -> 2', () => {
      const result = DateUtils.getYearFromMonth(13)
      expect(result).to.equal(2);
    });
    it('-13 -> -2', () => {
      const result = DateUtils.getYearFromMonth(-13)
      expect(result).to.equal(-2);
    });
  })

});