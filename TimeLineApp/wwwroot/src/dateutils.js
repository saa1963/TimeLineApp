import { stringUtils } from './stringutils';
export class DateUtils {
    /**
     * Дни от РХ в год, месяц, день
     * @param days день от РХ
     */
    static YMDFromAD(days) {
        let d = 0;
        let yr, delta;
        if (days > 0) {
            delta = yr = 1;
        }
        else if (days < 0) {
            delta = yr = -1;
        }
        else {
            return null;
        }
        let abs_days = Math.abs(days);
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
        let dth0;
        if (DateUtils.leapYear(yr)) {
            dth0 = this.dth_leap;
        }
        else {
            dth0 = this.dth;
        }
        let mth = 0;
        while (Math.abs(d) < abs_days) {
            d += (dth0[mth] * delta);
            mth++;
        }
        mth--;
        d -= (dth0[mth] * delta);
        let ds = Math.abs(days) - Math.abs(d);
        return { year: yr, month: mth + 1, day: ds };
    }
    /**
     * День от Рождества Христова + -
     * @param year может быть с минусом
     * @param month 1-12
     * @param day
     */
    static DaysFromAD(_year, month, day) {
        let year = Math.abs(_year);
        let days_from_Crismas = 0;
        for (let i = 1; i < year; i++) {
            if (DateUtils.leapYear(i)) {
                days_from_Crismas += 366;
            }
            else {
                days_from_Crismas += 365;
            }
        }
        if (DateUtils.leapYear(year)) {
            this.dth_leap.slice(0, month - 1).forEach(s => {
                days_from_Crismas += s;
            });
        }
        else {
            this.dth.slice(0, month - 1).forEach(s => {
                days_from_Crismas += s;
            });
        }
        return (days_from_Crismas + day) * (year / _year);
    }
    static getCurDate() {
        let dt = new Date();
        return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    }
    static getDateAgo(date, days) {
        var dateCopy = new Date(date);
        dateCopy.setDate(dateCopy.getDate() + days);
        return dateCopy;
    }
    static formatDate(dt) {
        return stringUtils.pad(dt.getDate(), 2) + '.' + stringUtils.pad(dt.getMonth() + 1, 2) + '.' + (dt.getFullYear() + '').substring(2);
    }
    static getMonthFromDate(dt) {
        return (dt.getFullYear() - 1) * 12 + dt.getMonth() + 1;
    }
    static getNumberFromMonth(year, month) {
        let rt;
        let delta = year / Math.abs(year);
        rt = (year - delta) * 12 + (month * delta);
        return rt;
    }
    static getMonthFromNumber(num) {
        let year;
        let month;
        let rt;
        if (num > 0) {
            year = Math.floor(num / 12);
            rt = { year: year + 1, month: num - year * 12 };
        }
        else {
            year = Math.ceil(num / 12);
            rt = { year: year - 1, month: Math.abs(num) - Math.abs(year * 12) };
        }
        return rt;
    }
    static getYearFromDate(dt) {
        return dt.getFullYear();
    }
    static getDecadeFromDate(dt) {
        return Math.floor(dt.getFullYear() / 10) + 1;
    }
    static getCenturyFromDate(dt) {
        return Math.floor(dt.getFullYear() / 100) + 1;
    }
    static getDecade(century, decade) {
        return (century - 1) * 10 + decade + 1;
    }
    static formatMonth(period) {
        let year = Math.floor((period - 1) / 12) + 1;
        let month = period - (year - 1) * 12;
        return this.mth[month - 1] + ' ' + stringUtils.pad(year, 4);
    }
    static formatYear(period) {
        return period.toString();
    }
    static formatDecade(period) {
        let century = Math.floor((period - 1) / 10) + 1;
        let decade = period - (century - 1) * 10;
        return romanize(century) + ' ' + (decade - 1) * 10 + 'е';
    }
    static formatCentury(num) {
        return romanize(num);
    }
    static getDecadeComponent(decade) {
        let century = Math.floor((decade - 1) / 10) + 1;
        return decade - (century - 1) * 10;
    }
    static leapYear(year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }
}
DateUtils.mth = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'];
DateUtils.dth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
DateUtils.dth_leap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
DateUtils.makeMonthNumber = function* (_initYear, _initMonth, reverse = false) {
    let delta = reverse ? -1 : 1;
    let absinitYear = Math.abs(_initYear);
    let init = DateUtils.getNumberFromMonth(_initYear, _initMonth);
    while (true) {
        init += delta;
        if (init === 0) {
            init += delta;
        }
        yield DateUtils.getMonthFromNumber(init);
    }
};
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