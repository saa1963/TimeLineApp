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
  dth_reverse: number[]
  constructor(year: number) {
    if (TLeapData.leapYear(year)) {
      this.isLeap = true
      this.daysInYear = 366
      this.daysInFeb = 29
      this.dth = [].concat(TLeapData.dth_leap)
      this.dth_reverse = [].concat(TLeapData.dth_leap).reverse()
    } else {
      this.isLeap = false
      this.daysInYear = 365
      this.daysInFeb = 28
      this.dth = [].concat(TLeapData.dth)
      this.dth_reverse = [].concat(TLeapData.dth).reverse()
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
      yield DateUtils.getYMDFromMonth(init)
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

    do {
      d += (TLeapData.getDaysInYear(yr) * delta)
      yr += delta
    } while (Math.abs(d) < abs_days)
    
    // отматываем год назад
    yr -= delta
    d -= (TLeapData.getDaysInYear(yr) * delta)

    let leapData = new TLeapData(yr)
    let mth = 0
    while (Math.abs(d) < abs_days) {
      if (days > 0) {
        d += leapData.dth[mth]
      } else {
        d -= leapData.dth_reverse[mth]
      }
      mth++
    }
    mth--
    if (days > 0) {
      d -= leapData.dth[mth]
    } else {
      d += leapData.dth_reverse[mth]
    }
    let ds = abs_days - Math.abs(d)
    if (days > 0) {
      return { year: yr, month: mth + 1, day: ds }
    } else {
      return { year: yr, month: 12 - mth, day: leapData.dth_reverse[mth] - ds + 1}
    }
  }

  static getDayFromYMD(dt: YearMonthDay): number {
    return this.DaysFromAD(dt.year, dt.month, dt.day)
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
      if (month !== 12) {
        sliceMonth = leapData.dth.slice(month)
      } else {
        sliceMonth = []
      }
    }
    sliceMonth.forEach(s => {
      days_from_Crismas += s
    })
    if (_year > 0) {
      return days_from_Crismas + day
    } else {
      return -(days_from_Crismas + (leapData.dth[month - 1] - day + 1))
    }
  }
  /**
   * Первый день месяца (и месяц и день от РХ)
   * @param month может быть с минусом
   */
  static FirstDayOfMonth(month: number): number {
    let days = 0
    let year: number
    let mth: number
    let leapData: TLeapData
    if (month > 0) {
      year = 1
      mth = 1
      leapData = new TLeapData(year)
      for (let m = 1; m < month; m++) {
        days += leapData.dth[mth - 1]
        if (mth === 12) {
          mth = 1
          year++
          leapData = new TLeapData(year)
        }
        else {
          mth++;
        }
      }
      return days + 1
    } else {
      year = -1
      mth = 12
      leapData = new TLeapData(year)
      for (let m = -1; m > month; m--) {
        days -= leapData.dth[mth - 1]
        if (mth === 1) {
          mth = 12
          year--
          leapData = new TLeapData(year)
        }
        else {
          mth--;
        }
      }
      return days - leapData.dth[mth - 1]
    }
  }
  /**
   * Последний день месяца
   * @param month
   */
  static LastDayOfMonth(month: number): number {
    let f: number
    f = this.FirstDayOfMonth(month + 1) - 1
    return f
  }
  /**
   * Последний день года
   * @param month
   */
  static LastDayOfYear(year: number): number {
    let f: number
    f = this.FirstDayOfYear(year + 1) - 1
    return f
  }
  /**
   * Левое (по шкале времени) десятилетие столетия
   * @param century
   */
  static LeftDecadeOfCentury(century: number): number {
    return this.LeftBoundary(century, 10)
  }
  /**
   * Правое (по шкале времени) десятилетие столетия
   * @param century
   */
  static RightDecadeOfCentury(century: number): number {
    return this.RightBoundary(century, 10)
  }
/**
 * Левый (по шкале времени) год столетия
 * @param century
 */
  static LeftYearOfCentury(century: number): number {
    return this.LeftBoundary(century, 100)
  }
  /**
   * Правый (по шкале времени) год столетия
   * @param century
   */
  static RightYearOfCentury(century: number): number {
    return this.RightBoundary(century, 100)
  }
  /**
   * Правый (по шкале времени) год десятилетия
   * @param century
   */
  static RightYearOfDecade(decade: number): number {
    return this.RightBoundary(decade, 10)
  }
  /**
 * Левый (по шкале времени) год десятилетия
 * @param century
 */
  static LeftYearOfDecade(decade: number): number {
    return this.LeftBoundary(decade, 10)
  }
  /**
  * Левый (по шкале времени) месяц года
  * @param century
  */
  static LeftMonthOfYear(year: number): number {
    return this.RightBoundary(year, 12)
  }
  /**
   * Правый (по шкале времени) месяц года
   * @param century
   */
  static RightMonthOfYear(year: number): number {
    return this.RightBoundary(year, 12)
  }

  /**
   * Правый (по шкале времени) месяц десятилетия
   * @param century
   */
  static RightMonthOfDecade(decade: number): number {
    return this.RightBoundary(decade, 120)
  }

  /**
   * Левый (по шкале времени) месяц десятилетия
   * @param century
   */
  static LeftMonthOfDecade(decade: number): number {
    return this.LeftBoundary(decade, 120)
  }

  /**
   * Правый (по шкале времени) месяц столетия
   * @param century
   */
  static RightMonthOfCentury(century: number): number {
    return this.RightBoundary(century, 1200)
  }

  /**
   * Левый (по шкале времени) месяц столетия
   * @param century
   */
  static LeftMonthOfCentury(century: number): number {
    return this.LeftBoundary(century, 1200)
  }

