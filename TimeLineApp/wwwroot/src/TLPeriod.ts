import { DateUtils } from './dateutils';
import { TLEvent, EnumPeriod, TLEventDay, TLEventMonth, TLEventYear, TLEventDecade, TLEventCentury } from './TLEvent';
export class TLPeriod {
    Name: string;
    Begin: TLEvent;
    End: TLEvent;
    m_BeginDay: number;
    m_EndDay: number;
    constructor(o: TLPeriod) {
        this.Name = o.Name;
        let type: EnumPeriod;
        type = TLEvent.GetType(o.Begin);
        if (type === EnumPeriod.day) {
            this.Begin = new TLEventDay(o.Begin.Name, o.Begin.Day);
        }
        else if (type === EnumPeriod.month) {
            this.Begin = new TLEventMonth(o.Begin.Name, o.Begin.Month);
        }
        else if (type === EnumPeriod.year) {
            this.Begin = new TLEventYear(o.Begin.Name, o.Begin.Year);
        }
        else if (type === EnumPeriod.decade) {
            this.Begin = new TLEventDecade(o.Begin.Name, o.Begin.Decade);
        }
        else if (type === EnumPeriod.century) {
            this.Begin = new TLEventCentury(o.Begin.Name, o.Begin.Century);
        }
        type = TLEvent.GetType(o.End);
        if (type === EnumPeriod.day) {
            this.End = new TLEventDay(o.End.Name, o.End.Day);
        }
        else if (type === EnumPeriod.month) {
            this.End = new TLEventMonth(o.End.Name, o.End.Month);
        }
        else if (type === EnumPeriod.year) {
            this.End = new TLEventYear(o.End.Name, o.End.Year);
        }
        else if (type === EnumPeriod.decade) {
            this.End = new TLEventDecade(o.End.Name, o.End.Decade);
        }
        else if (type === EnumPeriod.century) {
            this.End = new TLEventCentury(o.End.Name, o.End.Century);
        }
        this.m_BeginDay = this.GetBeginDate();
        this.m_EndDay = this.GetEndDate();
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
                //rt = (vl === this.Decade)
                break;
            case EnumPeriod.century:
                //rt = (vl === this.Century)
                break;
            default:
                break;
        }
        return rt;
    }
    /**
     * Содержит ли this ОВ vl
     * @param vl
     */
    ContainsYear(year: number): boolean {
        return this.IsIntersectIntervals(DateUtils.FirstDayOfYear(year), DateUtils.LastDayOfYear(year), this.m_BeginDay, this.m_EndDay);
    }
    /**
     * Содержит ли this (текущий период) ОВ vl
     * @param vl - месяц от РХ
     */
    ContainsMonth(month: number): boolean {
        return this.IsIntersectIntervals(DateUtils.FirstDayOfMonth(month), DateUtils.LastDayOfMonth(month), this.m_BeginDay, this.m_EndDay);
    }
    /**
     * Есть ли пересечение 2-х целочисленных интервалов
     * @param l1 левая граница интервал 1
     * @param r1 правая граница интервал 1
     * @param l2 левая граница интервал 2
     * @param r2 правая граница интервал 2
     */
    IsIntersectIntervals(l1: number, r1: number, l2: number, r2: number): boolean {
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
