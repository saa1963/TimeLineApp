﻿import { DateUtils, YearMonthDay } from './dateutils';
import { TLEvent, EnumPeriod, TLEventDay, TLEventMonth, TLEventYear, TLEventDecade, TLEventCentury } from './TLEvent';
import { SimpleEventDispatcher, ISimpleEvent } from 'ste-simple-events';

export class TLPeriod {
  Id: number = Math.floor(Math.random() * Math.floor(1000000000))
  Name: string = "Новый"
  Begin: TLEvent
  End: TLEvent
  m_BeginDay: number
  m_EndDay: number
  Periods: TLPeriod[] = []
  Parent: TLPeriod
  IsShowAll: boolean = false


  public toJSON() {
    return Object.assign({}, {
      Name: this.Name,
      Begin: this.Begin,
      End: this.End,
      Periods: this.Periods
    })
  }

  /**
   * создает TLPeriod из параметров
   */
  static CreateTLPeriodWithArgs(
    name: string,
    isperiod: boolean,
    begin_type: EnumPeriod,
    begin_dayday: number,
    begin_daymonth: number,
    begin_dayyear: number,
    begin_monthmonth: number,
    begin_monthyear: number,
    begin_year: number,
    begin_decadedecade: number,
    begin_decadecentury: number,
    begin_century: number,
    end_type: EnumPeriod,
    end_dayday: number,
    end_daymonth: number,
    end_dayyear: number,
    end_monthmonth: number,
    end_monthyear: number,
    end_year: number,
    end_decadedecade: number,
    end_decadecentury: number,
    end_century: number
  ): TLPeriod {
    let rt = new TLPeriod()
    rt.Name = name

    let type: EnumPeriod = begin_type
    if (type === EnumPeriod.day) {
      rt.Begin = TLEventDay.CreateTLEventDay(
        "Начало",
        DateUtils.DaysFromAD(begin_dayyear, begin_daymonth, begin_dayday),
        DateUtils.getMonthFromYMD({ year: begin_dayyear, month: begin_daymonth, day: begin_dayday }),
        begin_dayyear,
        DateUtils.getDecadeFromYMD({ year: begin_dayyear, month: begin_daymonth, day: begin_dayday }),
        DateUtils.getCenturyFromYMD({ year: begin_dayyear, month: begin_daymonth, day: begin_dayday })
      );
    }
    else if (type === EnumPeriod.month) {
      rt.Begin = TLEventMonth.CreateTLEventMonth(
        "Начало",
        DateUtils.getMonthFromYMD({ year: begin_monthyear, month: begin_monthmonth, day: 1 }),
        begin_monthyear,
        DateUtils.getDecadeFromYMD({ year: begin_monthyear, month: begin_monthmonth, day: 1 }),
        DateUtils.getCenturyFromYMD({ year: begin_monthyear, month: begin_monthmonth, day: 1 })
      );
    }
    else if (type === EnumPeriod.year) {
      rt.Begin = TLEventYear.CreateTLEventYear(
        "Начало",
        begin_year,
        DateUtils.getDecadeFromYMD({ year: begin_year, month: 1, day: 1 }),
        DateUtils.getCenturyFromYMD({ year: begin_year, month: 1, day: 1 })
      );
    }
    else if (type === EnumPeriod.decade) {
      rt.Begin = TLEventDecade.CreateTLEventDecade(
        "Начало",
        DateUtils.getDecade(begin_decadecentury, begin_decadedecade),
        begin_decadecentury
      );
    }
    else if (type === EnumPeriod.century) {
      rt.Begin = TLEventCentury.CreateTLEventCentury(
        "Начало",
        begin_century
      );
    }
    if (isperiod) {
      type = end_type
      if (type === EnumPeriod.day) {
        rt.End = TLEventDay.CreateTLEventDay(
          "Конец",
          DateUtils.DaysFromAD(end_dayyear, end_daymonth, end_dayday),
          DateUtils.getMonthFromYMD({ year: end_dayyear, month: end_daymonth, day: end_dayday }),
          end_dayyear,
          DateUtils.getDecadeFromYMD({ year: end_dayyear, month: end_daymonth, day: end_dayday }),
          DateUtils.getCenturyFromYMD({ year: end_dayyear, month: end_daymonth, day: end_dayday })
        );
      }
      else if (type === EnumPeriod.month) {
        rt.End = TLEventMonth.CreateTLEventMonth(
          "Конец",
          DateUtils.getMonthFromYMD({ year: end_monthyear, month: end_monthmonth, day: 1 }),
          end_monthyear,
          DateUtils.getDecadeFromYMD({ year: end_monthyear, month: end_monthmonth, day: 1 }),
          DateUtils.getCenturyFromYMD({ year: end_monthyear, month: end_monthmonth, day: 1 })
        );
      }
      else if (type === EnumPeriod.year) {
        rt.End = TLEventYear.CreateTLEventYear(
          "Конец",
          end_year,
          DateUtils.getDecadeFromYMD({ year: end_year, month: 1, day: 1 }),
          DateUtils.getCenturyFromYMD({ year: end_year, month: 1, day: 1 })
        );
      }
      else if (type === EnumPeriod.decade) {
        rt.End = TLEventDecade.CreateTLEventDecade(
          "Конец",
          DateUtils.getDecade(end_decadecentury, end_decadedecade),
          end_decadecentury
        );
      }
      else if (type === EnumPeriod.century) {
        rt.End = TLEventCentury.CreateTLEventCentury(
          "Конец",
          end_century
        );
      }
    } else {
      rt.End = rt.Begin
    }
    rt.m_BeginDay = rt.GetBeginDate();
    rt.m_EndDay = rt.GetEndDate();

    return rt
  }
  /**
   * создает TLPeriod из объекта десериализированного из JSON
   * @param o 
   */
  static CreateTLPeriod(o: any): TLPeriod {
    let rt = new TLPeriod();
    rt.Name = o.Name;
    if (!o.Begin) {
      o.Begin = TLEventCentury.CreateTLEventCentury("Начало", 19)
    }
    let type: EnumPeriod = TLEvent.GetType(o.Begin);
    if (type === EnumPeriod.day) {
      rt.Begin = TLEventDay.CreateTLEventDay(
        o.Begin.Name,
        o.Begin.Day,
        o.Begin.Month,
        o.Begin.Year,
        o.Begin.Decade,
        o.Begin.Century,
      );
    }
    else if (type === EnumPeriod.month) {
      rt.Begin = TLEventMonth.CreateTLEventMonth(o.Begin.Name, o.Begin.Month, o.Begin.Year, o.Begin.Decade, o.Begin.Century);
    }
    else if (type === EnumPeriod.year) {
      rt.Begin = TLEventYear.CreateTLEventYear(o.Begin.Name, o.Begin.Year, o.Begin.Decade, o.Begin.Century);
    }
    else if (type === EnumPeriod.decade) {
      rt.Begin = TLEventDecade.CreateTLEventDecade(o.Begin.Name, o.Begin.Decade, o.Begin.Century);
    }
    else if (type === EnumPeriod.century) {
      rt.Begin = TLEventCentury.CreateTLEventCentury(o.Begin.Name, o.Begin.Century);
    }
    if (!o.End) {
      o.End = TLEventCentury.CreateTLEventCentury("Конец", 21)
    }
    type = TLEvent.GetType(o.End);
    if (type === EnumPeriod.day) {
      rt.End = TLEventDay.CreateTLEventDay(
        o.End.Name,
        o.End.Day,
        o.End.Month,
        o.End.Year,
        o.End.Decade,
        o.End.Century
      );
    }
    else if (type === EnumPeriod.month) {
      rt.End = TLEventMonth.CreateTLEventMonth(o.End.Name, o.End.Month, o.End.Year, o.End.Decade, o.End.Century);
    }
    else if (type === EnumPeriod.year) {
      rt.End = TLEventYear.CreateTLEventYear(o.End.Name, o.End.Year, o.End.Decade, o.End.Century);
    }
    else if (type === EnumPeriod.decade) {
      rt.End = TLEventDecade.CreateTLEventDecade(o.End.Name, o.End.Decade, o.End.Century);
    }
    else if (type === EnumPeriod.century) {
      rt.End = TLEventCentury.CreateTLEventCentury(o.End.Name, o.End.Century);
    }
    rt.m_BeginDay = rt.GetBeginDate();
    rt.m_EndDay = rt.GetEndDate();
    if (o.Periods && o.Periods.length > 0) {
      o.Periods.forEach(o1 => {
        let period = TLPeriod.CreateTLPeriod(o1)
        period.Parent = rt
        rt.Periods.push(period);
      });
    }
    return rt
  }

