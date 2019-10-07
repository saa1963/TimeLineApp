import { DateUtils, TLeapData, YearMonthDay } from './dateutils';

export enum EnumPeriod {
  day = 1, month = 2, year = 3, decade = 4, century = 5
}

class TLDate {
  Day: number
  Month: number
  Year: number
  FromCrismas: number
  constructor(year: number, month: number, day: number, fromCrismas?: number) {
    if (fromCrismas === undefined) {
      if (year == 0) throw new Error('Год равен 0')
      if (month > 12 || month < 1) throw new Error('Неверный месяц месяца')
      if (day < 1) throw new Error('День меньше 1')
      if (this.Includes([1, 3, 5, 7, 8, 10, 12], month)) {
        if (day > 31) throw new Error('Неверный день месяца')
      } else if (this.Includes([4, 6, 9, 11], month)) {
        if (day > 30) throw new Error('Неверный день месяца')
      } else {
        if (day > 29) {
          throw new Error('Неверный день месяца')
        }
        if (year >= 1 && year <= 9999) {
          var dt = new Date(year, month - 1, day);
          if (TLeapData.leapYear(year)) {
            if (day > 27) throw new Error('Неверный день месяца')
          }
          else {
            if (day > 28) throw new Error('Неверный день месяца')
          }
        }
      }
      this.Day = day
      this.Month = month
      this.Year = year
      this.FromCrismas = DateUtils.DaysFromAD(year, month, day)
    } else {
      this.FromCrismas = fromCrismas
      let temp = DateUtils.YMDFromAD(fromCrismas)
      this.Day = temp.day
      this.Month = temp.month
      this.Year = temp.year
    }
  }

  private Includes(arr: number[], value: number): boolean {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) return true
    }
    return false
  }
  
  Greater(o: TLDate): boolean {
    return this.FromCrismas > o.FromCrismas
  }

  GreaterOrEqual(o: TLDate): boolean {
    return this.FromCrismas >= o.FromCrismas
  }

  Less(o: TLDate): boolean {
    return this.FromCrismas < o.FromCrismas
  }

  LessOrEqual(o: TLDate): boolean {
    return this.FromCrismas <= o.FromCrismas
  }

  Equal(o: TLDate): boolean {
    return this.FromCrismas === o.FromCrismas
  }

  AddDays(n: number): TLDate {
    return new TLDate(null, null, null, this.FromCrismas + n)
  }

  AddMonths(n: number): TLDate {
    let rt: TLDate
    let mth: YearMonthDay
    let mmn = DateUtils.makeMonthNumber(this.Year, this.Month, n < 0)
    for (let i = 0; i < n; i++) {
      mth = mmn.next().value
    }
    let day = this.Day
    while (true) {
      try {
        rt = new TLDate(mth.year, mth.month, day)
        break
      }
      catch (ex) {
        day--
        continue
      }
    }
    return rt
  }
}

export abstract class TLEvent {
  Name: string
  Day: number
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
      && o1.Day === o2.Day
    ) rt = true
    return rt
  }
}

export class TLEventDay extends TLEvent {

  public static CreateTLEventDay(name: string, day: number, month: number, year: number, decade: number, century: number): TLEventDay {
    let rt = new TLEventDay(name)
    rt.Day = day
    rt.Month = month
    rt.Year = year
    rt.Decade = decade
    rt.Century = century
    rt.Type = EnumPeriod.day
    return rt
  }

  public static CreateTLEventDay1(name: string, day: number): TLEventDay {
    let ymd = DateUtils.YMDFromAD(day)
    let month: number = DateUtils.getMonthFromYMD(ymd)
    let year: number = DateUtils.getYearFromYMD(ymd)
    let decade: number = DateUtils.getDecadeFromYMD(ymd)
    let century: number = DateUtils.getCenturyFromYMD(ymd)
    return TLEventDay.CreateTLEventDay(name, day, month, year, decade, century)
  }
}

export class TLEventMonth extends TLEvent {

  public static CreateTLEventMonth(name: string, month: number, year: number, decade: number, century: number): TLEventDay {
    let rt = new TLEventDay(name)
    rt.Day = null
    rt.Month = month
    rt.Year = year
    rt.Decade = decade
    rt.Century = century
    rt.Type = EnumPeriod.month
    return rt
  }

  public static CreateTLEventMonth1(name: string, month: number): TLEventMonth {
    let ymd = DateUtils.getYMDFromMonth(month)
    let year: number = DateUtils.getYearFromYMD(ymd)
    let decade: number = DateUtils.getDecadeFromYMD(ymd)
    let century: number = DateUtils.getCenturyFromYMD(ymd)
    return TLEventMonth.CreateTLEventMonth(name, month, year, decade, century)
  }
}

export class TLEventYear extends TLEvent {

  public static CreateTLEventYear(name: string, year: number, decade: number, century: number): TLEventDay {
    let rt = new TLEventDay(name)
    rt.Day = null
    rt.Month = null
    rt.Year = year
    rt.Decade = decade
    rt.Century = century
    rt.Type = EnumPeriod.year
    return rt
  }

  public static CreateTLEventYear1(name: string, year: number): TLEventYear {
    let ymd = DateUtils.getYMDFromYear(year)
    let year: number = DateUtils.getYearFromYMD(ymd)
    let decade: number = DateUtils.getDecadeFromYMD(ymd)
    let century: number = DateUtils.getCenturyFromYMD(ymd)
    return TLEventMonth.CreateTLEventMonth(name, month, year, decade, century)
  }
}

export class TLEventDecade extends TLEvent {
  //constructor(name: string, par1: number, par2?: number) {
  //  super(name)
  //  if (par2 !== undefined) {
  //    let century = par1
  //    let decade = par2
  //    if(decade < 0 || decade > 9) throw Error('Неверный номер десятилетия')
  //    this.Decade = ((Math.abs(century) - 1) * 10 + decade + 1) * (century / Math.abs(century))
  //    this.Century = century;
  //  } else {
  //    let decade = par1
  //    this.Decade = decade;
  //    this.Century = this.CenturyFromDecade(decade)
  //  }
  //  this.Type = EnumPeriod.decade
  //}
  public static CreateTLEventDecade(name: string, decade: number, century: number): TLEventDay {
    let rt = new TLEventDay(name)
    rt.Day = null
    rt.Month = null
    rt.Year = null
    rt.Decade = decade
    rt.Century = century
    rt.Type = EnumPeriod.decade
    return rt
  }
}

export class TLEventCentury extends TLEvent {
  //constructor(name: string, century: number) {
  //  super(name)
  //  this.Century = century
  //  this.Type = EnumPeriod.century
  //}
  public static CreateTLEventCentury(name: string, century: number): TLEventDay {
    let rt = new TLEventDay(name)
    rt.Day = null
    rt.Month = null
    rt.Year = null
    rt.Decade = null
    rt.Century = century
    rt.Type = EnumPeriod.century
    return rt
  }
}

