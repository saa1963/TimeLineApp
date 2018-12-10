import { DateUtils } from './dateutils'

export enum EnumPeriod {
  day = 1, month = 2, year = 3, decade = 4, century = 5
}

class TLDate {
  Day: number
  Month: number
  Year: number
  constructor(year: number, month: number, day: number) {
    if (year == 0) throw new Error('Год равен 0')
    if (month > 12 || month < 1) throw new Error('Неверный месяц месяца')
    if (day < 1) throw new Error('День меньше 1')
    if ([ 1, 3, 5, 7, 8, 10, 12 ].includes(month)) {
      if (day > 31) throw new Error('Неверный день месяца')
    } else if ([ 4, 6, 9, 11 ].includes(month)) {
      if (day > 30) throw new Error('Неверный день месяца')
    } else {
      if (day > 29) throw new Error('Неверный день месяца')
      if (year >= 1 && year <= 9999) {
        var dt = new Date(year, month - 1, day);
        if (DateUtils.leapYear(year)) {
          if (day > 27) throw new Error('Неверный день месяца')
        }
        else {
          if (day > 28) throw new Error('Неверный день месяца')
        }
      }
    }
    this.Day = day;
    this.Month = month;
    this.Year = year;
  }
}

export abstract class TLEvent {
  Name: string
  Day: TLDate
  Month: number
  Year: number
  Decade: number
  Century: number
  constructor(name: string) {
    this.Name = name
    this.Day = null
    this.Month = null
    this.Year = null
    this.Decade = null
    this.Century = null
  }
  protected DecadeFromYear(year: number): number {
    return year / 10 + (year / Math.abs(year))
  }
  protected CenturyFromDecade(decade: number): number {
    return decade / 10 + (decade / Math.abs(decade))
  }
  protected YearFromMonth(month: number): number {
    return (month - 1) / 12 + (month / Math.abs(month))
  }
  public Equal(period: EnumPeriod, vl: number | Date): boolean {
    return true
  }
}

export class TLEventDay extends TLEvent {
  constructor(name: string, year: number, month: number, day: number) {
    super(name);
    this.Day = new TLDate(year, month, day)
    this.Month = ((Math.abs(year) - 1) * 12 + month) * (year / Math.abs(year));
    this.Year = year;
    this.Decade = this.DecadeFromYear(year)
    this.Century = this.CenturyFromDecade(this.Decade);
  }
}

export class TLEventMonth extends TLEvent {
  constructor(name: string, par1: number, par2?: number) {
    super(name)
    if (par2 !== undefined) {
      let year = par1
      let month = par2
      this.Month = ((Math.abs(year) - 1) * 12 + month) * (year / Math.abs(year))
      this.Year = year
      this.Decade = this.DecadeFromYear(year)
      this.Century = this.CenturyFromDecade(this.Decade)
    } else {
      let month = par1
      this.Month = month
      this.Year = this.YearFromMonth(month)
      this.Decade = this.DecadeFromYear(this.Year)
      this.Century = this.CenturyFromDecade(this.Decade);
    }
  }
}

export class TLEventYear extends TLEvent {
  constructor(name: string, year: number) {
    super(name)
    this.Year = year
    this.Decade = this.DecadeFromYear(year)
    this.Century = this.CenturyFromDecade(this.Decade);
  }
}

export class TLEventDecade extends TLEvent {
  constructor(name: string, par1: number, par2?: number) {
    super(name)
    if (par2 !== undefined) {
      let century = par1
      let decade = par2
      if(decade < 0 || decade > 9) throw Error('Неверный номер десятилетия')
      this.Decade = ((Math.abs(century) - 1) * 10 + decade + 1) * (century / Math.abs(century))
      this.Century = century;
    } else {
      let decade = par1
      this.Decade = decade;
      this.Century = this.CenturyFromDecade(decade)
    }
  }
}

export class TLEventCentury extends TLEvent {
  constructor(name: string, century: number) {
    super(name)
    this.Century = century
  }
}

export class TLPeriod {
  Name: string
  Begin: TLEvent
  End: TLEvent
  constructor(name: string, begin: TLEvent, end: TLEvent) {
    if (typeof (begin) !== typeof (end)) throw new Error('Неодинаковый тип')
    this.Name = name
    this.Begin = begin
    this.End = end
  }
  public Equal(period: EnumPeriod, vl: number | Date): boolean {
    return true
  }
}

export class TimeLineData {
  Events: TLEvent[] = []
  Periods: TLPeriod[] = []
  Name: string
}