  public static CreateTLPeriodFromNumber(n: number, period: EnumPeriod) {
    let rt = new TLPeriod();
    rt.Name = ''
    let ymd: YearMonthDay
    switch (period) {
      case EnumPeriod.day:
        ymd = DateUtils.YMDFromAD(n)
        rt.Begin = TLEventDay.CreateTLEventDay1('', n)
        break;
      case EnumPeriod.month:
        ymd = DateUtils.getYMDFromMonth(n)
        rt.Begin = TLEventMonth.CreateTLEventMonth1('', n)
        break;
      case EnumPeriod.year:
        ymd = DateUtils.getYMDFromYear(n)
        rt.Begin = TLEventYear.CreateTLEventYear1('', n)
        break;
      case EnumPeriod.decade:
        ymd = DateUtils.getYMDFromDecade(n)
        rt.Begin = TLEventDecade.CreateTLEventDecade1('', n)
        break;
      case EnumPeriod.century:
        ymd = DateUtils.getYMDFromCentury(n)
        rt.Begin = TLEventCentury.CreateTLEventCentury('', n)
    }
    rt.End = Object.assign({}, rt.Begin)
    rt.Parent = null
    rt.m_BeginDay = rt.GetBeginDate();
    rt.m_EndDay = rt.GetEndDate();
    return rt
  }

