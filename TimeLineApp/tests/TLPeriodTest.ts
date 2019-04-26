import { TLPeriod } from '../wwwroot/src/TLPeriod';
import { expect } from 'chai';
import 'mocha';

describe('TLPeriod', () => {

  describe('IsIntersectIntervals', () => {
    it('-1;1;1;2', () => {
      const result = TLPeriod.isIntersectIntervals(-1, 1, 1, 2);
      expect(result).to.equal(true);
    });
  });

});