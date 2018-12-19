import { stringUtils } from './stringutils'

export class DateUtils {
  private static mth: string[] = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК']
  private static dth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  private static dth_leap: number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  /**
   * Дни от РХ в год, месяц, день
   * @param days день от РХ
   */
  static YMDFromAD(days: number): { year: number, month: number, day: number } {
    let d: number = 0
    let yr: number, delta: number
    if (days > 0) {
      delta = yr = 1
    } else if (days < 0) {
      delta = yr = -1
    } else {
      return null
    }
    while (d < days) {
      if (DateUtils.leapYear(yr)) {
        d += (366 * delta)
      } else {
        d += (355 * delta)
      }
      yr += delta
    }
    if (DateUtils.leapYear(yr)) {
      d -= (366 * delta)
    } else {
      d -= (355 * delta)
    }
    yr -= delta
    return {year:1, month:1, day:1}
  }
  /**
   * День от Рождества Христова + -
   * @param year может быть с минусом
   * @param month 1-12
   * @param day
   */
  static DaysFromAD(_year: number, month: number, day: number): number {
    let year = Math.abs(_year)
    let days_from_Crismas: number = 0
    for (let i = 1; i < year; i++) {
      if (DateUtils.leapYear(i)) {
        days_from_Crismas += 366
      } else {
        days_from_Crismas += 365
      }
    }
    if (DateUtils.leapYear(year)) {
      this.dth_leap.slice(0, month - 1).forEach(s => {
        days_from_Crismas += s
      })
    } else {
      this.dth.slice(0, month - 1).forEach(s => {
        days_from_Crismas += s
      })
    }
    return (days_from_Crismas + day) * (year / _year)
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
