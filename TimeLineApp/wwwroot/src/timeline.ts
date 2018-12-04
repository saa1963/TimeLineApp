import { DateUtils } from './dateutils'
import { saaGraph } from './saagraph'

export enum EnumPeriod {
  day = 1, month = 2, year = 3, decade = 4, century = 5
}

export class TimeLine {
  ctx: CanvasRenderingContext2D
  curPeriod: number | Date
  x: number
  y: number
  color: string | CanvasGradient | CanvasPattern
  period: EnumPeriod
  name: string
  data: TimeLineData[]
  curdata: number

  static readonly LINE_THICKNESS: number = 25
  private static readonly HALF_LINE_THICKNESS: number = TimeLine.LINE_THICKNESS / 2
  private static readonly INTERVAL_WIDTH: number = 100
  private static readonly HALF_INTERVAL_WIDTH: number = TimeLine.INTERVAL_WIDTH / 2

  constructor (ctx, curPeriod = null, y = 0, color = null, period = null, name = 'нет имени', data = []) {
    this.ctx = ctx
    this.curPeriod = curPeriod
    this.x = ctx.canvas.clientWidth - 1 + TimeLine.INTERVAL_WIDTH + 0.5
    this.y = y
    this.color = color
    this.period = period
    this.name = name
    this.data = data
  }

  static load(ctx: CanvasRenderingContext2D): TimeLine {
    let o = new TimeLine(ctx)
    return o
  }

