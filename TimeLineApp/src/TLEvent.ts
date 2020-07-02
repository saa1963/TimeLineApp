import { DateUtils, YearMonthDay } from './dateutils';

export enum EnumPeriod {
  day = 1, month = 2, year = 3, decade = 4, century = 5
}

export class TLEvent {
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

  public toJSON() {
    return Object.assign({}, {
      Name: this.Name,
      Day: this.Day,
      Month: this.Month,
      Year: this.Year,
      Decade: this.Decade,
      Century: this.Century,
      Type: this.Type
    })
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
  static Equal(o1: TLEvent, o2: TLEvent): boolean {
    let rt = false
    if (o1.Century === o2.Century
      && o1.Decade === o2.Decade
      && o1.Year === o2.Year
      && o1.Month === o2.Month
      && o1.Day === o2.Day
    ) rt = true
    return rt
  }

  public Format(): string {
    let rt: string
    switch (this.Type) {
      case EnumPeriod.day:
        rt = DateUtils.formatDay(this.Day)
        break;
      case EnumPeriod.month:
        rt = DateUtils.formatMonth(this.Month)
        break;
      case EnumPeriod.year:
        rt = DateUtils.formatYear(this.Year)
        break;
      case EnumPeriod.decade:
        rt = DateUtils.formatDecade(this.Decade)
        break;
      case EnumPeriod.century:
        rt = DateUtils.formatCentury(this.Century)
        break;
    }
    return rt
  }

  public static Create(
    name: string,
    Century: number,
    Decade: number = null,
    Year: number = null,
    Month: number = null,
    Day: number = null
  ): TLEvent {
    const rt = new TLEvent(name)
    rt.Century = Century
    rt.Decade = Decade
    rt.Year = Year
    rt.Month = Month
    rt.Day = Day
    if (Decade === null) {
      rt.Type = EnumPeriod.century
    } else if (Year === null) {
      rt.Type = EnumPeriod.decade
    } else if (Month === null) {
      rt.Type = EnumPeriod.year
    } else if (Day === null) {
      rt.Type = EnumPeriod.month
    } else {
      rt.Type = EnumPeriod.day
    }
    return rt
  }

  public static Create1(name: string, value: number, type: EnumPeriod) {
    let ymd: YearMonthDay
    let month: number, year: number, decade: number, century: number;
    switch (type) {
      case EnumPeriod.day:
        ymd = DateUtils.YMDFromAD(value)
        month = DateUtils.getMonthFromYMD(ymd)
        year = DateUtils.getYearFromYMD(ymd)
        decade = DateUtils.getDecadeFromYMD(ymd)
        century = DateUtils.getCenturyFromYMD(ymd)
        return TLEvent.Create(name, century, decade, year, month, value)
      case EnumPeriod.month:
        ymd = DateUtils.getYMDFromMonth(value)
        year = DateUtils.getYearFromYMD(ymd)
        decade = DateUtils.getDecadeFromYMD(ymd)
        century = DateUtils.getCenturyFromYMD(ymd)
        return TLEvent.Create(name, century, decade, year, value)
      case EnumPeriod.year:
        ymd = DateUtils.getYMDFromYear(value)
        decade = DateUtils.getDecadeFromYMD(ymd)
        century = DateUtils.getCenturyFromYMD(ymd)
        return TLEvent.Create(name, century, decade, value)
      case EnumPeriod.decade:
        ymd = DateUtils.getYMDFromDecade(value)
        century = DateUtils.getCenturyFromYMD(ymd)
        return TLEvent.Create(name, century, value)
      case EnumPeriod.century:
        return TLEvent.Create(name, value)
    }
  }
}