  public getRightBoundForPeriod(period: EnumPeriod): number {
    let l2: number
    // [текущий(имеющаяся точность), внешний(точность сравнения)]
    switch (true) {
      case this.End.Type == EnumPeriod.day && period == EnumPeriod.day:
        l2 = this.End.Day
        break;
      case this.End.Type == EnumPeriod.month && period == EnumPeriod.day:
        l2 = DateUtils.RightDayOfMonth(this.End.Month)
        break;
      case this.End.Type == EnumPeriod.year && period == EnumPeriod.day:
        l2 = DateUtils.RightDayOfYear(this.End.Year)
        break;
      case this.End.Type == EnumPeriod.decade && period == EnumPeriod.day:
        l2 = DateUtils.RightDayOfDecade(this.End.Decade)
        break;
      case this.End.Type == EnumPeriod.century && period == EnumPeriod.day:
        l2 = DateUtils.RightDayOfCentury(this.End.Century)
        break;
      case this.End.Type == EnumPeriod.day && period == EnumPeriod.month:
      case this.End.Type == EnumPeriod.month && period == EnumPeriod.month:
        l2 = this.End.Month
        break;
      case this.End.Type == EnumPeriod.year && period == EnumPeriod.month:
        l2 = DateUtils.RightMonthOfYear(this.End.Year)
        break;
      case this.End.Type == EnumPeriod.decade && period == EnumPeriod.month:
        l2 = DateUtils.RightMonthOfDecade(this.End.Decade)
        break;
      case this.End.Type == EnumPeriod.century && period == EnumPeriod.month:
        l2 = DateUtils.RightMonthOfCentury(this.End.Century)
        break;
      case this.End.Type == EnumPeriod.day && period == EnumPeriod.year:
      case this.End.Type == EnumPeriod.month && period == EnumPeriod.year:
      case this.End.Type == EnumPeriod.year && period == EnumPeriod.year:
        l2 = this.End.Year
        break;
      case this.End.Type == EnumPeriod.decade && period == EnumPeriod.year:
        l2 = DateUtils.RightYearOfDecade(this.End.Decade)
        break;
      case this.End.Type == EnumPeriod.century && period == EnumPeriod.year:
        l2 = DateUtils.RightYearOfCentury(this.End.Century)
        break;
      case this.End.Type == EnumPeriod.day && period == EnumPeriod.decade:
      case this.End.Type == EnumPeriod.month && period == EnumPeriod.decade:
      case this.End.Type == EnumPeriod.year && period == EnumPeriod.decade:
      case this.End.Type == EnumPeriod.decade && period == EnumPeriod.decade:
        l2 = this.End.Decade
        break;
      case this.End.Type == EnumPeriod.century && period == EnumPeriod.decade:
        l2 = DateUtils.RightDecadeOfCentury(this.End.Century)
        break;
      case this.End.Type == EnumPeriod.day && period == EnumPeriod.century:
      case this.End.Type == EnumPeriod.month && period == EnumPeriod.century:
      case this.End.Type == EnumPeriod.year && period == EnumPeriod.century:
      case this.End.Type == EnumPeriod.decade && period == EnumPeriod.century:
      case this.End.Type == EnumPeriod.century && period == EnumPeriod.century:
        l2 = this.End.Century
        break;
    }
    return l2
  }

