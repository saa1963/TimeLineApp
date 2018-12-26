"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        var abs_days = Math.abs(days);
        while (Math.abs(d) < abs_days) {
            if (DateUtils.leapYear(yr)) {
                d += (366 * delta);
            }
            else {
                d += (365 * delta);
            }
            yr += delta;
        }
        // отматываем год назад
        yr -= delta;
        if (DateUtils.leapYear(yr)) {
            d -= (366 * delta);
        }
        else {
            d -= (365 * delta);
        }
        var dth0;
        if (DateUtils.leapYear(yr)) {
            dth0 = this.dth_leap;
        }
        else {
            dth0 = this.dth;
        }
        var mth = 0;
        while (Math.abs(d) < abs_days) {
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
    DateUtils.getNumberFromMonth = function (year, month) {
        var rt;
        var delta = year / Math.abs(year);
        rt = (year - delta) * 12 + (month * delta);
        return rt;
    };
    DateUtils.getMonthFromNumber = function (num) {
        var year;
        var month;
        var rt;
        if (num > 0) {
            year = Math.floor(num / 12);
            rt = { year: year + 1, month: num - year * 12 };
        }
        else {
            year = Math.ceil(num / 12);
            rt = { year: year - 1, month: Math.abs(num) - Math.abs(year * 12) };
        }
        return rt;
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
    DateUtils.makeMonthNumber = function (_initYear, _initMonth, reverse) {
        var delta, absinitYear, init;
        if (reverse === void 0) { reverse = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    delta = reverse ? -1 : 1;
                    absinitYear = Math.abs(_initYear);
                    init = DateUtils.getNumberFromMonth(_initYear, _initMonth);
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    init += delta;
                    if (init === 0) {
                        init += delta;
                    }
                    return [4 /*yield*/, DateUtils.getMonthFromNumber(init)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    };
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