"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dateutils_1 = require("./dateutils");
var EnumPeriod;
(function (EnumPeriod) {
    EnumPeriod[EnumPeriod["day"] = 1] = "day";
    EnumPeriod[EnumPeriod["month"] = 2] = "month";
    EnumPeriod[EnumPeriod["year"] = 3] = "year";
    EnumPeriod[EnumPeriod["decade"] = 4] = "decade";
    EnumPeriod[EnumPeriod["century"] = 5] = "century";
})(EnumPeriod = exports.EnumPeriod || (exports.EnumPeriod = {}));
var TLDate = /** @class */ (function () {
    function TLDate(year, month, day, fromCrismas) {
        if (fromCrismas === undefined) {
            if (year == 0)
                throw new Error('Год равен 0');
            if (month > 12 || month < 1)
                throw new Error('Неверный месяц месяца');
            if (day < 1)
                throw new Error('День меньше 1');
            if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
                if (day > 31)
                    throw new Error('Неверный день месяца');
            }
            else if ([4, 6, 9, 11].includes(month)) {
                if (day > 30)
                    throw new Error('Неверный день месяца');
            }
            else {
                if (day > 29)
                    throw new Error('Неверный день месяца');
                if (year >= 1 && year <= 9999) {
                    var dt = new Date(year, month - 1, day);
                    if (dateutils_1.DateUtils.leapYear(year)) {
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
        }
    }
    TLDate.prototype.Greater = function (o) {
        return this.FromCrismas > o.FromCrismas;
    };
    TLDate.prototype.GreaterOrEqual = function (o) {
        return this.FromCrismas >= o.FromCrismas;
    };
    TLDate.prototype.Less = function (o) {
        return this.FromCrismas < o.FromCrismas;
    };
    TLDate.prototype.LessOrEqual = function (o) {
        return this.FromCrismas <= o.FromCrismas;
    };
    TLDate.prototype.Equal = function (o) {
        return this.FromCrismas === o.FromCrismas;
    };
    return TLDate;
}());
var TLEvent = /** @class */ (function () {
    function TLEvent(name) {
        this.Name = name;
        this.Day = null;
        this.Month = null;
        this.Year = null;
        this.Decade = null;
        this.Century = null;
    }
    TLEvent.prototype.DecadeFromYear = function (year) {
        return year / 10 + (year / Math.abs(year));
    };
    TLEvent.prototype.CenturyFromDecade = function (decade) {
        return decade / 10 + (decade / Math.abs(decade));
    };
    TLEvent.prototype.YearFromMonth = function (month) {
        return (month - 1) / 12 + (month / Math.abs(month));
    };
    TLEvent.GetType = function (o) {
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
    };
    /**
     * Попадает ли событие this в текущее значение ОВ
     * @param period
     * Текущая дробность отображения для ЛВ
     * @param vl
     * Текущее значение ОВ, которое в данный момент отрисовывается
     */
    TLEvent.Equal = function (o1, o2) {
        var rt = false;
        if (o1.Century === o2.Century
            && o1.Decade === o2.Decade
            && o1.Year === o2.Year
            && o1.Month === o2.Month
            && o1.Day.Year === o2.Day.Year
            && o1.Day.Month === o2.Day.Month
            && o1.Day.Day === o2.Day.Day)
            rt = true;
        return rt;
    };
    return TLEvent;
}());
exports.TLEvent = TLEvent;
var TLEventDay = /** @class */ (function (_super) {
    __extends(TLEventDay, _super);
    function TLEventDay(name, year, month, day) {
        var _this = _super.call(this, name) || this;
        _this.Day = new TLDate(year, month, day);
        _this.Month = ((Math.abs(year) - 1) * 12 + month) * (year / Math.abs(year));
        _this.Year = year;
        _this.Decade = _this.DecadeFromYear(year);
        _this.Century = _this.CenturyFromDecade(_this.Decade);
        _this.Type = EnumPeriod.day;
        return _this;
    }
    return TLEventDay;
}(TLEvent));
exports.TLEventDay = TLEventDay;
var TLEventMonth = /** @class */ (function (_super) {
    __extends(TLEventMonth, _super);
    function TLEventMonth(name, par1, par2) {
        var _this = _super.call(this, name) || this;
        if (par2 !== undefined) {
            var year = par1;
            var month = par2;
            _this.Month = ((Math.abs(year) - 1) * 12 + month) * (year / Math.abs(year));
            _this.Year = year;
            _this.Decade = _this.DecadeFromYear(year);
            _this.Century = _this.CenturyFromDecade(_this.Decade);
        }
        else {
            var month = par1;
            _this.Month = month;
            _this.Year = _this.YearFromMonth(month);
            _this.Decade = _this.DecadeFromYear(_this.Year);
            _this.Century = _this.CenturyFromDecade(_this.Decade);
        }
        _this.Type = EnumPeriod.month;
        return _this;
    }
    return TLEventMonth;
}(TLEvent));
exports.TLEventMonth = TLEventMonth;
var TLEventYear = /** @class */ (function (_super) {
    __extends(TLEventYear, _super);
    function TLEventYear(name, year) {
        var _this = _super.call(this, name) || this;
        _this.Year = year;
        _this.Decade = _this.DecadeFromYear(year);
        _this.Century = _this.CenturyFromDecade(_this.Decade);
        _this.Type = EnumPeriod.year;
        return _this;
    }
    return TLEventYear;
}(TLEvent));
exports.TLEventYear = TLEventYear;
var TLEventDecade = /** @class */ (function (_super) {
    __extends(TLEventDecade, _super);
    function TLEventDecade(name, par1, par2) {
        var _this = _super.call(this, name) || this;
        if (par2 !== undefined) {
            var century = par1;
            var decade = par2;
            if (decade < 0 || decade > 9)
                throw Error('Неверный номер десятилетия');
            _this.Decade = ((Math.abs(century) - 1) * 10 + decade + 1) * (century / Math.abs(century));
            _this.Century = century;
        }
        else {
            var decade = par1;
            _this.Decade = decade;
            _this.Century = _this.CenturyFromDecade(decade);
        }
        _this.Type = EnumPeriod.decade;
        return _this;
    }
    return TLEventDecade;
}(TLEvent));
exports.TLEventDecade = TLEventDecade;
var TLEventCentury = /** @class */ (function (_super) {
    __extends(TLEventCentury, _super);
    function TLEventCentury(name, century) {
        var _this = _super.call(this, name) || this;
        _this.Century = century;
        _this.Type = EnumPeriod.century;
        return _this;
    }
    return TLEventCentury;
}(TLEvent));
exports.TLEventCentury = TLEventCentury;
var TLPeriod = /** @class */ (function () {
    function TLPeriod(o) {
        this.Name = o.Name;
        var type;
        type = TLEvent.GetType(o.Begin);
        if (type === EnumPeriod.day) {
            this.Begin = new TLEventDay(o.Begin.Name, o.Begin.Day.Year, o.Begin.Day.Month, o.Begin.Day.Day);
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
            this.End = new TLEventDay(o.End.Name, o.End.Day.Year, o.End.Day.Month, o.End.Day.Day);
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
    }
    /**
     * Попадает текущее значение ОВ в период this
     * @param period
     * Текущая дробность отображения для ЛВ
     * @param vl
     * Текущее значение ОВ, которое в данный момент отрисовывается
     */
    TLPeriod.prototype.Contains = function (period, vl) {
        var rt = false;
        switch (period) {
            case EnumPeriod.day:
                var dt = vl;
                rt = this.ContainsDay(new TLDate(dt.getFullYear(), dt.getMonth() + 1, dt.getDate()));
                break;
            case EnumPeriod.month:
                //rt = (vl === this.Month)
                break;
            case EnumPeriod.year:
                //rt = (vl === this.Year)
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
    };
    /**
     *
     * @param dt отображаемый ОВ
     * @param o объект насчет которого принимается решение включать или нет
     */
    TLPeriod.prototype.ContainsDay = function (dt) {
        var dt1, dt2;
        switch (this.Begin.Type) {
            case EnumPeriod.day:
                dt1 = this.Begin.Day;
                break;
            case EnumPeriod.month:
                dt1 = new TLDate(this.Begin.Day.Year, this.Begin.Day.Month, 1);
                break;
            case EnumPeriod.year:
                dt1 = new TLDate(this.Begin.Day.Year, 1, 1);
                break;
            case EnumPeriod.decade:
                dt1 = new TLDate(Math.floor(this.Begin.Year / 10) + 1, 1, 1);
                break;
            case EnumPeriod.century:
                dt1 = new TLDate(Math.floor(this.Begin.Year / 100) + 1, 1, 1);
                break;
        }
        switch (this.End.Type) {
            case EnumPeriod.day:
                dt2 = this.End.Day;
                break;
            case EnumPeriod.month:
                dt2 = new TLDate(this.Begin.Day.Year, this.Begin.Day.Month, 1);
                break;
            case EnumPeriod.year:
                dt2 = new TLDate(this.Begin.Day.Year, 1, 1);
                break;
            case EnumPeriod.decade:
                dt2 = new TLDate(Math.floor(this.Begin.Year / 10) + 1, 1, 1);
                break;
            case EnumPeriod.century:
                dt2 = new TLDate(Math.floor(this.Begin.Year / 100) + 1, 1, 1);
                break;
        }
        return dt.GreaterOrEqual(dt1) && dt.LessOrEqual(dt2);
    };
    return TLPeriod;
}());
exports.TLPeriod = TLPeriod;
var TimeLineData = /** @class */ (function () {
    function TimeLineData(o) {
        var _this = this;
        /** Здесь только события с конкретными датами */
        //Events: TLEvent[] = []
        /** Здесь периоды, события у которых нет конкретной даты тоже относятся к периодам */
        this.Periods = [];
        this.Name = o.Name;
        o.Periods.forEach(function (data) {
            if (TLEvent.Equal(data.Begin, data.End))
                _this.Periods.push(new TLPeriodEvent(data));
            else
                _this.Periods.push(new TLPeriod(data));
        });
    }
    return TimeLineData;
}());
exports.TimeLineData = TimeLineData;
var TLPeriodEvent = /** @class */ (function (_super) {
    __extends(TLPeriodEvent, _super);
    function TLPeriodEvent(o) {
        return _super.call(this, o) || this;
    }
    return TLPeriodEvent;
}(TLPeriod));
exports.TLPeriodEvent = TLPeriodEvent;
//# sourceMappingURL=TLEvent.js.map