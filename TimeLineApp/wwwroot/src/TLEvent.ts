﻿import { DateUtils } from './dateutils'

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
  Greater()
}

export abstract class TLEvent {
  Name: string
  Day: TLDate
  Month: number
  Year: number
  Decade: number
  Century: number
  Type: EnumPeriod
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
  static GetType(o: TLEvent): EnumPeriod {
    if (o.Day !== null) return EnumPeriod.day
    if (o.Month !== null) return EnumPeriod.month
    if (o.Year !== null) return EnumPeriod.year
    if (o.Decade !== null) return EnumPeriod.decade
    if (o.Century !== null) return EnumPeriod.century
  }
  /**
   * Попадает ли событие this в текущее значение ОВ
   * @param period
   * Текущая дробность отображения для ЛВ
   * @param vl
   * Текущее значение ОВ, которое в данный момент отрисовывается
   */
  static Equal(o1:TLEvent, o2: TLEvent): boolean {
    let rt = false
    if (o1.Century === o2.Century
      && o1.Decade === o2.Decade
      && o1.Year === o2.Year
      && o1.Month === o2.Month
      && o1.Day.Year === o2.Day.Year
      && o1.Day.Month === o2.Day.Month
      && o1.Day.Day === o2.Day.Day
    ) rt = true
    return rt
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
    this.Type = EnumPeriod.day
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
    this.Type = EnumPeriod.month
  }
}

export class TLEventYear extends TLEvent {
  constructor(name: string, year: number) {
    super(name)
    this.Year = year
    this.Decade = this.DecadeFromYear(year)
    this.Century = this.CenturyFromDecade(this.Decade);
    this.Type = EnumPeriod.year
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
    this.Type = EnumPeriod.decade
  }
}

export class TLEventCentury extends TLEvent {
  constructor(name: string, century: number) {
    super(name)
    this.Century = century
    this.Type = EnumPeriod.century
  }
}

export class TLPeriod {
  Name: string
  Begin: TLEvent
  End: TLEvent
  constructor(o: TLPeriod) {
    this.Name = o.Name;
    let type: EnumPeriod
    type = TLEvent.GetType(o.Begin)
    if (type === EnumPeriod.day) {
      this.Begin = new TLEventDay(o.Begin.Name, o.Begin.Day.Year, o.Begin.Day.Month, o.Begin.Day.Day)
    } else if (type === EnumPeriod.month) {
      this.Begin = new TLEventMonth(o.Begin.Name, o.Begin.Month)
    } else if (type === EnumPeriod.year) {
      this.Begin = new TLEventYear(o.Begin.Name, o.Begin.Year)
    } else if (type === EnumPeriod.decade) {
      this.Begin = new TLEventDecade(o.Begin.Name, o.Begin.Decade)
    } else if (type === EnumPeriod.century) {
      this.Begin = new TLEventCentury(o.Begin.Name, o.Begin.Century)
    }
    type = TLEvent.GetType(o.End)
    if (type === EnumPeriod.day) {
      this.End = new TLEventDay(o.End.Name, o.End.Day.Year, o.End.Day.Month, o.End.Day.Day)
    } else if (type === EnumPeriod.month) {
      this.End = new TLEventMonth(o.End.Name, o.End.Month)
    } else if (type === EnumPeriod.year) {
      this.End = new TLEventYear(o.End.Name, o.End.Year)
    } else if (type === EnumPeriod.decade) {
      this.End = new TLEventDecade(o.End.Name, o.End.Decade)
    } else if (type === EnumPeriod.century) {
      this.End = new TLEventCentury(o.End.Name, o.End.Century)
    }
  }
  /**
   * Попадает текущее значение ОВ в период this
   * @param period
   * Текущая дробность отображения для ЛВ
   * @param vl
   * Текущее значение ОВ, которое в данный момент отрисовывается
   */
  Contains(period: EnumPeriod, vl: number | Date): boolean {
    let rt = false
    switch (period) {
      case EnumPeriod.day:
        let dt = <Date>vl
        rt = this.ContainsDay(dt, this)
        break
      case EnumPeriod.month:
        rt = (vl === this.Month)
        break
      case EnumPeriod.year:
        rt = (vl === this.Year)
        break
      case EnumPeriod.decade:
        rt = (vl === this.Decade)
        break
      case EnumPeriod.century:
        rt = (vl === this.Century)
        break
      default:
        break
    }
    return rt
  }
  /**
   * 
   * @param dt отображаемый ОВ
   * @param o объект насчет которого принимается решение включать или нет
   */
  private ContainsDay(dt: Date, o: TLPeriod): boolean {
    let dt1: Date, dt2: Date
    switch (o.Begin.Type) {
      case EnumPeriod.day:
        dt1 = new Date(this.Begin.Day.Year, this.Begin.Day.Month, this.Begin.Day.Day)
        break;
      case EnumPeriod.month:
        dt1 = new Date(this.Begin.Day.Year, this.Begin.Day.Month, this.Begin.Day.Day)
        break;
    }
  }
}

export class TimeLineData {
  /** Здесь только события с конкретными датами */
  //Events: TLEvent[] = []
  /** Здесь периоды, события у которых нет конкретной даты тоже относятся к периодам */
  Periods: TLPeriod[] = []
  Name: string
  constructor(o: TimeLineData) {
    this.Name = o.Name
    o.Periods.forEach(data => {
      if (TLEvent.Equal(data.Begin, data.End))
        this.Periods.push(new TLPeriodEvent(data))
      else
        this.Periods.push(new TLPeriod(data))
    })
  }
}

export class TLPeriodEvent extends TLPeriod {
  constructor(o: TLPeriod) {
    super(o)
  }
}
}