  save () {
    $.ajax('api/storage/save', {
      method: 'POST',
      data: {
        s1: this.name,
        s2: JSON.stringify( {
          "name": "Жизнь Сошина",
          "events": [
            {
              "type": 0,
              "name": "Рождение",
              "day": {
                "year": 1963,
                "month": 6,
                "day": 5
              },
              "month": 23551,
              "year": 1963,
              "decade": 197,
              "century": 20
            },
            {
              "type": 0,
              "name": "В школу",
              "day": {
                "year": 1970,
                "month": 9,
                "day": 1
              },
              "month": 23637,
              "year": 1970,
              "decade": 198,
              "century": 20
            },
            {
              "type": 0,
              "name": "Окончил школу",
              "day": {
                "year": 1980,
                "month": 6,
                "day": 30
              },
              "month": 23754,
              "year": 1980,
              "decade": 199,
              "century": 20
            },
            {
              "type": 1,
              "name": "1-ая учеба в ВУЗе",
              "first": {
                "day": {
                  "year": 1981,
                  "month": 9,
                  "day": 1
                },
                "month": 23769,
                "year": 1981,
                "decade": 199,
                "century": 20
              },
              "last": {
                "day": {
                  "year": 1984,
                  "month": 8,
                  "day": 31
                },
                "month": 23804,
                "year": 1984,
                "decade": 199,
                "century": 20
              }
            }
          ]
        })
      }
    })
      .done(data => { console.log('OK') })
    .fail(
  }

  set Period (period) {
    this.x = this.ctx.canvas.clientWidth - 1 + TimeLine.INTERVAL_WIDTH + 0.5
    this.curPeriod = TimeLine.getCurPeriod(period)
    this.period = period
  }

  draw () {
    this.data = []
    this.curdata = -1
    let x0: number = this.x
    let dt = this.curPeriod
    while (x0 >= 0) {
      this.drawCell(x0, dt)
      x0 -= TimeLine.INTERVAL_WIDTH
      dt = this.getPeriodAgo(dt, -1)
    }
    x0 = this.x
    dt = this.curPeriod
    while (x0 <= this.ctx.canvas.clientWidth - 1 + TimeLine.INTERVAL_WIDTH) {
      this.drawCell(x0, dt)
      x0 += TimeLine.INTERVAL_WIDTH
      dt = this.getPeriodAgo(dt, 1)
    }
    this.drawName()
  }

  drawName () {
    const HBOOKMARK = 30
    const INDENT = 10
    const RADIUS = 10
    this.ctx.save()
    this.ctx.fillStyle = this.color
    this.ctx.textBaseline = 'middle'
    this.ctx.textAlign = 'center'
    this.ctx.font = '16px serif'
    let wBookmark = this.ctx.measureText(this.name).width + INDENT / 2
    saaGraph.roundedRect(this.ctx, INDENT, this.y - HBOOKMARK, wBookmark, HBOOKMARK, RADIUS)
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(this.name, INDENT + wBookmark / 2, this.y - HBOOKMARK / 2)
    this.ctx.restore()
  }

  drawCell (x0, dt) {
    let path = new Path2D()
    path.rect(x0 - TimeLine.INTERVAL_WIDTH + 1, this.y, TimeLine.INTERVAL_WIDTH, TimeLine.LINE_THICKNESS)
    this.ctx.fillStyle = this.color
    this.ctx.strokeStyle = 'white'
    this.ctx.fill(path)
    this.ctx.stroke(path)

    this.ctx.textBaseline = 'middle'
    this.ctx.textAlign = 'center'
    this.ctx.font = '14px serif'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(this.formatPeriod(dt), x0 - TimeLine.HALF_INTERVAL_WIDTH, this.y + TimeLine.HALF_LINE_THICKNESS)

    this.data.push(new TimeLineData(dt, x0 - TimeLine.INTERVAL_WIDTH + 1, this.y, x0, this.y + TimeLine.LINE_THICKNESS - 1, path))
  }

  /**
   * Получить значение периода для данной координаты курсора
   *
   * @param {number} x
   * @param {number} y
   * @returns number
   * @memberof TimeLine
   */
  getCellValue (x, y) {
    for (let i = 0; i < this.data.length; i++) {
      if (x > this.data[i].x1 && x < this.data[i].x2 && y > this.data[i].y1 && y < this.data[i].y2) {
        return i
      }
    }
    return -1
  }

  onBox (_data) {
    let data = this.data[_data]
    this.ctx.strokeStyle = 'black'
    this.ctx.stroke(data.path)
  }

  offBox () {
    let data = this.data[this.curdata]
    this.ctx.strokeStyle = 'white'
    this.ctx.stroke(data.path)
  }

  shift (movementX) {
    this.x += movementX
  }

  static getCurPeriod (periodType: EnumPeriod): number | Date {
    let rt
    switch (periodType) {
      case EnumPeriod.month:
        rt = DateUtils.getMonthFromDate(DateUtils.getCurDate())
        break
      case EnumPeriod.year:
        rt = DateUtils.getYearFromDate(DateUtils.getCurDate())
        break
      case EnumPeriod.decade:
        rt = DateUtils.getDecadeFromDate(DateUtils.getCurDate())
        break
      case EnumPeriod.century:
        rt = DateUtils.getCenturyFromDate(DateUtils.getCurDate())
        break
      case EnumPeriod.day:
      default:
        rt = DateUtils.getCurDate()
        break
    }
    return rt
  }

  formatPeriod (period) {
    let rt
    switch (this.period) {
      case EnumPeriod.month:
        rt = DateUtils.formatMonth(period)
        break
      case EnumPeriod.year:
        rt = DateUtils.formatYear(period)
        break
      case EnumPeriod.decade:
        rt = DateUtils.formatDecade(period)
        break
      case EnumPeriod.century:
        rt = DateUtils.formatCentury(period)
        break
      case EnumPeriod.day:
      default:
        rt = DateUtils.formatDate(period)
        break
    }
    return rt
  }

  getPeriodAgo (period: number | Date, offset: number): Date {
    let dt0
    switch (this.period) {
      case EnumPeriod.month:
      case EnumPeriod.year:
      case EnumPeriod.decade:
        dt0 = <number>period + offset
        break
      case EnumPeriod.century:
        dt0 = <number>period + offset
        if (dt0 === 0) {
          dt0 = dt0 + offset
        }
        break
      case EnumPeriod.day:
      default:
        dt0 = DateUtils.getDateAgo(<Date>period, offset)
        break
    }
    return dt0
  }
}

class TimeLineData {
  constructor (
    public value: any,
    public x1: number,
    public y1: number,
    public x2: number,
    public y2: number,
    public path: Path2D){}
}
