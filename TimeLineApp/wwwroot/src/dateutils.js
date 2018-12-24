"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringutils_1 = require("./stringutils");
var DateUtils = /** @class */ (function () {
    function DateUtils() {
    }
    /**
     * Дни от РХ в год, месяц, день
     * @param days день от РХ
     */
    DateUtils.YMDFromAD = function (days) {
        var d = 0;
        var yr, delta;
        if (days > 0) {
            delta = yr = 1;
        }
        else if (days < 0) {
            delta = yr = -1;
        }
        else {
            return null;
        }
        while (d < days) {
            if (DateUtils.leapYear(yr)) {
                d += (366 * delta);
            }
            else {
                d += (365 * delta);
            }
            yr += delta;
        }
        // отматываем год назад
        if (DateUtils.leapYear(yr)) {
            d -= (366 * delta);
        }
        else {
            d -= (365 * delta);
        }
        yr -= delta;
        var dth0;
        if (DateUtils.leapYear(yr)) {
            dth0 = this.dth_leap;
        }
        else {
            dth0 = this.dth;
        }
        var mth = 0;
        while (d < days) {
            d += (dth0[mth] * delta);
            mth++;
        }
        mth--;
        d -= (dth0[mth] * delta);
        var ds = Math.abs(days) - Math.abs(d);
        return { year: yr, month: mth + 1, day: ds };
    };
    /**
     * День от Рождества Христова + -
     * @param year может быть с минусом
     * @param month 1-12
     * @param day
     */
    DateUtils.DaysFromAD = function (_year, month, day) {
        var year = Math.abs(_year);
        var days_from_Crismas = 0;
        for (var i = 1; i < year; i++) {
            if (DateUtils.leapYear(i)) {
                days_from_Crismas += 366;
            }
            else {
                days_from_Crismas += 365;
            }
        }
        if (DateUtils.leapYear(year)) {
            this.dth_leap.slice(0, month - 1).forEach(function (s) {
                days_from_Crismas += s;
            });
        }
        else {
            this.dth.slice(0, month - 1).forEach(function (s) {
                days_from_Crismas += s;
            });
        }
        return (days_from_Crismas + day) * (year / _year);
    };
    DateUtils.getCurDate = function () {
        var dt = new Date();
        return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    };
    DateUtils.getDateAgo = function (date, days) {
        var dateCopy = new Date(date);
        dateCopy.setDate(dateCopy.getDate() + days);
        return dateCopy;
    };
    DateUtils.formatDate = function (dt) {
        return stringutils_1.stringUtils.pad(dt.getDate(), 2) + '.' + stringutils_1.stringUtils.pad(dt.getMonth() + 1, 2) + '.' + (dt.getFullYear() + '').substring(2);
    };
    DateUtils.getMonthFromDate = function (dt) {
        return (dt.getFullYear() - 1) * 12 + dt.getMonth() + 1;
    };
    DateUtils.getYearFromDate = function (dt) {
        return dt.getFullYear();
    };
    DateUtils.getDecadeFromDate = function (dt) {
        return Math.floor(dt.getFullYear() / 10) + 1;
    };
    DateUtils.getCenturyFromDate = function (dt) {
        return Math.floor(dt.getFullYear() / 100) + 1;
    };
    DateUtils.getDecade = function (century, decade) {
        return (century - 1) * 10 + decade + 1;
    };
    DateUtils.formatMonth = function (period) {
        var year = Math.floor((period - 1) / 12) + 1;
        var month = period - (year - 1) * 12;
        return this.mth[month - 1] + ' ' + stringutils_1.stringUtils.pad(year, 4);
    };
    DateUtils.formatYear = function (period) {
        return period.toString();
    };
    DateUtils.formatDecade = function (period) {
        var century = Math.floor((period - 1) / 10) + 1;
        var decade = period - (century - 1) * 10;
        return romanize(century) + ' ' + (decade - 1) * 10 + 'е';
    };
    DateUtils.formatCentury = function (num) {
        return romanize(num);
    };
    DateUtils.getDecadeComponent = function (decade) {
        var century = Math.floor((decade - 1) / 10) + 1;
        return decade - (century - 1) * 10;
    };
    DateUtils.leapYear = function (year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    };
    DateUtils.mth = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'];
    DateUtils.dth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    DateUtils.dth_leap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return DateUtils;
}());
exports.DateUtils = DateUtils;
function romanize(num) {
    if (!+num) {
        return null;
    }
    var digits = String(+num).split('');
    var key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
        '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
        '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
    var roman = '';
    var i = 3;
    while (i--) {
        roman = (key[+digits.pop() + (i * 10)] || '') + roman;
    }
    return Array(+digits.join('') + 1).join('M') + roman;
}
//# sourceMappingURL=dateutils.js.map