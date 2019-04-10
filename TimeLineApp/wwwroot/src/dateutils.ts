import { stringUtils } from './stringutils'

export interface YearMonth {
  year: number
  month: number
}

export class DateUtils {
  private static mth: string[] = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК']
  private static dth: number[] =      [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  private static dth_leap: number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  static makeMonthNumber = function* (_initYear: number, _initMonth: number, reverse: boolean = false) {
    let delta = reverse ? -1 : 1
    let absinitYear = Math.abs(_initYear)
    let init = DateUtils.getNumberFromMonth(_initYear, _initMonth)
    while (true) {
      init += delta
      if (init === 0) {
        init += delta
      }
      yield DateUtils.getMonthFromNumber(init)
    }
  }
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
    let abs_days = Math.abs(days)
    while (Math.abs(d) < abs_days) {
      if (DateUtils.leapYear(yr)) {
        d += (366 * delta)
      } else {
        d += (365 * delta)
      }
      yr += delta
    }

    // отматываем год назад
    yr -= delta
    if (DateUtils.leapYear(yr)) {
      d -= (366 * delta)
    } else {
      d -= (365 * delta)
    }

    let dth0: number[]
    if (DateUtils.leapYear(yr)) {
      dth0 = this.dth_leap
    } else {
      dth0 = this.dth
    }
    let mth = 0
    while (Math.abs(d) < abs_days) {
      d += (dth0[mth] * delta)
      mth++
    }
    mth--
    d -= (dth0[mth] * delta)

    let ds =  Math.abs(days) - Math.abs(d)

    return {year:yr, month:mth + 1, day:ds}
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
  /**
   * Первый день месяца (и месяц и день от РХ)
   * @param month может быть с минусом
   */
  static FirstDayOfMonth(month: number): number {
    let absMonth = Math.abs(month)
    let days = 0
    for (let m = 1, mth = 1, year = 1; m < absMonth; m++) {
      let leap = DateUtils.leapYear(year)
      if (leap) {
        days += DateUtils.dth[mth - 1]
      } else {
        days += DateUtils.dth_leap[mth - 1]
      }
      if (mth === 12) {
        mth = 1
        year++
      }
    }
    return (days + 1) * (month / absMonth)
  }
  /**
   * Последний день месяца
   * @param month
   */
  static LastDayOfMonth(month: number): number {
    let f: number
    if (month > 0) {
      f = this.FirstDayOfMonth(month + 1) - 1
    } else {
      f = this.FirstDayOfMonth(month - 1) + 1
    }
    return f
  }
  /**
   * Первый день года
   * @param year может быть отрицательным
   */
  static FirstDayOfYear(year: number): number {
    let absYear = Math.abs(year)
    let days = 0
    for (let y = 1; y < absYear; y++) {
      let leap = DateUtils.leapYear(y)
      if (leap) {
        days += 366
      } else {
        days += 365
      }
    }
    return (days + 1) * (year / absYear)
  }
  /**
   * Первый день десятилетия
   * @param decade может быть отрицательным
   */
  static FirstDayOfDecade(decade: number) {
    let absDecade = Math.abs(decade)
    let days = 0, yr = 1
    for (let d = 1; d < absDecade; d++) {
      for (let y = 0; y < 10; y++, yr++) {
        let leap = DateUtils.leapYear(yr)
        if (leap) {
          days += 366
        } else {
          days += 365
        }
      }
    }
    return (days + 1) * (decade / absDecade)
  }
  /**
   * Первый день века
   * @param century может быть отрицательным
   */
  static FirstDayOfCentury(century: number): number {
    let absCentury = Math.abs(century)
    let days = 0, yr = 1
    for (let c = 1; c < absCentury; c++) {
      for (let y = 0; y < 100; y++ , yr++) {
        let leap = DateUtils.leapYear(yr)
        if (leap) {
          days += 366
        } else {
          days += 365
        }
      }
    }
    return (days + 1) * (century / absCentury)
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
  static formatDate(period: number): string {
    let o = DateUtils.YMDFromAD(period)
    return stringUtils.pad(o.day.toString(), 2) + '.'
      + stringUtils.pad(o.month.toString(), 2) + '.'
      + o.year.toString()
  }
  static getMonthFromDate(dt: Date): number {
    return (dt.getFullYear() - 1) * 12 + dt.getMonth() + 1
  }
  static getNumberFromMonth(year: number, month: number): number {
    let rt: number
    let delta = year / Math.abs(year)
    rt = (year - delta) * 12 + (month * delta)
    return rt
  }
  static getMonthFromNumber(num: number): YearMonth {
    let year: number
    let month: number
    let rt: YearMonth
    if (num > 0) {
      year = Math.floor(num / 12)
      rt = { year: year + 1, month: num - year * 12 }
    } else {
      year = Math.ceil(num / 12)
      rt = { year: year - 1, month: Math.abs(num) - Math.abs(year * 12) }
    }
    return rt
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
