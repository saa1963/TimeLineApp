"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateutils_1 = require("./dateutils");
const TLEvent_1 = require("./TLEvent");
class TLPeriod {
    /**
     * создает TLPeriod из объекта десериализированного из JSON
     * @param o
     */
    static CreateTLPeriod(o) {
        let rt;
        rt.Name = o.Name;
        let type;
        type = TLEvent_1.TLEvent.GetType(o.Begin);
        if (type === TLEvent_1.EnumPeriod.day) {
            rt.Begin = new TLEvent_1.TLEventDay(o.Begin.Name, o.Begin.Day);
        }
        else if (type === TLEvent_1.EnumPeriod.month) {
            rt.Begin = new TLEvent_1.TLEventMonth(o.Begin.Name, o.Begin.Month);
        }
        else if (type === TLEvent_1.EnumPeriod.year) {
            rt.Begin = new TLEvent_1.TLEventYear(o.Begin.Name, o.Begin.Year);
        }
        else if (type === TLEvent_1.EnumPeriod.decade) {
            rt.Begin = new TLEvent_1.TLEventDecade(o.Begin.Name, o.Begin.Decade);
        }
        else if (type === TLEvent_1.EnumPeriod.century) {
            rt.Begin = new TLEvent_1.TLEventCentury(o.Begin.Name, o.Begin.Century);
        }
        type = TLEvent_1.TLEvent.GetType(o.End);
        if (type === TLEvent_1.EnumPeriod.day) {
            rt.End = new TLEvent_1.TLEventDay(o.End.Name, o.End.Day);
        }
        else if (type === TLEvent_1.EnumPeriod.month) {
            rt.End = new TLEvent_1.TLEventMonth(o.End.Name, o.End.Month);
        }
        else if (type === TLEvent_1.EnumPeriod.year) {
            rt.End = new TLEvent_1.TLEventYear(o.End.Name, o.End.Year);
        }
        else if (type === TLEvent_1.EnumPeriod.decade) {
            rt.End = new TLEvent_1.TLEventDecade(o.End.Name, o.End.Decade);
        }
        else if (type === TLEvent_1.EnumPeriod.century) {
            rt.End = new TLEvent_1.TLEventCentury(o.End.Name, o.End.Century);
        }
        rt.m_BeginDay = rt.GetBeginDate();
        rt.m_EndDay = rt.GetEndDate();
        return rt;
    }
    /**
     * Попадает текущее значение ОВ в период this
     * @param period
     * Текущая дробность отображения для ЛВ
     * @param vl
     * Текущее значение ОВ, которое в данный момент отрисовывается
     */
    Contains(period, vl) {
        let rt = false;
        switch (period) {
            case TLEvent_1.EnumPeriod.day:
                rt = this.ContainsDay(vl);
                break;
            case TLEvent_1.EnumPeriod.month:
                rt = this.ContainsMonth(vl);
                break;
            case TLEvent_1.EnumPeriod.year:
                rt = this.ContainsYear(vl);
                break;
            case TLEvent_1.EnumPeriod.decade:
                //rt = (vl === this.Decade)
                break;
            case TLEvent_1.EnumPeriod.century:
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
    ContainsYear(year) {
        return this.IsIntersectIntervals(dateutils_1.DateUtils.FirstDayOfYear(year), dateutils_1.DateUtils.LastDayOfYear(year));
    }
    /**
     * Содержит ли this (текущий период) ОВ vl
     * @param vl - месяц от РХ
     */
    ContainsMonth(month) {
        return this.IsIntersectIntervals(dateutils_1.DateUtils.FirstDayOfMonth(month), dateutils_1.DateUtils.LastDayOfMonth(month));
    }
    /**
     * Есть ли пересечение 2-х целочисленных интервалов
     * @param l1 левая граница интервал 1
     * @param r1 правая граница интервал 1
     */
    IsIntersectIntervals(l1, r1) {
        return TLPeriod.isIntersectIntervals(l1, r1, this.m_BeginDay, this.m_EndDay);
    }
    static isIntersectIntervals(l1, r1, l2, r2) {
        let l = Math.min(l1, l2);
        let r = Math.max(r1, r2);
        let s = r - l;
        return s <= (r1 - l1) + (r2 - l2);
    }
    /**
     * Первый день интервала
     * */
    GetBeginDate() {
        let dt;
        switch (this.Begin.Type) {
            case TLEvent_1.EnumPeriod.day:
                dt = this.Begin.Day;
                break;
            case TLEvent_1.EnumPeriod.month:
                dt = dateutils_1.DateUtils.FirstDayOfMonth(this.Begin.Month);
                break;
            case TLEvent_1.EnumPeriod.year:
                dt = dateutils_1.DateUtils.FirstDayOfYear(this.Begin.Year);
                break;
            case TLEvent_1.EnumPeriod.decade:
                dt = dateutils_1.DateUtils.FirstDayOfDecade(this.Begin.Decade);
                break;
            case TLEvent_1.EnumPeriod.century:
                dt = dateutils_1.DateUtils.FirstDayOfCentury(this.Begin.Century);
                break;
        }
        return dt;
    }
    /**
     * Последний день интервала
     * */
    GetEndDate() {
        let dt;
        switch (this.End.Type) {
            case TLEvent_1.EnumPeriod.day:
                dt = this.End.Day;
                break;
            case TLEvent_1.EnumPeriod.month:
                dt = dateutils_1.DateUtils.FirstDayOfMonth(this.End.Month + 1) - 1;
                break;
            case TLEvent_1.EnumPeriod.year:
                dt = dateutils_1.DateUtils.FirstDayOfYear(this.End.Year + 1) - 1;
                break;
            case TLEvent_1.EnumPeriod.decade:
                dt = dateutils_1.DateUtils.FirstDayOfDecade(this.End.Decade + 1) - 1;
                break;
            case TLEvent_1.EnumPeriod.century:
                dt = dateutils_1.DateUtils.FirstDayOfCentury(this.End.Century + 1) - 1;
                break;
        }
        return dt;
    }
    /**
     *
     * @param day отображаемый ОВ день от РХ
     * @param this объект насчет которого принимается решение включать или нет
     */
    ContainsDay(day) {
        return day >= this.m_BeginDay && day <= this.m_EndDay;
    }
}
exports.TLPeriod = TLPeriod;
//# sourceMappingURL=TLPeriod.js.map