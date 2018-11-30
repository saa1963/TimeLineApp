import { stringUtils } from './stringutils';
export let dateUtils = (function () {
    let mth = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'];
    return {
        getCurDate: function () {
            let dt = new Date();
            return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
        },
        getDateAgo: function (date, days) {
            var dateCopy = new Date(date);
            dateCopy.setDate(dateCopy.getDate() + days);
            return dateCopy;
        },
        formatDate: function (dt) {
            return stringUtils.pad(dt.getDate(), 2) + '.' + stringUtils.pad(dt.getMonth() + 1, 2) + '.' + (dt.getFullYear() + '').substring(2);
        },
        getMonthFromDate: function (dt) {
            return (dt.getFullYear() - 1) * 12 + dt.getMonth() + 1;
        },
        getYearFromDate: function (dt) {
            return dt.getFullYear();
        },
        getDecadeFromDate: function (dt) {
            return Math.floor(dt.getFullYear() / 10) + 1;
        },
        getCenturyFromDate: function (dt) {
            return Math.floor(dt.getFullYear() / 100) + 1;
        },
        getDecade(century, decade) {
            return (century - 1) * 10 + decade + 1;
        },
        formatMonth: function (period) {
            let year = Math.floor((period - 1) / 12) + 1;
            let month = period - (year - 1) * 12;
            return mth[month - 1] + ' ' + stringUtils.pad(year, 4);
        },
        formatYear: function (period) {
            return period;
        },
        formatDecade: function (period) {
            let century = Math.floor((period - 1) / 10) + 1;
            let decade = period - (century - 1) * 10;
            return romanize(century) + ' ' + (decade - 1) * 10 + 'е';
        },
        formatCentury: function (num) {
            return romanize(num);
        },
        getDecadeComponent(decade) {
            let century = Math.floor((decade - 1) / 10) + 1;
            return decade - (century - 1) * 10;
        }
    };
})();
function romanize(num) {
    if (!+num) {
        return false;
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