  public getLeftBoundForPeriod(period: EnumPeriod): number {
    let l2: number
    // [текущий(имеющаяся точность), внешний(точность сравнения)]
    switch (true) {
      case this.Begin.Type == EnumPeriod.day && period == EnumPeriod.day:
        l2 = this.Begin.Day
        break;
      case this.Begin.Type == EnumPeriod.month && period == EnumPeriod.day:
        l2 = DateUtils.LeftDayOfMonth(this.Begin.Month)
        break;
      case this.Begin.Type == EnumPeriod.year && period == EnumPeriod.day:
        l2 = DateUtils.LeftDayOfYear(this.Begin.Year)
        break;
      case this.Begin.Type == EnumPeriod.decade && period == EnumPeriod.day:
        l2 = DateUtils.LeftDayOfDecade(this.Begin.Decade)
        break;
      case this.Begin.Type == EnumPeriod.century && period == EnumPeriod.day:
        l2 = DateUtils.LeftDayOfCentury(this.Begin.Century)
        break;
      case this.Begin.Type == EnumPeriod.day && period == EnumPeriod.month:
      case this.Begin.Type == EnumPeriod.month && period == EnumPeriod.month:
        l2 = this.Begin.Month
        break;
      case this.Begin.Type == EnumPeriod.year && period == EnumPeriod.month:
        l2 = DateUtils.LeftMonthOfYear(this.Begin.Year)
        break;
      case this.Begin.Type == EnumPeriod.decade && period == EnumPeriod.month:
        l2 = DateUtils.LeftMonthOfDecade(this.Begin.Decade)
        break;
      case this.Begin.Type == EnumPeriod.century && period == EnumPeriod.month:
        l2 = DateUtils.LeftMonthOfCentury(this.Begin.Century)
        break;
      case this.Begin.Type == EnumPeriod.day && period == EnumPeriod.year:
      case this.Begin.Type == EnumPeriod.month && period == EnumPeriod.year:
      case this.Begin.Type == EnumPeriod.year && period == EnumPeriod.year:
        l2 = this.Begin.Year
        break;
      case this.Begin.Type == EnumPeriod.decade && period == EnumPeriod.year:
        l2 = DateUtils.LeftYearOfDecade(this.Begin.Decade)
        break;
      case this.Begin.Type == EnumPeriod.century && period == EnumPeriod.year:
        l2 = DateUtils.LeftYearOfCentury(this.Begin.Century)
        break;
      case this.Begin.Type == EnumPeriod.day && period == EnumPeriod.decade:
      case this.Begin.Type == EnumPeriod.month && period == EnumPeriod.decade:
      case this.Begin.Type == EnumPeriod.year && period == EnumPeriod.decade:
      case this.Begin.Type == EnumPeriod.decade && period == EnumPeriod.decade:
        l2 = this.Begin.Decade
        break;
      case this.Begin.Type == EnumPeriod.century && period == EnumPeriod.decade:
        l2 = DateUtils.LeftDecadeOfCentury(this.Begin.Century)
        break;
      case this.Begin.Type == EnumPeriod.day && period == EnumPeriod.century:
      case this.Begin.Type == EnumPeriod.month && period == EnumPeriod.century:
      case this.Begin.Type == EnumPeriod.year && period == EnumPeriod.century:
      case this.Begin.Type == EnumPeriod.decade && period == EnumPeriod.century:
      case this.Begin.Type == EnumPeriod.century && period == EnumPeriod.century:
        l2 = this.Begin.Century
        break;
    }
    return l2
  }
  
  public IsIntersectIntervalsForPeriod(l1: number, r1: number, period: EnumPeriod): boolean {
    let l2: number = this.getLeftBoundForPeriod(period)
    let r2: number = this.getRightBoundForPeriod(period)
    let rt: boolean = TLPeriod.isIntersectIntervals(l1, r1, l2, r2)
    return rt
  }

  /**
   * Есть ли пересечение 2-х целочисленных интервалов
   * @param l1 левая граница интервал 1
   * @param r1 правая граница интервал 1
   */
  IsIntersectIntervals(l1: number, r1: number): boolean {
    return TLPeriod.isIntersectIntervals(l1, r1, this.m_BeginDay, this.m_EndDay)
  }

  static isIntersectIntervals(
    l1: number, r1: number,
    l2: number, r2: number): boolean {
    let l = Math.min(l1, l2);
    let r = Math.max(r1, r2);
    let s = r - l;
    return s <= (r1 - l1) + (r2 - l2);
  }

