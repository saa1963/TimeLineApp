import { EnumPeriod } from "../TLEvent";
import { DateUtils } from "../dateutils";
export namespace NS_EventPeriod {
  export interface ICompare<T> {
    Compare: (arg1: T) => -1 | 0 | 1
  }

  export interface IConvert2Day {
    Convert: Day
  }

  export abstract class Event {
    /** значение */
    ValueEvent: number
    /** тип */
    TypeEvent: EnumPeriod
    constructor(value: number) {
      this.ValueEvent = value
    }
    static CreateEvent(value: number, type: EnumPeriod): Event {
      switch (type) {
        case EnumPeriod.day:
          return new Day(value)
        case EnumPeriod.month:
          return new Month(value)
        case EnumPeriod.year:
          return new Year(value)
        case EnumPeriod.decade:
          return new Decade(value)
        case EnumPeriod.century:
          return new Century(value)
      }
    }
  }

  export class Period {
    Begin: Event
    End: Event
    TypePeriod: EnumPeriod
  }

  export class Day extends Event {
    constructor(value: number) {
      super(value)
      this.TypeEvent = EnumPeriod.day
    }
  }

  export class Month extends Event {
    constructor(value: number) {
      super(value)
      this.TypeEvent = EnumPeriod.month
    }
  }

  export class Year extends Event {
    constructor(value: number) {
      super(value)
      this.TypeEvent = EnumPeriod.year
    }
  }

  export class Decade extends Event {
    constructor(value: number) {
      super(value)
      this.TypeEvent = EnumPeriod.decade
    }
  }

  export class Century extends Event {
    constructor(value: number) {
      super(value)
      this.TypeEvent = EnumPeriod.century
    }
    GetDaysPeriod(): Period {
      let p = new Period()
      p.TypePeriod = EnumPeriod.day
      p.Begin = new Day(DateUtils.FirstDayOfCentury(this.ValueEvent))
      p.End = new Day(DateUtils.LastDayOfCentury(this.ValueEvent))
      return p
    }
    //GetMonthsPeriod(): Period {
    //  let p = new Period()
    //  p.TypePeriod = EnumPeriod.month
    //  p.Begin = new Day()
    //  p.Begin.TypeEvent = EnumPeriod.day
    //  p.Begin.ValueEvent = DateUtils.FirstDayOfCentury(this.ValueEvent)
    //  p.End.TypeEvent = EnumPeriod.day
    //  p.End.ValueEvent = DateUtils.LastDayOfCentury(this.ValueEvent)
    //  return p
    //}
  }
}