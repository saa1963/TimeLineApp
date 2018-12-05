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
        if (typeof (begin) !== typeof (end))
            throw new Error('Неодинаковый тип');
        this.Name = name;
        this.Begin = begin;
        this.End = end;
    }
    return TLPeriod;
}());
exports.TLPeriod = TLPeriod;
var TimeLineData = /** @class */ (function () {
    function TimeLineData(name, data) {
        var _this = this;
        this.Event = [];
        this.Period = [];
        this.Name = name;
        if (data !== undefined) {
            var o = JSON.parse(data);
            var events = o.events;
            events.forEach(function (value, index, array) {
                if (value['type'] === 0) {
                    if (value['day'] !== undefined) {
                        _this.Event.push(new TLEventDay(value['name'], value['day']['year'], value['day']['month'], value['day']['day']));
                    }
                    else if (value['month'] !== undefined) {
                        _this.Event.push(new TLEventMonth(value['name'], value['month']));
                    }
                    else if (value['year'] !== undefined) {
                        _this.Event.push(new TLEventYear(value['name'], value['year']));
                    }
                    else if (value['decade'] !== undefined) {
                        _this.Event.push(new TLEventDecade(value['name'], value['decade']));
                    }
                    else if (value['century'] !== undefined) {
                        _this.Event.push(new TLEventCentury(value['name'], value['century']));
                    }
                }
                else {
                    var nn = value['name'];
                    if (value['first']['day'] !== undefined) {
                        var year1 = value['first']['day']['year'];
                        var month1 = value['first']['day']['month'];
                        var day1 = value['first']['day']['day'];
                        var year2 = value['last']['day']['year'];
                        var month2 = value['last']['day']['month'];
                        var day2 = value['last']['day']['day'];
                        _this.Period.push(new TLPeriod(nn, new TLEventDay('Начало', year1, month1, day1), new TLEventDay('Конец', year2, month2, day2)));
                    }
                    else if (value['first']['month'] !== undefined) {
                        _this.Period.push(new TLPeriod(nn, new TLEventMonth('Начало', value['first']['month']), new TLEventMonth('Конец', value['last']['month'])));
                    }
                    else if (value['first']['year'] !== undefined) {
                        _this.Period.push(new TLPeriod(nn, new TLEventYear('Начало', value['first']['year']), new TLEventYear('Конец', value['last']['year'])));
                    }
                    else if (value['first']['decade'] !== undefined) {
                        _this.Period.push(new TLPeriod(nn, new TLEventDecade('Начало', value['first']['decade']), new TLEventDecade('Конец', value['last']['decade'])));
                    }
                    else if (value['first']['century'] !== undefined) {
                        _this.Period.push(new TLPeriod(nn, new TLEventCentury('Начало', value['first']['century']), new TLEventCentury('Конец', value['last']['century'])));
                    }
                }
            });
        }
    }
    return TimeLineData;
}());
exports.TimeLineData = TimeLineData;
//# sourceMappingURL=TLEvent.js.map