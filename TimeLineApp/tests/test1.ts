import { DateUtils } from '../wwwroot/src/dateutils';
import { expect } from 'chai';
import 'mocha';
//import { describe } from 'mocha';

describe('DateUtils', () => {

  describe('YMDFromAD', () => {

    it('(1) -> { year: 1, month: 1, day: 1 }', () => {
      const result = DateUtils.YMDFromAD(1);
      expect(result).to.deep.equal({ year: 1, month: 1, day: 1 });
    });

    it('(-1) -> { year: -1, month: 1, day: 1 }', () => {
      const result = DateUtils.YMDFromAD(-1);
      expect(result).to.deep.equal({ year: -1, month: 1, day: 1 });
    });

    it('(0) -> null', () => {
      const result = DateUtils.YMDFromAD(0);
      expect(result).to.null;
    });

  });

  describe('DaysFromAD', () => {

    it('( year = 2, month = 12, day = 31 ) -> 730', () => {
      const result = DateUtils.DaysFromAD(2,12,31);
      expect(result).to.equal(730);
    });

    it('{ year = -2, month = 1, day = 1 } -> -730', () => {
      const result = DateUtils.DaysFromAD(-2, 1, 1);
      expect(result).to.equal(-730);
    });

    it('{ year = 1, month = 4, day = 31 } -> exception', () => {
      let fn = DateUtils.DaysFromAD;
      expect(() => fn(2019, 4, 31)).to.throw();
    });

    it('{ year = 1, month = 3, day = 31 } -> not exception', () => {
      let fn = DateUtils.DaysFromAD;
      expect(() => fn(2019, 3, 31)).to.not.throw();
    });

  });

  describe('FirstDayOfMonth', () => {
    it('13 -> 366', () => {
      const result = DateUtils.FirstDayOfMonth(13);
      expect(result).to.equal(366);
    });
    it('-13 -> -366', () => {
      const result = DateUtils.FirstDayOfMonth(-13);
      expect(result).to.equal(-366);
    });
  })

  describe('LastDayOfMonth', () => {
    it('13 -> 396', () => {
      const result = DateUtils.LastDayOfMonth(13);
      expect(result).to.equal(396);
    });
    it('-13 -> -396', () => {
      const result = DateUtils.LastDayOfMonth(-13);
      expect(result).to.equal(-396);
    });
  })

  describe('FirstDayOfYear', () => {
    it('2 -> 366', () => {
      const result = DateUtils.FirstDayOfYear(2);
      expect(result).to.equal(366);
    });
    it('-2 -> -366', () => {
      const result = DateUtils.FirstDayOfYear(-2);
      expect(result).to.equal(-366);
    });
  })

  describe('LastDayOfYear', () => {
    it('2 -> 730', () => {
      const result = DateUtils.LastDayOfYear(2);
      expect(result).to.equal(730);
    });
    it('-2 -> -730', () => {
      const result = DateUtils.LastDayOfYear(-2);
      expect(result).to.equal(-730);
    });
  })

});