/**
 * Левый (по шкале времени) день месяца
 * @param century месяц
 */
  static LeftDayOfMonth(month: number): number {
    return this.FirstDayOfMonth(month)
  }

  /**
 * Правый (по шкале времени) день месяца
 * @param century месяц
 */
  static RightDayOfMonth(month: number): number {
    return this.LastDayOfMonth(month)
  }

  /**
 * Левый (по шкале времени) день года
 * @param century месяц
 */
  static LeftDayOfYear(year: number): number {
    return this.FirstDayOfYear(year)
  }

  /**
* Правый (по шкале времени) день года
* @param century месяц
*/
  static RightDayOfYear(year: number): number {
    return this.LastDayOfYear(year)
  }

  /**
 * Левый (по шкале времени) день десятилетия
 * @param century месяц
 */
  static LeftDayOfDecade(decade: number): number {
    return this.FirstDayOfDecade(decade)
  }

  /**
* Правый (по шкале времени) день десятилетия
* @param century месяц
*/
  static RightDayOfDecade(decade: number): number {
    return this.LastDayOfDecade(decade)
  }

  /**
 * Левый (по шкале времени) день столетия
 * @param century месяц
 */
  static LeftDayOfCentury(century: number): number {
    return this.FirstDayOfCentury(century)
  }

  /**
* Правый (по шкале времени) день столетия
* @param century месяц
*/
  static RightDayOfCentury(century: number): number {
    return this.LastDayOfCentury(century)
  }

  private static RightBoundary(value: number, count: number) {
    if (value > 0) {
      return value * count
    } else {
      return (value + 1) * count - 1
    }
  }
  private static LeftBoundary(value: number, count: number) {
    if (value > 0) {
      return (value - 1) * count + 1
    } else {
      return value * 12
    }
  }

  /**
   * Первый день года
   * @param year может быть отрицательным
   */
  static FirstDayOfYear(year: number): number {
    let days = 0
    if (year > 0) {
      for (let y = 1; y < year; y++) {
        days += TLeapData.getDaysInYear(y)
      }
      return days + 1
    } else {
      for (let y = -1; y >= year; y--) {
        days -= TLeapData.getDaysInYear(y)
      }
      return days
    }
  }
  /**
   * Первый день десятилетия
   * @param decade может быть отрицательным
   */
  static FirstDayOfDecade(decade: number) {
    let days = 0, yr = 0
    if (decade > 0) {
      for (let d = 1; d < decade; d++) {
        for (let y = 0; y < 10; y++, yr++) {
          days += TLeapData.getDaysInYear(yr + 1)
        }
      }
      return days + 1
    } else {
      for (let d = -1; d >= decade; d--) {
        for (let y = 0; y > -10; y--, yr--) {
          days -= TLeapData.getDaysInYear(yr - 1)
        }
      }
      return days
    }
  }
  /**
   * Последний день десятилетия
   * @param decade может быть отрицательным
   */
  static LastDayOfDecade(decade: number) {
    let f: number
    f = this.FirstDayOfDecade(decade + 1) - 1
    return f
  }
  /**
   * Первый день столетия
   * @param century может быть отрицательным
   */
  static FirstDayOfCentury(century: number) {
    let days = 0, yr = 0
    if (century > 0) {
      for (let d = 1; d < century; d++) {
        for (let y = 0; y < 100; y++, yr++) {
          days += TLeapData.getDaysInYear(yr + 1)
        }
      }
      return days + 1
    } else {
      for (let d = -1; d >= century; d--) {
        for (let y = 0; y > -100; y--, yr--) {
          days -= TLeapData.getDaysInYear(yr - 1)
        }
      }
      return days
    }
  }
  /**
   * Последний день столетия
   * @param century может быть отрицательным
   */
  static LastDayOfCentury(century: number) {
    let f: number
    f = this.FirstDayOfCentury(century + 1) - 1
    return f
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
    if (period > 0)
      return stringUtils.pad(o.day.toString(), 2) + '.'
        + stringUtils.pad(o.month.toString(), 2) + '.'
        + o.year.toString()
    else
      return stringUtils.pad(o.day.toString(), 2) + '.'
        + stringUtils.pad(o.month.toString(), 2) + '.'
        + Math.abs(o.year).toString() + " до нэ"
  }
  static getMonthFromDate(dt: Date): number {
    return (dt.getFullYear() - 1) * 12 + dt.getMonth() + 1
  }
  static getMonthFromYMD(dt: YearMonthDay): number {
    let delta = dt.year / Math.abs(dt.year)
    if (delta === 1) {
      return (dt.year - 1) * 12 + dt.month
    } else {
      return (dt.year + 1) * 12 - (13 - dt.month)
    }
    
  }
  static getNumberFromMonth(year: number, month: number): number {
    let rt: number
    let delta = year / Math.abs(year)
    rt = (year - delta) * 12 + (month * delta)
    return rt
  }
  static getYMDFromMonth(num: number): YearMonthDay {
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
  static getCenturyFromDecade(decade: number) {
    let century: number
    if (decade > 0) {
      century = Math.floor((decade - 1) / 10) + 1
    } else {
      century = Math.floor(decade / 10)
    }
    return century
  }
  /**
   * Получить десятилетие 1 - 10
   * @param decade
   */
  static getDecadeFromDecade(decade: number) {
    let rtDecade: number
    if (decade > 0) {
      rtDecade = decade - Math.floor((decade - 1) / 10) * 10
    } else {
      rtDecade = (Math.floor(decade / 10) + 1) * 10 - decade
    }
    return rtDecade
  }
  /**
   * Год из абсолютного месяца
   * @param month - ... +
   */
  static getYearFromMonth(month: number) {
    let year: number
    if (month > 0) {
      year = Math.floor((month - 1) / 12) + 1
    } else {
      year = Math.floor(month / 12)
    }
    return year
  }
  /**
   * Месяц 1-12 из абсолютного месяца
   * @param month - ... +
   */
  static getMonthFromMonth(month: number) {
    let rtMonth: number
    let лишние_месяцы = 
    if (month > 0) {
      rtMonth = month - Math.floor((month - 1) / 12) * 12
    } else {
      rtMonth = (Math.floor((-month - 1) / 12) + 1) * 12 - month
    }
    return rtMonth
  }
  static getYearFromDate(dt: Date): number {
    return dt.getFullYear()
  }
  static getYearFromYMD(dt: YearMonthDay): number {
    return dt.year
  }
  static getYMDFromYear(num: number): YearMonthDay {
    return {year:num, month:1, day:1}
  }
  static getDecadeFromDate(dt: Date): number {
    return Math.floor(dt.getFullYear() / 10) + 1
  }
  static getDecadeFromYMD(dt: YearMonthDay): number {
    let delta = dt.year / Math.abs(dt.year)
    let ab = Math.floor(Math.abs(dt.year) / 10)
    if (delta > 0)
      return ab + 1
    else
      return -ab - 1
  }
  /**
   * Десятилетие внутри века от 0 - 9
   * @param dt Дата
   */
  static getDecadeRelativeFromDate(dt: Date) {
    return Number.parseInt(dt.getFullYear().toString().substr(-2, 1))
  }
  static getCenturyFromDate(dt: Date): number {
    return Math.floor(dt.getFullYear() / 100) + 1
  }
  static getCenturyFromYMD(dt: YearMonthDay): number {
    let delta = dt.year / Math.abs(dt.year)
    let ab = Math.floor(Math.abs(dt.year) / 100)
    if (delta)
      return ab + 1
    else
      return -ab - 1
  }
  static getDecade(century: number, decade: number): number {
    return (century - 1) * 10 + decade + 1
  }
  static formatMonth(period: number): string {
    let year = Math.floor((period - 1) / 12) + 1
    let month = period - (year - 1) * 12
    if (period > 0)
      return this.mth[month - 1] + ' ' + Math.abs(year)
    else
      return this.mth[month - 1] + ' ' + Math.abs(year) + ' до нэ'
  }
  static formatYear(period: number): string {
    if (period > 0)
      return period.toString()
    else
      return Math.abs(period) + ' до нэ'
  }
  static formatDecade(period: number): string {
    let century = Math.floor((Math.abs(period) - 1) / 10) + 1
    let decade = Math.abs(period) - (century - 1) * 10
    if (period > 0)
      return romanize(century) + ' ' + (decade - 1) * 10 + 'е'
    else
      return romanize(century) + ' до нэ ' + (decade - 1) * 10 + 'е'
  }
  static formatCentury(num: number): string {
    if (num > 0)
      return `${romanize(num)} н.э.`
    else
      return `${romanize(num)} до н.э.`
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
