"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateutils_1 = require("./dateutils");
var EnumPeriod;
(function (EnumPeriod) {
    EnumPeriod[EnumPeriod["day"] = 1] = "day";
    EnumPeriod[EnumPeriod["month"] = 2] = "month";
    EnumPeriod[EnumPeriod["year"] = 3] = "year";
    EnumPeriod[EnumPeriod["decade"] = 4] = "decade";
    EnumPeriod[EnumPeriod["century"] = 5] = "century";
})(EnumPeriod = exports.EnumPeriod || (exports.EnumPeriod = {}));
class TLDate {
    constructor(year, month, day, fromCrismas) {
        if (fromCrismas === undefined) {
            if (year == 0)
                throw new Error('Год равен 0');
            if (month > 12 || month < 1)
                throw new Error('Неверный месяц месяца');
            if (day < 1)
                throw new Error('День меньше 1');
            if (this.Includes([1, 3, 5, 7, 8, 10, 12], month)) {
                if (day > 31)
                    throw new Error('Неверный день месяца');
            }
            else if (this.Includes([4, 6, 9, 11], month)) {
                if (day > 30)
                    throw new Error('Неверный день месяца');
            }
            else {
                if (day > 29) {
                    throw new Error('Неверный день месяца');
                }
                if (year >= 1 && year <= 9999) {
                    var dt = new Date(year, month - 1, day);
                    if (dateutils_1.TLeapData.leapYear(year)) {
                        if (day > 27)
                            throw new Error('Неверный день месяца');
                    }
                    else {
                        if (day > 28)
                            throw new Error('Неверный день месяца');
                    }
                }
            }
            this.Day = day;
            this.Month = month;
            this.Year = year;
            this.FromCrismas = dateutils_1.DateUtils.DaysFromAD(year, month, day);
        }
        else {
            this.FromCrismas = fromCrismas;
            let temp = dateutils_1.DateUtils.YMDFromAD(fromCrismas);
            this.Day = temp.day;
            this.Month = temp.month;
            this.Year = temp.year;
        }
    }
    Includes(arr, value) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value)
                return true;
        }
        return false;
    }
    Greater(o) {
        return this.FromCrismas > o.FromCrismas;
    }
    GreaterOrEqual(o) {
        return this.FromCrismas >= o.FromCrismas;
    }
    Less(o) {
        return this.FromCrismas < o.FromCrismas;
    }
    LessOrEqual(o) {
        return this.FromCrismas <= o.FromCrismas;
    }
    Equal(o) {
        return this.FromCrismas === o.FromCrismas;
    }
    AddDays(n) {
        return new TLDate(null, null, null, this.FromCrismas + n);
    }
    AddMonths(n) {
        let rt;
        let mth;
        let mmn = dateutils_1.DateUtils.makeMonthNumber(this.Year, this.Month, n < 0);
        for (let i = 0; i < n; i++) {
            mth = mmn.next().value;
        }
        let day = this.Day;
        while (true) {
            try {
                rt = new TLDate(mth.year, mth.month, day);
                break;
            }
            catch (ex) {
                day--;
                continue;
            }
        }
        return rt;
    }
}
class TLEvent {
    constructor(name) {
        this.Name = name;
        this.Day = null;
        this.Month = null;
        this.Year = null;
        this.Decade = null;
        this.Century = null;
    }
    DecadeFromYear(year) {
        return year / 10 + (year / Math.abs(year));
    }
    CenturyFromDecade(decade) {
        return decade / 10 + (decade / Math.abs(decade));
    }
    YearFromMonth(month) {
        return (month - 1) / 12 + (month / Math.abs(month));
    }
    static GetType(o) {
        if (o.Day !== null)
            return EnumPeriod.day;
        if (o.Month !== null)
            return EnumPeriod.month;
        if (o.Year !== null)
            return EnumPeriod.year;
        if (o.Decade !== null)
            return EnumPeriod.decade;
        if (o.Century !== null)
            return EnumPeriod.century;
    }
    /**
     * Попадает ли событие this в текущее значение ОВ
     * @param period
     * Текущая дробность отображения для ЛВ
     * @param vl
     * Текущее значение ОВ, которое в данный момент отрисовывается
     */
    static Equal(o1, o2) {
        let rt = false;
        if (o1.Century === o2.Century
            && o1.Decade === o2.Decade
            && o1.Year === o2.Year
            && o1.Month === o2.Month
            && o1.Day === o2.Day)
            rt = true;
        return rt;
    }
}
exports.TLEvent = TLEvent;
class TLEventDay extends TLEvent {
    constructor(name, day) {
        super(name);
        this.Day = day;
        let o = dateutils_1.DateUtils.YMDFromAD(day);
        this.Month = ((Math.abs(o.year) - 1) * 12 + o.month) * (o.year / Math.abs(o.year));
        this.Year = o.year;
        this.Decade = this.DecadeFromYear(o.year);
        this.Century = this.CenturyFromDecade(this.Decade);
        this.Type = EnumPeriod.day;
    }
}
exports.TLEventDay = TLEventDay;
class TLEventMonth extends TLEvent {
    constructor(name, par1, par2) {
        super(name);
        if (par2 !== undefined) {
            let year = par1;
            let month = par2;
            this.Month = ((Math.abs(year) - 1) * 12 + month) * (year / Math.abs(year));
            this.Year = year;
            this.Decade = this.DecadeFromYear(year);
            this.Century = this.CenturyFromDecade(this.Decade);
        }
        else {
            let month = par1;
            this.Month = month;
            this.Year = this.YearFromMonth(month);
            this.Decade = this.DecadeFromYear(this.Year);
            this.Century = this.CenturyFromDecade(this.Decade);
        }
        this.Type = EnumPeriod.month;
    }
}
exports.TLEventMonth = TLEventMonth;
class TLEventYear extends TLEvent {
    constructor(name, year) {
        super(name);
        this.Year = year;
        this.Decade = this.DecadeFromYear(year);
        this.Century = this.CenturyFromDecade(this.Decade);
        this.Type = EnumPeriod.year;
    }
}
exports.TLEventYear = TLEventYear;
class TLEventDecade extends TLEvent {
    constructor(name, par1, par2) {
        super(name);
        if (par2 !== undefined) {
            let century = par1;
            let decade = par2;
            if (decade < 0 || decade > 9)
                throw Error('Неверный номер десятилетия');
            this.Decade = ((Math.abs(century) - 1) * 10 + decade + 1) * (century / Math.abs(century));
            this.Century = century;
        }
        else {
            let decade = par1;
            this.Decade = decade;
            this.Century = this.CenturyFromDecade(decade);
        }
        this.Type = EnumPeriod.decade;
    }
}
exports.TLEventDecade = TLEventDecade;
class TLEventCentury extends TLEvent {
    constructor(name, century) {
        super(name);
        this.Century = century;
        this.Type = EnumPeriod.century;
    }
}
exports.TLEventCentury = TLEventCentury;
//# sourceMappingURL=TLEvent.js.map