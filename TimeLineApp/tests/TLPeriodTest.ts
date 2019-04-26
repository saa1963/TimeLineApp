import { TLPeriod } from '../wwwroot/src/TLPeriod';
import { expect } from 'chai';
import 'mocha';

describe('TLPeriod', () => {

  describe('IsIntersectIntervals', () => {
    it('-1;1;1;2', () => {
      const result = TLPeriod.isIntersectIntervals(-1, 1, 1, 2);
      expect(result).to.equal(true);
    });
    it('-1;1;2;3', () => {
      const result = TLPeriod.isIntersectIntervals(-1, 1, 2, 3);
      expect(result).to.equal(false);
    });
    it('-1;1;0;3', () => {
      const result = TLPeriod.isIntersectIntervals(-1, 1, 0, 3);
      expect(result).to.equal(true);
    });
  });

});