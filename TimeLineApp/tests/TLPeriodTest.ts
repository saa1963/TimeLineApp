import { TLPeriod } from '../src/TLPeriod';
import { expect } from 'chai';
import 'mocha';
import { EnumPeriod } from '../src/TLEvent';

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

  describe('CreateTLPeriod', () => {
    it('Test_1', () => {
      const json = '{"Name": "Рождение","Begin": {"Name": "Начало","Day": \
                    {"Day": 5,"Month": 6,"Year": 1963},"Month": 23550,"Year": 1963,\
                    "Decade": 197,"Century": 20},"End": {"Name": "Конец","Day": \
                    {"Day": 5,"Month": 6,"Year": 1963},"Month": 23550,"Year": 1963,"Decade": 197,"Century": 20}}';
      const data = JSON.parse(json);
      const period = TLPeriod.CreateTLPeriod(data);
      period.Parent = null
      expect(period.Name).to.equal('Рождение');
    });
  });

  describe('getLeftBoundForPeriod', () => {
    it('Test_1', () => {
      const json = `{
      "Name": "Биография Жукова Г.К.",
        "Begin": {
          "Name": "Начало",
          "Day": null,
          "Month": null,
          "Year": null,
          "Decade": null,
          "Century": 19,
          "Type": 5
        },
        "End": {
          "Name": "Конец",
          "Day": null,
          "Month": null,
          "Year": null,
          "Decade": null,
          "Century": 21,
          "Type": 5
        },
      "Periods": []
    }`;
      const data = JSON.parse(json);
      const period = TLPeriod.CreateTLPeriod(data);
      period.Parent = null
      period.Id = 1
      let left = period.getLeftBoundForPeriod(EnumPeriod.month)
      expect(left).to.equal(21601);
    });
  });

});