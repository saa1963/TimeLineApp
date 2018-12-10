import { DateUtils } from './dateutils'
import { saaGraph } from './saagraph'
import { TimeLineData, TLEvent, EnumPeriod, TLPeriod } from './TLEvent'


export class TimeLine {
  ctx: CanvasRenderingContext2D
  curPeriod: number | Date
  x: number
  y: number
  color: string | CanvasGradient | CanvasPattern
  period: EnumPeriod
  name: string
  data: CellData[]
  curdata: number
  tldata: TimeLineData

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

  static getList(): Promise<string[]> {
    return new Promise<string[]>(
      function (resolve, reject) {
        $.ajax('api/storage/list')
          .done(data => {
            resolve(data)
          })
          .fail((data) => {
            reject(data.responseText)
          })
      }
    )
  }

  save () {
    $.ajax('api/storage/save', {
      method: 'POST',
      data: {
        s1: this.name,
        s2: JSON.stringify(this.tldata)
      }
    })
      .done((_) => {
        alert('Сохранение прошло успешно.')
      })
      .fail((jqXHR) => {
        alert('Ошибка при сохранении.\n' + jqXHR.responseText)
      })
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

  findevents(dt: number | Date): TLEvent[] {
    let rt: TLEvent[] = []
    this.tldata.Events.forEach(v => {
      if (v.Equal(this.period, dt)) {
        rt.push(v)
      }
    })
    return rt
  }

  findperiods(dt: number | Date): TLPeriod[] {
    let rt: TLPeriod[] = []
    this.tldata.Periods.forEach(v => {
      if (v.Equal(this.period, dt)) {
        rt.push(v)
      }
    })
    return rt
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

    this.data.push(new CellData(dt, x0 - TimeLine.INTERVAL_WIDTH + 1, this.y, x0, this.y + TimeLine.LINE_THICKNESS - 1, path))
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

class CellData {
  constructor (
    public value: any,
    public x1: number,
    public y1: number,
    public x2: number,
    public y2: number,
    public path: Path2D){}
}
