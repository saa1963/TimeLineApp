import { DateUtils, YearMonthDay } from './dateutils';
import { TLEvent, EnumPeriod, TLEventDay, TLEventMonth, TLEventYear, TLEventDecade, TLEventCentury } from './TLEvent';

export class TLPeriod {
    Name: string;
    Begin: TLEvent;
    End: TLEvent;
    m_BeginDay: number;
    m_EndDay: number;
  /**
   * создает TLPeriod из объекта десериализированного из JSON
   * @param o 
   */
  static CreateTLPeriod(o: any): TLPeriod {
    let rt = new TLPeriod();
    rt.Name = o.Name;
    let type: EnumPeriod = TLEvent.GetType(o.Begin);
    if (type === EnumPeriod.day) {
      rt.Begin = TLEventDay.CreateTLEventDay(
        o.Begin.Name,
        DateUtils.DaysFromAD(o.Begin.Day.Year, o.Begin.Day.Month, o.Begin.Day.Day),
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
    type = TLEvent.GetType(o.End);
    if (type === EnumPeriod.day) {
      rt.End = TLEventDay.CreateTLEventDay(
        o.End.Name,
        DateUtils.DaysFromAD(o.End.Day.Year, o.End.Day.Month, o.End.Day.Day),
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
    return rt
  }
    /**
     * Попадает текущее значение ОВ в период this
     * @param period
     * Текущая дробность отображения для ЛВ
     * @param vl
     * Текущее значение ОВ, которое в данный момент отрисовывается
     */
    Contains(period: EnumPeriod, vl: number): boolean {
        let rt = false;
        switch (period) {
            case EnumPeriod.day:
                rt = this.ContainsDay(vl);
                break;
            case EnumPeriod.month:
                rt = this.ContainsMonth(vl);
                break;
            case EnumPeriod.year:
                rt = this.ContainsYear(vl);
                break;
            case EnumPeriod.decade:
                rt = this.ContainsDecade(vl)
                break;
            case EnumPeriod.century:
                rt = this.ContainsYear(vl)
                break;
            default:
                break;
        }
        return rt;
  }
  protected ContainsCentury(century: number): boolean {
    return this.IsIntersectIntervals(DateUtils.FirstDayOfCentury(century), DateUtils.LastDayOfCentury(century));
  }
  /**
   * Содержит ли this ОВ vl
   * @param decade
   */
  protected ContainsDecade(decade: number): boolean {
    return this.IsIntersectIntervals(DateUtils.FirstDayOfDecade(decade), DateUtils.LastDayOfDecade(decade));
  }
    /**
     * Содержит ли this ОВ vl
     * @param vl
     */
  protected ContainsYear(year: number): boolean {
    let first: number = DateUtils.FirstDayOfYear(year)
    let last: number = DateUtils.LastDayOfYear(year)
        return this.IsIntersectIntervals(first, last)
    }
    /**
     * Содержит ли this (текущий период) ОВ vl
     * @param vl - месяц от РХ
     */
    protected ContainsMonth(month: number): boolean {
        return this.IsIntersectIntervals(DateUtils.FirstDayOfMonth(month), DateUtils.LastDayOfMonth(month));
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
    /**
     *
     * @param day отображаемый ОВ день от РХ
     * @param this объект насчет которого принимается решение включать или нет
     */
    private ContainsDay(day: number): boolean {
        return day >= this.m_BeginDay && day <= this.m_EndDay;
    }
}


