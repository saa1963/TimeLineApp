import { stringUtils } from './stringutils'

// Год делится на 400 -> високосный
// Год делится на 100 -> не високосный
// Год делится на 4 -> високосный
// Год не високосный

export class DateUtils {
  private static mth: string[] = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК']
  static IsLeapYear(year: number) {
    let rt: boolean = false
    if (Math.floor((year / 400)) === year / 400) {
      rt = true
    } else if (Math.floor((year / 4)) === year / 4) {
      if (Math.floor((year / 100)) !== year / 100) {
        rt = true
      }
    }
    return rt
  }
  static getCurDate(): Date {
    let dt = new Date()
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())
  }
  static getDateAgo(date: Date, days: number): Date {
    var dateCopy = new Date(date)
    dateCopy.setDate(dateCopy.getDate() + days)
    return dateCopy
  }
  static formatDate(dt: Date): string {
    return stringUtils.pad(dt.getDate(), 2) + '.' + stringUtils.pad(dt.getMonth() + 1, 2) + '.' + (dt.getFullYear() + '').substring(2)
  }
  static getMonthFromDate(dt: Date): number {
    return (dt.getFullYear() - 1) * 12 + dt.getMonth() + 1
  }
  static getYearFromDate(dt: Date): number {
    return dt.getFullYear()
  }
  static getDecadeFromDate(dt: Date): number {
    return Math.floor(dt.getFullYear() / 10) + 1
  }
  static getCenturyFromDate(dt: Date): number {
    return Math.floor(dt.getFullYear() / 100) + 1
  }
  static getDecade(century: number, decade: number): number {
    return (century - 1) * 10 + decade + 1
  }
  static formatMonth(period: number): string {
    let year = Math.floor((period - 1) / 12) + 1
    let month = period - (year - 1) * 12
    return this.mth[month - 1] + ' ' + stringUtils.pad(year, 4)
  }
  static formatYear(period: number): string {
    return period.toString()
  }
  static formatDecade(period: number): string {
    let century = Math.floor((period - 1) / 10) + 1
    let decade = period - (century - 1) * 10
    return romanize(century) + ' ' + (decade - 1) * 10 + 'е'
  }
  static formatCentury(num: number): string {
    return romanize(num)
  }
  static getDecadeComponent(decade: number): number {
    let century = Math.floor((decade - 1) / 10) + 1
    return decade - (century - 1) * 10
  }

  static leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }
}

function romanize (num: number): string {
  if (!+num) { return null }
  var digits = String(+num).split('')

  var key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
    '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
    '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']

  var roman = ''

  var i = 3
  while (i--) { roman = (key[+digits.pop() + (i * 10)] || '') + roman }
  return Array(+digits.join('') + 1).join('M') + roman
}
