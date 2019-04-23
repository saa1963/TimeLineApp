﻿import { DateUtils, YearMonth } from './dateutils';

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
          if (DateUtils.leapYear(year)) {
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
    let mth: YearMonth
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
  constructor(name: string, day: number) {
    super(name);
    this.Day = day
    let o = DateUtils.YMDFromAD(day)
    this.Month = ((Math.abs(o.year) - 1) * 12 + o.month) * (o.year / Math.abs(o.year));
    this.Year = o.year;
    this.Decade = this.DecadeFromYear(o.year)
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
  m_BeginDay: number
  m_EndDay: number
  constructor(o: TLPeriod) {
    this.Name = o.Name;
    let type: EnumPeriod
    type = TLEvent.GetType(o.Begin)
    if (type === EnumPeriod.day) {
      this.Begin = new TLEventDay(o.Begin.Name, o.Begin.Day)
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
      this.End = new TLEventDay(o.End.Name, o.End.Day)
    } else if (type === EnumPeriod.month) {
      this.End = new TLEventMonth(o.End.Name, o.End.Month)
    } else if (type === EnumPeriod.year) {
      this.End = new TLEventYear(o.End.Name, o.End.Year)
    } else if (type === EnumPeriod.decade) {
      this.End = new TLEventDecade(o.End.Name, o.End.Decade)
    } else if (type === EnumPeriod.century) {
      this.End = new TLEventCentury(o.End.Name, o.End.Century)
    }
    this.m_BeginDay = this.GetBeginDate()
    this.m_EndDay = this.GetEndDate()
  }
  /**
   * Попадает текущее значение ОВ в период this
   * @param period
   * Текущая дробность отображения для ЛВ
   * @param vl
   * Текущее значение ОВ, которое в данный момент отрисовывается
   */
  Contains(period: EnumPeriod, vl: number): boolean {
    let rt = false
    switch (period) {
      case EnumPeriod.day:
        rt = this.ContainsDay(vl)
        break
      case EnumPeriod.month:
        rt = this.ContainsMonth(vl)
        break
      case EnumPeriod.year:
        rt = this.ContainsYear(vl)
        break
      case EnumPeriod.decade:
        //rt = (vl === this.Decade)
        break
      case EnumPeriod.century:
        //rt = (vl === this.Century)
        break
      default:
        break
    }
    return rt
  }
  /**
   * Содержит ли this ОВ vl
   * @param vl
   */
  ContainsYear(year: number): boolean {
    return this.IsIntersectIntervals(
      DateUtils.FirstDayOfYear(year),
      DateUtils.LastDayOfYear(year),
      this.m_BeginDay,
      this.m_EndDay)
  }
  /**
   * Содержит ли this (текущий период) ОВ vl
   * @param vl - месяц от РХ
   */
  ContainsMonth(month: number): boolean {
    return this.IsIntersectIntervals(
      DateUtils.FirstDayOfMonth(month),
      DateUtils.LastDayOfMonth(month),
      this.m_BeginDay,
      this.m_EndDay)
  }
  /**
   * Есть ли пересечение 2-х целочисленных интервалов
   * @param l1 левая граница интервал 1
   * @param r1 правая граница интервал 1
   * @param l2 левая граница интервал 2
   * @param r2 правая граница интервал 2
   */
  IsIntersectIntervals(l1: number, r1: number, l2: number, r2: number): boolean {
    let l = Math.min(l1, l2)
    let r = Math.max(r1, r2)
    let s = r - l
    return s <= (r1 - l1) + (r2 - l2)
  }
  /**
   * Первый день интервала
   * */
  private GetBeginDate(): number {
    let dt: number
    switch (this.Begin.Type) {
      case EnumPeriod.day:
        dt = this.Begin.Day
        break
      case EnumPeriod.month:
        dt = DateUtils.FirstDayOfMonth(this.Begin.Month)
        break
      case EnumPeriod.year:
        dt = DateUtils.FirstDayOfYear(this.Begin.Year)
        break
      case EnumPeriod.decade:
        dt = DateUtils.FirstDayOfDecade(this.Begin.Decade)
        break
      case EnumPeriod.century:
        dt = DateUtils.FirstDayOfCentury(this.Begin.Century)
        break
    }
    return dt
  }
  /**
   * Последний день интервала
   * */
  private GetEndDate(): number {
    let dt: number
    switch (this.End.Type) {
      case EnumPeriod.day:
        dt = this.End.Day
        break
      case EnumPeriod.month:
        dt = DateUtils.FirstDayOfMonth(this.End.Month + 1) - 1
        break
      case EnumPeriod.year:
        dt = DateUtils.FirstDayOfYear(this.End.Year + 1) - 1
        break
      case EnumPeriod.decade:
        dt = DateUtils.FirstDayOfDecade(this.End.Decade + 1) - 1
        break
      case EnumPeriod.century:
        dt = DateUtils.FirstDayOfCentury(this.End.Century + 1) - 1
        break
    }
    return dt
  }
  /**
   * 
   * @param day отображаемый ОВ день от РХ
   * @param this объект насчет которого принимается решение включать или нет
   */
  private ContainsDay(day: number): boolean {
    return day >= this.m_BeginDay && day <= this.m_EndDay
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
