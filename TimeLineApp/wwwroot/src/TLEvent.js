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
    function TLDate(year, month, day) {
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
    }
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
    /**
     * Попадает ли событие this в текущее значение ОВ
     * @param period
     * Текущая дробность отображения для ЛВ
     * @param vl
     * Текущее значение ОВ, которое в данный момент отрисовывается
     */
    TLEvent.prototype.Equal = function (period, vl) {
        var rt = false;
        switch (period) {
            case EnumPeriod.day:
                var dt = vl;
                if (dt.getFullYear() === this.Day.Year && dt.getMonth() + 1 === this.Day.Month && dt.getDate() === this.Day.Day) {
                    rt = true;
                }
                break;
            case EnumPeriod.month:
                rt = (vl === this.Month);
                break;
            case EnumPeriod.year:
                rt = (vl === this.Year);
                break;
            case EnumPeriod.decade:
                rt = (vl === this.Decade);
                break;
            case EnumPeriod.century:
                rt = (vl === this.Century);
                break;
            default:
                break;
        }
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
        return _this;
    }
    return TLEventCentury;
}(TLEvent));
exports.TLEventCentury = TLEventCentury;
var TLPeriod = /** @class */ (function () {
    function TLPeriod(name, begin, end) {
        this.Name = name;
        this.Begin = begin;
        this.End = end;
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
        //switch (period) {
        //  case EnumPeriod.day:
        //    let dt = <Date>vl
        //    if (this.Begin.Day !== null) {
        //      if (dt.getFullYear() === this.Day.Year && dt.getMonth() + 1 === this.Day.Month && dt.getDate() === this.Day.Day) {
        //        rt = true
        //      }
        //    }
        //    break
        //  case EnumPeriod.month:
        //    rt = (vl === this.Month)
        //    break
        //  case EnumPeriod.year:
        //    rt = (vl === this.Year)
        //    break
        //  case EnumPeriod.decade:
        //    rt = (vl === this.Decade)
        //    break
        //  case EnumPeriod.century:
        //    rt = (vl === this.Century)
        //    break
        //  default:
        //    break
        //}
        return rt;
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
            _this.Periods.push(new TLPeriod(data.Name, data.Begin, data.End));
        });
    }
    return TimeLineData;
}());
exports.TimeLineData = TimeLineData;
var TLPeriodEvent = /** @class */ (function (_super) {
    __extends(TLPeriodEvent, _super);
    function TLPeriodEvent(name, ev) {
        return _super.call(this, name, ev, ev) || this;
    }
    return TLPeriodEvent;
}(TLPeriod));
exports.TLPeriodEvent = TLPeriodEvent;
//# sourceMappingURL=TLEvent.js.map