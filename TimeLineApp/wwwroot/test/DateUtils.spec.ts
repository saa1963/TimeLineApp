import { DateUtils } from '../src/dateutils';
import { expect } from 'chai';
import 'mocha';

describe('YMD->Number->YMD', () => {

  it('should return {year:1963, month:6, day:5}', () => {
    const result0 = DateUtils.DaysFromAD(1963, 6, 5)
    const result = DateUtils.YMDFromAD(result0)
    expect(result.year).to.equal(1963)
    expect(result.month).to.equal(6)
    expect(result.day).to.equal(5)
  });

});