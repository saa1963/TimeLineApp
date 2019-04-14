import { stringUtils } from './stringutils'

export interface YearMonthDay {
  year: number
  month: number
  day: number
}

export class TLeapData {
  private static dth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  private static dth_leap: number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  isLeap: boolean
  daysInYear: number
  daysInFeb: number
  dth: number[]
  constructor(year: number) {
    if (TLeapData.leapYear(year)) {
      this.isLeap = true
      this.daysInYear = 366
      this.daysInFeb = 29
      this.dth = [].concat(TLeapData.dth_leap)
    } else {
      this.isLeap = false
      this.daysInYear = 365
      this.daysInFeb = 28
      this.dth = [].concat(TLeapData.dth)
    }
  }
  static getDaysInYear(year): number {
    if (TLeapData.leapYear(year))
      return 366
    else
      return 365
  }
  static leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }
}

export class DateUtils {
  private static mth: string[] = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК']
  
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
  static YMDFromAD(days: number): YearMonthDay {
    let d: number = 0
    let yr: number, delta: number
    let abs_days = Math.abs(days)
    if (days === 0) return null
    delta = yr = days / abs_days
    
    while (Math.abs(d) < abs_days) {
      d += (TLeapData.getDaysInYear(yr) * delta)
      yr += delta
    }
    // отматываем год назад
    yr -= delta
    d -= (TLeapData.getDaysInYear(yr) * delta)

    let leapData = new TLeapData(yr + delta)
    let mth = 0
    while (Math.abs(d) < abs_days) {
      if (days > 0) {
        d += leapData.dth[mth]
      } else {
        d += leapData.dth.reverse()[mth]
      }
      mth++
    }
    mth--
    let ds = abs_days - Math.abs(d)
    if (days > 0) {
      d -= leapData.dth[mth]
      return { year: yr, month: mth + 1, day: ds }
    } else {
      
      d -= leapData.dth.reverse()[mth]
      return { year: yr, month: mth + 1, day: leapData.dth[mth] - ds }
    }
  }

  /**
   * День от Рождества Христова + -
   * @param year может быть с минусом
   * @param month 1-12
   * @param day
   */
  static DaysFromAD(_year: number, month: number, day: number): number {
    let year = Math.abs(_year)
    let leapData = new TLeapData(year)
    if (month !== 2) {
      if (day > leapData.dth[month - 1] || day < 1) {
        throw "Неверное значение номера месяца"
      }
    }
    else {
      if (day > leapData.dth[1] || day < 1) {
        throw "Неверное значение номера месяца"
      }
    }
    let days_from_Crismas: number = 0
    for (let i = 1; i < year; i++) {
      days_from_Crismas += TLeapData.getDaysInYear(i)
    }
    let sliceMonth: number[]
    if (_year > 0) {
      sliceMonth = leapData.dth.slice(0, month - 1)
    } else {
      sliceMonth = leapData.dth.reverse().slice(month - 1)
    }
    sliceMonth.forEach(s => {
      days_from_Crismas += s
    })
    let kf = year / _year
    if (_year > 0) {
      return days_from_Crismas + day
    } else {
      return -days_from_Crismas - day + 1
    }
  }
  /**
   * Первый день месяца (и месяц и день от РХ)
   * Для отрицательных месяцев 1-ый день месяца позже последнего -31 ... -1
   * @param month может быть с минусом
   */
  static FirstDayOfMonth(month: number): number {
    let absMonth = Math.abs(month)
    let days = 0
    for (let m = 1, mth = 1, year = 1; m < absMonth; m++) {
      let leapData = new TLeapData(year)
      days += leapData.dth[mth - 1]
      if (mth === 12) {
        mth = 1
        year++
      }
      else {
        mth++;
      }
    }
    return (days + 1) * (month / absMonth)
  }
  /**
   * Последний день месяца
   * Для отрицательных месяцев Последний день раньше Первого -31 ... -1
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
   * Последний день года
   * Для отрицательных лет сначала идет последний день потом первый
   * @param month
   */
  static LastDayOfYear(year: number): number {
    let f: number
    if (year > 0) {
      f = this.FirstDayOfYear(year + 1) - 1
    } else {
      f = this.FirstDayOfYear(year - 1) + 1
    }
    return f
  }
  /**
   * Первый день года
   * Для отрицательных лет сначала идет последний день потом первый
   * @param year может быть отрицательным
   */
  static FirstDayOfYear(year: number): number {
    let absYear = Math.abs(year)
    let days = 0
    for (let y = 1; y < absYear; y++) {
      days += TLeapData.getDaysInYear(y)
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
        days += TLeapData.getDaysInYear(y)
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
        days += TLeapData.getDaysInYear(y)
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
  static getMonthFromNumber(num: number): YearMonthDay {
    let year: number
    let month: number
    let rt: YearMonthDay
    if (num > 0) {
      year = Math.floor(num / 12)
      rt = { year: year + 1, month: num - year * 12, day: 1 }
    } else {
      year = Math.ceil(num / 12)
      rt = { year: year - 1, month: Math.abs(num) - Math.abs(year * 12), day: 1 }
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
