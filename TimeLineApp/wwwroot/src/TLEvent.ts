import { DateUtils } from './dateutils'

class TLDate {
  Day: number
  Month: number
  Year: number
  constructor(year: number, month: number, day: number) {
    if (year == 0) throw new Error('Год равен 0')
    if (month > 12 || month < 1) throw new Error('Неверный месяц месяца')
    if (day < 1) throw new Error('День меньше 1')
    if ([ 1, 3, 5, 7, 8, 10, 12 ].includes(month)) {
      if (day > 31) throw new Error('Неверный день месяца')
    } else if ([ 4, 6, 9, 11 ].includes(month)) {
      if (day > 30) throw new Error('Неверный день месяца')
    } else {
      if (day > 29) throw new Error('Неверный день месяца')
      if (year >= 1 && year <= 9999) {
        var dt = new Date(year, month - 1, day);
        if (DateUtils.leapYear(year)) {
          if (day > 27) throw new Error('Неверный день месяца')
        }
        else {
          if (day > 28) throw new Error('Неверный день месяца')
        }
      }
    }
    this.Day = day;
    this.Month = month;
    this.Year = year;
  }
}

export abstract class TLEvent {
  Name: string
  Day: TLDate
  Month: number
  Year: number
  Decade: number
  Century: number
  constructor(name: string) {
    this.Name = name
    this.Day = null
    this.Month = null
    this.Year = null
    this.Decade = null
    this.Century = null
  }
  protected DecadeFromYear(year: number): number {
    return year / 10 + (year / Math.abs(year))
  }
  protected CenturyFromDecade(decade: number): number {
    return decade / 10 + (decade / Math.abs(decade))
  }
  protected YearFromMonth(month: number): number {
    return (month - 1) / 12 + (month / Math.abs(month))
  }
}

export class TLEventDay extends TLEvent {
  constructor(name: string, year: number, month: number, day: number) {
    super(name);
    this.Day = new TLDate(year, month, day)
    this.Month = ((Math.abs(year) - 1) * 12 + month) * (year / Math.abs(year));
    this.Year = year;
    this.Decade = this.DecadeFromYear(year)
    this.Century = this.CenturyFromDecade(this.Decade);
  }
}

export class TLEventMonth extends TLEvent {
  constructor(name: string, par1: number, par2?: number) {
    super(name)
    if (par2 !== undefined) {
      let year = par1
      let month = par2
      this.Month = ((Math.abs(year) - 1) * 12 + month) * (year / Math.abs(year))
      this.Year = year
      this.Decade = this.DecadeFromYear(year)
      this.Century = this.CenturyFromDecade(this.Decade)
    } else {
      let month = par1
      this.Month = month
      this.Year = this.YearFromMonth(month)
      this.Decade = this.DecadeFromYear(this.Year)
      this.Century = this.CenturyFromDecade(this.Decade);
    }
  }
}

export class TLEventYear extends TLEvent {
  constructor(name: string, year: number) {
    super(name)
    this.Year = year
    this.Decade = this.DecadeFromYear(year)
    this.Century = this.CenturyFromDecade(this.Decade);
  }
}

export class TLEventDecade extends TLEvent {
  constructor(name: string, par1: number, par2?: number) {
    super(name)
    if (par2 !== undefined) {
      let century = par1
      let decade = par2
      if(decade < 0 || decade > 9) throw Error('Неверный номер десятилетия')
      this.Decade = ((Math.abs(century) - 1) * 10 + decade + 1) * (century / Math.abs(century))
      this.Century = century;
    } else {
      let decade = par1
      this.Decade = decade;
      this.Century = this.CenturyFromDecade(decade)
    }
  }
}

export class TLEventCentury extends TLEvent {
  constructor(name: string, century: number) {
    super(name)
    this.Century = century
  }
}

export class TLPeriod {
  Name: string
  Begin: TLEvent
  End: TLEvent
  constructor(name: string, begin: TLEvent, end: TLEvent) {
    if (typeof (begin) !== typeof (end)) throw new Error('Неодинаковый тип')
    this.Name = name
    this.Begin = begin
    this.End = end
  }
}

export class TimeLineData {
  Events: TLEvent[] = []
  Periods: TLPeriod[] = []
  Name: string
  constructor(name: string, data?: string) {
    this.Name = name
    if (data !== undefined) {
      let o = JSON.parse(data)
      let events = o.events as object[]
      events.forEach((value, index, array) => {
        if (value['type'] === 0) {
          if (value['day'] !== undefined) {
            this.Events.push(
              new TLEventDay(
                <string>value['name'],
                <number>value['day']['year'],
                <number>value['day']['month'],
                <number>value['day']['day'])
            )
          } else if (value['month'] !== undefined) {
            this.Events.push(
              new TLEventMonth(
                <string>value['name'],
                <number>value['month']
              )
            )
          } else if (value['year'] !== undefined) {
            this.Events.push(
              new TLEventYear(
                <string>value['name'],
                <number>value['year']
              )
            )
          } else if (value['decade'] !== undefined) {
            this.Events.push(
              new TLEventDecade(
                <string>value['name'],
                <number>value['decade']
              )
            )
          } else if (value['century'] !== undefined) {
            this.Events.push(
              new TLEventCentury(
                <string>value['name'],
                <number>value['century']
              )
            )
          }
        } else {
          let nn = <string>value['name']
          if (value['first']['day'] !== undefined) {
            let year1 = <number>value['first']['day']['year']
            let month1 = <number>value['first']['day']['month']
            let day1 = <number>value['first']['day']['day']
            let year2 = <number>value['last']['day']['year']
            let month2 = <number>value['last']['day']['month']
            let day2 = <number>value['last']['day']['day']
            this.Periods.push(
              new TLPeriod(
                nn,
                new TLEventDay('Начало', year1, month1, day1),
                new TLEventDay('Конец', year2, month2, day2)
              )
            )
          } else if (value['first']['month'] !== undefined) {
            this.Periods.push(
              new TLPeriod(
                nn,
                new TLEventMonth('Начало', <number>value['first']['month']),
                new TLEventMonth('Конец', <number>value['last']['month'])
              )
            )
          } else if (value['first']['year'] !== undefined) {
            this.Periods.push(
              new TLPeriod(
                nn,
                new TLEventYear('Начало', <number>value['first']['year']),
                new TLEventYear('Конец', <number>value['last']['year'])
              )
            )
          } else if (value['first']['decade'] !== undefined) {
            this.Periods.push(
              new TLPeriod(
                nn,
                new TLEventDecade('Начало', <number>value['first']['decade']),
                new TLEventDecade('Конец', <number>value['last']['decade'])
              )
            )
          } else if (value['first']['century'] !== undefined) {
            this.Periods.push(
              new TLPeriod(
                nn,
                new TLEventCentury('Начало', <number>value['first']['century']),
                new TLEventCentury('Конец', <number>value['last']['century'])
              )
            )
          }
        }
      })
    }
  }
}