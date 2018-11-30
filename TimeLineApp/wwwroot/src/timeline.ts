import { DateUtils } from './dateutils'
import { saaGraph } from './saagraph'

export class TimeLine {
  public ctx: CanvasRenderingContext2D
  public curPeriod: any
  public x: number
  public y: number
  public color: any
  public period: any
  public name: string
  public data: TimeLineData[]
  public curdata: number
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

  static get LINE_THICKNESS () { return 25 }
  static get HALF_LINE_THICKNESS () { return TimeLine.LINE_THICKNESS / 2 }
  static get INTERVAL_WIDTH (): number { return 100 }
  static get HALF_INTERVAL_WIDTH () { return TimeLine.INTERVAL_WIDTH / 2 }
  static get EnumPeriod () { return Object.freeze({ 'day': 1, 'month': 2, 'year': 3, 'decade': 4, 'century': 5 }) }

  static load (ctx) {
    let o = new TimeLine(ctx)
    return o
  }

  save () {
    alert(this.name)
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

  static getCurPeriod (periodType) {
    let rt
    switch (periodType) {
      case TimeLine.EnumPeriod.month:
        rt = DateUtils.getMonthFromDate(DateUtils.getCurDate())
        break
      case TimeLine.EnumPeriod.year:
        rt = DateUtils.getYearFromDate(DateUtils.getCurDate())
        break
      case TimeLine.EnumPeriod.decade:
        rt = DateUtils.getDecadeFromDate(DateUtils.getCurDate())
        break
      case TimeLine.EnumPeriod.century:
        rt = DateUtils.getCenturyFromDate(DateUtils.getCurDate())
        break
      case TimeLine.EnumPeriod.day:
      default:
        rt = DateUtils.getCurDate()
        break
    }
    return rt
  }

  formatPeriod (period) {
    let rt
    switch (this.period) {
      case TimeLine.EnumPeriod.month:
        rt = DateUtils.formatMonth(period)
        break
      case TimeLine.EnumPeriod.year:
        rt = DateUtils.formatYear(period)
        break
      case TimeLine.EnumPeriod.decade:
        rt = DateUtils.formatDecade(period)
        break
      case TimeLine.EnumPeriod.century:
        rt = DateUtils.formatCentury(period)
        break
      case TimeLine.EnumPeriod.day:
      default:
        rt = DateUtils.formatDate(period)
        break
    }
    return rt
  }

  getPeriodAgo (period, offset) {
    let dt0
    switch (this.period) {
      case TimeLine.EnumPeriod.month:
      case TimeLine.EnumPeriod.year:
      case TimeLine.EnumPeriod.decade:
        dt0 = period + offset
        break
      case TimeLine.EnumPeriod.century:
        dt0 = period + offset
        if (dt0 === 0) {
          dt0 = dt0 + offset
        }
        break
      case TimeLine.EnumPeriod.day:
      default:
        dt0 = DateUtils.getDateAgo(period, offset)
        break
    }
    return dt0
  }
}

class TimeLineData {
  public constructor (
    public value: any,
    public x1: number,
    public y1: number,
    public x2: number,
    public y2: number,
    public path: Path2D){}
}
