import { DateUtils } from './dateutils'
import { saaGraph } from './saagraph'
import { TLEvent, EnumPeriod } from './TLEvent'
import { TimeLineData } from "./TimeLineData";
import { TLPeriod } from "./TLPeriod";
import * as $ from 'jquery'

export class TimeLine {
  y: number
  color: string | CanvasGradient | CanvasPattern
/** Текущий вид ОВ */
  private period: EnumPeriod
  name: string
  /** Текущий индекс в массиве this.data  */ 
  curdata: number
  /** Массив событий и периодов для всей ЛВ */
  tldata: TimeLineData

  /** Значение ОВ с которого начинается отрисовка справа налево */
  private curPeriod: number
  /** Массив данных для отображаемых ОВ */
  private data: CellData[]
  private time_data: Map<number, TLPeriod>
  /** координата x с которой отрисовывается ЛВ, сначала справа налево, потом слева направо */
  private x: number
  private ctx: CanvasRenderingContext2D
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

  set Period(period) {
    if (this.period != period) {
      this.x = this.ctx.canvas.clientWidth - 1 + TimeLine.INTERVAL_WIDTH + 0.5
      this.curPeriod = TimeLine.getCurPeriod(period)
      this.period = period
      this.time_data = new Map<number, TLPeriod>()
    }
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

  /**
   * Формирует массив периодов для текущего ОВ
   * @param dt 
   * Текущее значение ОВ, которое в данный момент отрисовывается
   */
  findperiods(dt: number): void {
    //let rt: TLPeriod[] = []
    if (this.tldata !== undefined) {
      this.tldata.Periods.forEach(v => {
          // v - это период из общего массива периодов данной TL
          if (v.Contains(this.period, dt)) {
            if (!this.time_data.has(dt)) {
              this.time_data.set(dt, v);
              console.log(v);
            }
          }
        })
    }
    return
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

    let cellData = new CellData(dt, x0 - TimeLine.INTERVAL_WIDTH + 1, this.y, x0, this.y + TimeLine.LINE_THICKNESS - 1, path)
    this.data.push(cellData)
    this.findperiods(dt)
  }

  /**
   * Получить индекс в массиве this.data для данной координаты курсора
   *
   * @param {number} x
   * @param {number} y
   * @returns number
   * @memberof TimeLine
   */
  getCellValue (x: number, y: number): number {
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

  static getCurPeriod (periodType: EnumPeriod): number {
    let rt: number
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
        let o = DateUtils.getCurDate()
        rt = DateUtils.DaysFromAD(o.getFullYear(), o.getMonth() + 1, o.getDate())
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

  getPeriodAgo (period: number, offset: number): number {
    let dt0
    dt0 = period + offset
    if (dt0 === 0) {
      dt0 = dt0 + offset
    }
    return dt0
  }
}

class CellData {
  constructor (
    public value: number,
    public x1: number,
    public y1: number,
    public x2: number,
    public y2: number,
    public path: Path2D){}
}