  /**
   * Является ли интервал внутренним по отношению к другому
   * @param l1 - внешний интервал левая граница
   * @param r1 - внешний интервал правая граница
   * @param l2 - внутренний интервал левая граница
   * @param r2 - внутренний интервал правая граница
   */
  static isInnerInterval(
    l1: number, r1: number,
    l2: number, r2: number): boolean {
    if (l1 > r1 || l2 > r2) throw "Неверно заданы интервалы"
    return l2 >= l1 && l2 <= r1 && r2 >= l1 && r2 <= r1
  }

  /**
   * Является ли период подмножеством другого периода, который передается параметром
   * @param period
   * @param periodType
   */
  IsSubsetOf(period: TLPeriod, periodType: EnumPeriod) {
    return TLPeriod.isInnerInterval(
      period.getLeftBoundForPeriod(periodType),
      period.getRightBoundForPeriod(periodType),
      this.getLeftBoundForPeriod(periodType),
      this.getRightBoundForPeriod(periodType)
    )
  }

  /**
   * Первый день интервала
   * */
  private GetBeginDate(): number {
    let dt: number;
    switch (this.Begin.Type) {
      case EnumPeriod.day:
        dt = this.Begin.Day;
        break;
      case EnumPeriod.month:
        dt = DateUtils.FirstDayOfMonth(this.Begin.Month);
        break;
      case EnumPeriod.year:
        dt = DateUtils.FirstDayOfYear(this.Begin.Year);
        break;
      case EnumPeriod.decade:
        dt = DateUtils.FirstDayOfDecade(this.Begin.Decade);
        break;
      case EnumPeriod.century:
        dt = DateUtils.FirstDayOfCentury(this.Begin.Century);
        break;
    }
    return dt;
  }
  /**
   * Последний день интервала
   * */
  private GetEndDate(): number {
    let dt: number;
    switch (this.End.Type) {
      case EnumPeriod.day:
        dt = this.End.Day;
        break;
      case EnumPeriod.month:
        dt = DateUtils.FirstDayOfMonth(this.End.Month + 1) - 1;
        break;
      case EnumPeriod.year:
        dt = DateUtils.FirstDayOfYear(this.End.Year + 1) - 1;
        break;
      case EnumPeriod.decade:
        dt = DateUtils.FirstDayOfDecade(this.End.Decade + 1) - 1;
        break;
      case EnumPeriod.century:
        dt = DateUtils.FirstDayOfCentury(this.End.Century + 1) - 1;
        break;
    }
    return dt;
  }

  public Add(model: TLPeriod): number {
    let rt = this.Periods.push(model)
    this.e_AddPeriod.dispatch(model)
    return rt
  }

  public Remove(i: number): boolean {
    if (!this.validIndex(i)) throw "Неверный индекс"
    this.Periods.splice(i, 1)
    this.e_RemovePeriod.dispatch(i)
    return true
  }

  public get Count(): number {
    return this.Periods.length
  }

  public get Items(): TLPeriod[] {
    return this.Periods
  }

  public Item(i: number): TLPeriod {
    if (!this.validIndex(i)) throw "Неверный индекс"
    return this.Periods[i]
  }

  public get IsPeriod() {
    let rt: boolean
    if (this.Begin.Type === this.End.Type) {
      switch (this.Begin.Type) {
        case EnumPeriod.day:
          rt = this.Begin.Day != this.End.Day
          return
          break;
        case EnumPeriod.month:
          rt = this.Begin.Month != this.End.Month
          break;
        case EnumPeriod.year:
          rt = this.Begin.Year != this.End.Year
          break;
        case EnumPeriod.decade:
          rt = this.Begin.Decade != this.End.Decade
          break;
        case EnumPeriod.century:
          rt = this.Begin.Century != this.End.Century
          break;
      }
    } else {
      rt = true
    }
    return rt
  }

  private validIndex(i: number): boolean {
    if (!this.Periods) return false
    if (this.Periods.length === 0) return false
    if (i < 0 || i >= this.Periods.length) return false
    return true
  }

  private e_AddPeriod = new SimpleEventDispatcher<TLPeriod>();
  public get evAddPeriod(): ISimpleEvent<TLPeriod> {
    return this.e_AddPeriod.asEvent();
  }

  private e_RemovePeriod = new SimpleEventDispatcher<number>();
  public get evRemovePeriod(): ISimpleEvent<number> {
    return this.e_RemovePeriod.asEvent();
  }
}


