import { ApiClient } from "../ApiClient";
import { BoxView, BoxViewHtml } from "../BoxView";
import { ContextMenu } from "../contextmenu";
import { DateUtils } from "../dateutils";
import { Globals } from "../Globals";
import { LoginModel } from "../Login/LoginModel";
import { LoginView } from "../Login/LoginView";
import { MainModel } from "./MainModel";
import { MainView } from "./MainView";
import { RegisterModel } from "../Register/RegisterModel";
import { RegisterView } from "../Register/RegisterView";
import { EnumPeriod } from "../TLEvent";
import { TlistView } from "../Tlist/TlistView";
import { TLPeriod } from "../TLPeriod";
import * as NSEventPeriod from "../EP/EventPeriod"
import { AddPeriodView } from "../AddPeriod/AddPeriodView";
import { AddPeriodModel } from "../AddPeriod/AddPeriodModel";
import { UploadFileView } from "../UploadFileView";
import { PeriodContextMenu } from "../PeriodContextMenu";

export interface InterfaceExTLPeriod { il: number; ir: number; item: TLPeriod }

export class MainPresenter {
  private model: MainModel
  private view: MainView
  private menuCtx: ContextMenu
  private mainLine: NSEventPeriod.Event[]
  private isAuthenticated = false

  // ******************* Свойства *********************************

  // свойство Period
  private mPeriod: EnumPeriod = EnumPeriod.day
  public get Period() {
    return this.mPeriod
  }
  public set Period(value: EnumPeriod) {
    if (this.mPeriod !== value) {
      const oldPeriod = this.mPeriod
      this.mPeriod = value
      this.ViewChangePeriod(oldPeriod, value)
    }
  }
  // ! свойство Period

  public get MainLineCount(): number {
    return this.mainLine.length
  }

  // ****************** ! Свойства ********************************

  public OpenNewTLDialog() {
    const model = new AddPeriodModel()
    const today = new Date()
    model.Name = ""
    model.IsPeriod = false
    model.BeginType = EnumPeriod.day
    model.BeginDayDay = today.getDate()
    model.BeginDayMonth = today.getMonth() + 1
    model.BeginDayYear = today.getFullYear()
    model.BeginMonthMonth = today.getMonth() + 1
    model.BeginMonthYear = today.getFullYear()
    model.BeginYear = today.getFullYear()
    model.BeginDecadeDecade = DateUtils.getDecadeRelativeFromDate(today) + 1
    model.BeginDecadeCentury = 21
    model.BeginCentury = 21
    model.EndType = EnumPeriod.day
    model.EndDayDay = today.getDate()
    model.EndDayMonth = today.getMonth() + 1
    model.EndDayYear = today.getFullYear()
    model.EndMonthMonth = today.getMonth() + 1
    model.EndMonthYear = today.getFullYear()
    model.EndYear = today.getFullYear()
    model.EndDecadeDecade = DateUtils.getDecadeRelativeFromDate(today) + 1
    model.EndDecadeCentury = 21
    model.EndCentury = 21
    const view = new AddPeriodView(model)
    view.ShowDialog()
      .then(async (value) => {
        if (value) {
          const period = TLPeriod.CreateTLPeriodWithArgs(
            value.Name,
            value.IsPeriod,
            value.BeginType,
            value.BeginDayDay,
            value.BeginDayMonth,
            value.BeginDayYear,
            value.BeginMonthMonth,
            value.BeginMonthYear,
            value.BeginYear,
            value.BeginDecadeDecade,
            value.BeginDecadeCentury,
            value.BeginCentury,
            value.EndType,
            value.EndDayDay,
            value.EndDayMonth,
            value.EndDayYear,
            value.EndMonthMonth,
            value.EndMonthYear,
            value.EndYear,
            value.EndDecadeDecade,
            value.EndDecadeCentury,
            value.EndCentury
          )
          period.Parent = null
          this.model.Add(period)
        }
      })
      .catch()
  }

  public async OpenLoadTLDialog() {
    try {
      if (!this.isAuthenticated) throw "Не выполнен вход."
      const value = await ApiClient.getInstance().GetUsersList()
      const view = new TlistView(value)
      view.ShowDialog()
        .then(async (value) => {
          this.model.Add(value)
        })
        .catch()
    } catch (err) {
      await new BoxView(err).Show()
    }
  }

  public async UploadFile() {
    try {
      const view = new UploadFileView()
      //let value = await ApiClient.getInstance().GetUsersList()
      //let view = new TlistView(value)
      view.ShowDialog()
        .then(async (value) => {
          this.model.Add(value)
        })
        .catch()
    } catch(err) {
      await new BoxView(err).Show()
    }
  }

  public async OnSave(idx: number) {
    try {
      if (!this.isAuthenticated) throw "Не выполнен вход. Сохранение невозможно."
      await ApiClient.getInstance().SaveTL(this.model.Item(idx))
      await new BoxView('Данные сохранены').Show()
    } catch (err) {
      await new BoxView(err).Show()
    }
  }

  public async OnSaveToFile(idx: number) {
    try {
      this.download(JSON.stringify(this.model.Item(idx)), 'tl.json', 'application/json')
      await new BoxView('Данные сохранены').Show()
    } catch (err) {
      await new BoxView(Globals.ResponseErrorText(err)).Show()
    }
  }

  public async OnCollapse(idx: number) {
    const item = this.model.Item(idx)
    if (item.Parent) {
      this.model.Remove(idx)
    }
  }

  public async OnClose(idx: number) {
      this.model.Remove(idx)
  }

  public async OnShowAll(idx: number) {
    const source = this.model.Item(idx)
    const target = TLPeriod.CreateTLPeriod(source)
    target.IsShowAll = true
    this.model.Add(target)
  }

  // Function to download data to a file
  private download(data: string, filename: string, type: string) {
    const file = new Blob([data], { type: type })
    const a = document.createElement("a")
    const url = URL.createObjectURL(file)
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    setTimeout(function () {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 0)
  }

  public OnDragStart(ev: DragEvent, idx: number, id: number) {
    const [period] = this.FindPeriod(idx, id)
    ev.dataTransfer.setData('application/json', JSON.stringify(period))
    ev.dataTransfer.dropEffect = 'copy'
  }

  public OnDrop(ev: DragEvent, idx: number, id: number) {
    let period: TLPeriod
    if (id !== -1) {
      [period] = this.FindPeriod(idx, id)
    } else {
      period = this.model.Item(idx)
    }
    const data = ev.dataTransfer.getData('application/json')
    const tl = TLPeriod.CreateTLPeriod(JSON.parse(data))
    period.Add(tl)
    event.preventDefault();
  }

  /**
   * Поиск TLPeriod в модели, возвращает Tuple [TLPeriod, number]
   * @param idx - родительский TLPeriod
   * @param id - Свойства Id искомого периода
   */
  private FindPeriod(idx: number, id: number): [TLPeriod, number] {
    let idx0: number
    const period = this.model.Item(idx).Items.find((value, index) => {
      if (value.Id === id) {
        idx0 = index
        return true
      }
      else {
        return false
      }
    })
    return [period, idx0]
  }

  public OnPeriodContextMenu(ev: MouseEvent, idx: number, id: number) {
    const [period, idx0] = this.FindPeriod(idx, id)
    const menu = PeriodContextMenu.Create();
    menu.evSelect.subscribe(async (arg) => {
      switch (arg) {
        case 'expand':
          period.Parent = this.model.Item(idx)
          this.model.Add(period)
          break;
        case 'edit':
          await this.EditPeriod(idx, idx0, period)
          break;
        case 'del':
          this.model.Item(idx).Remove(idx0)
          break;
      }
    })
    menu.display(ev)
  }
  private async EditPeriod(idx: number, idx0: number, period: TLPeriod) {
    const model = new AddPeriodModel()
    const view = new AddPeriodView(model)
    model.Name = period.Name
    model.IsPeriod = period.IsPeriod
    model.BeginType = period.Begin.Type
    switch (period.Begin.Type) { // eslint-disable-line no-fallthrough
      case EnumPeriod.day: {
        const ymd = DateUtils.YMDFromAD(period.Begin.Day)
        model.BeginDayDay = ymd.day
        model.BeginDayMonth = ymd.month
        model.BeginDayYear = ymd.year
      }
      case EnumPeriod.month: // eslint-disable-line no-fallthrough
        model.BeginMonthMonth = DateUtils.getMonthFromMonth(period.Begin.Month)
        model.BeginMonthYear = DateUtils.getYearFromMonth(period.Begin.Month)
      case EnumPeriod.year: // eslint-disable-line no-fallthrough
        model.BeginYear = period.Begin.Year
      case EnumPeriod.decade: // eslint-disable-line no-fallthrough
        model.BeginDecadeDecade = DateUtils.getDecadeFromDecade(period.Begin.Decade)
        model.BeginDecadeCentury = DateUtils.getCenturyFromDecade(period.Begin.Decade)
      case EnumPeriod.century: // eslint-disable-line no-fallthrough
        model.BeginCentury = period.Begin.Century
        break;
    }
    model.EndType = period.End.Type
    switch (period.End.Type) {
      case EnumPeriod.day: {
        const ymd = DateUtils.YMDFromAD(period.End.Day)
        model.EndDayDay = ymd.day
        model.EndDayMonth = ymd.month
        model.EndDayYear = ymd.year
      }
      case EnumPeriod.month: // eslint-disable-line no-fallthrough
        model.EndMonthMonth = DateUtils.getMonthFromMonth(period.End.Month)
        model.EndMonthYear = DateUtils.getYearFromMonth(period.End.Month)
      case EnumPeriod.year: // eslint-disable-line no-fallthrough
        model.EndYear = period.End.Year
      case EnumPeriod.decade: // eslint-disable-line no-fallthrough
        model.EndDecadeDecade = DateUtils.getDecadeFromDecade(period.End.Decade)
        model.EndDecadeCentury = DateUtils.getCenturyFromDecade(period.End.Decade)
      case EnumPeriod.century: // eslint-disable-line no-fallthrough
        model.EndCentury = period.End.Century
        break;
    }
    view.ShowDialog()
      .then(async (value) => {
        if (value) {
          const tempPeriod = TLPeriod.CreateTLPeriodWithArgs(
            value.Name,
            value.IsPeriod,
            value.BeginType,
            value.BeginDayDay,
            value.BeginDayMonth,
            value.BeginDayYear,
            value.BeginMonthMonth,
            value.BeginMonthYear,
            value.BeginYear,
            value.BeginDecadeDecade,
            value.BeginDecadeCentury,
            value.BeginCentury,
            value.EndType,
            value.EndDayDay,
            value.EndDayMonth,
            value.EndDayYear,
            value.EndMonthMonth,
            value.EndMonthYear,
            value.EndYear,
            value.EndDecadeDecade,
            value.EndDecadeCentury,
            value.EndCentury
          )
          period.Name = tempPeriod.Name,
          period.Begin = tempPeriod.Begin
          period.End = tempPeriod.End
          period.mBeginDay = tempPeriod.mBeginDay
          period.mEndDay = tempPeriod.mEndDay
          period.Id = tempPeriod.Id
          this.view.RemoveDataRows(idx)
          this.DrawTL(idx, this.model.Item(idx))
        }
      })
      .catch()
  }

  public async OnAddPeriod(idx: number) {
    const model = new AddPeriodModel()
    const today = new Date()
    model.Name = ""
    model.IsPeriod = false
    model.BeginType = EnumPeriod.day
    model.BeginDayDay = today.getDate()
    model.BeginDayMonth = today.getMonth() + 1
    model.BeginDayYear = today.getFullYear()
    model.BeginMonthMonth = today.getMonth() + 1
    model.BeginMonthYear = today.getFullYear()
    model.BeginYear = today.getFullYear()
    model.BeginDecadeDecade = DateUtils.getDecadeRelativeFromDate(today) + 1
    model.BeginDecadeCentury = 21
    model.BeginCentury = 21
    model.EndType = EnumPeriod.day
    model.EndDayDay = today.getDate()
    model.EndDayMonth = today.getMonth() + 1
    model.EndDayYear = today.getFullYear()
    model.EndMonthMonth = today.getMonth() + 1
    model.EndMonthYear = today.getFullYear()
    model.EndYear = today.getFullYear()
    model.EndDecadeDecade = DateUtils.getDecadeRelativeFromDate(today) + 1
    model.EndDecadeCentury = 21
    model.EndCentury = 21
    const view = new AddPeriodView(model)
    view.ShowDialog()
      .then(async (value) => {
        if (value) {
          const period0 = this.model.Item(idx)
          const period = TLPeriod.CreateTLPeriodWithArgs(
            value.Name,
            value.IsPeriod,
            value.BeginType,
            value.BeginDayDay,
            value.BeginDayMonth,
            value.BeginDayYear,
            value.BeginMonthMonth,
            value.BeginMonthYear,
            value.BeginYear,
            value.BeginDecadeDecade,
            value.BeginDecadeCentury,
            value.BeginCentury,
            value.EndType,
            value.EndDayDay,
            value.EndDayMonth,
            value.EndDayYear,
            value.EndMonthMonth,
            value.EndMonthYear,
            value.EndYear,
            value.EndDecadeDecade,
            value.EndDecadeCentury,
            value.EndCentury
          ) 
          if (period.IsSubsetOf(period0, this.Period)) {
            period.Parent = period0
            period0.Add(period)
          } else {
            new BoxView("Добавляемый период не попадает в интервал Линии Времени").Show()
          }
        }
      })
    .catch()
  }

  public OnShowSlice(ev: number) {
    const ar: TLPeriod[] = this.model.GetSlice(ev, this.Period)
    const s = document.createElement('ul') as HTMLUListElement
    for (const o of ar) {
      const li = document.createElement('li')
      let txtPeriod: string
      if (o.IsPeriod) {
        txtPeriod = '(' + o.Begin.Format() + ' - ' + o.End.Format() + ')'
      } else {
        txtPeriod = '(' + o.Begin.Format() + ')'
      }
      li.textContent = txtPeriod + ' ' + o.Name
      s.append(li)
      }
      if (s.childNodes.length === 0) s.append('Нет событий.')
    new BoxViewHtml(s).Show()
  }

  public OnContextMenu(e: MouseEvent) {
    this.menuCtx.reload()
    this.menuCtx.display(e)
  }

  public get Count(): number {
    return this.model.Count
  }

  public Item(i: number): TLPeriod {
    return this.model.Item(i)
  }

  constructor(view: MainView, model: MainModel) {
    this.model = model
    this.view = view
    this.mPeriod = EnumPeriod.decade
    this.model.evAddTimeLine.subscribe((tl) => {
      this.view.DrawHeader(this.Count - 1, this.getHeaderText(this.Count - 1), tl.Parent === null)
      this.DrawTL(this.Count - 1, tl)
    })
    this.model.evRemoveTimeLine.subscribe((idx) => {
      this.view.RemoveHeader(idx)
      this.view.RemoveDataRows(idx)
    })
    this.model.evAddPeriod.subscribe((t) => {
      this.view.RemoveDataRows(t[0])
      this.DrawTL(t[0], this.model.Item(t[0]))
    })
    this.model.evRemovePeriod.subscribe((t) => {
      this.view.RemoveDataRows(t)
      this.DrawTL(t, this.model.Item(t))
    })
    const kvo = Math.floor((document.documentElement.clientWidth - 2) / 120)
    this.mainLine = new Array(kvo)
    this.InitMainLine(this.GetFirstInit())
    this.Draw()
  }

  private GetFirstInit() {
    const dt = new Date()
    let cur: number
    switch (this.Period) {
      case EnumPeriod.day:
        cur = DateUtils.DaysFromAD(dt.getFullYear(), dt.getMonth() + 1, dt.getDate())
        break;
      case EnumPeriod.month:
        cur = DateUtils.getMonthFromYMD({ year:dt.getFullYear(), month:dt.getMonth() + 1, day:dt.getDate() })
        break;
      case EnumPeriod.year:
        cur = dt.getFullYear()
        break;
      case EnumPeriod.decade:
        cur = DateUtils.getDecadeFromDate(dt)
        break;
      case EnumPeriod.century:
        cur = DateUtils.getCenturyFromDate(dt)
        break;
    }
    return cur - this.mainLine.length + 1
  }

  private InitMainLine(init: number) {
    for (let i = 0; i < this.mainLine.length; ++i) {
      if (init + i !== 0)
        this.mainLine[i] = new NSEventPeriod.Event(init + i, this.Period)
      else {
        this.mainLine[i] = new NSEventPeriod.Event(1, this.Period)
        init++
      }
    }
  }
    
  public OnPrevPeriod() {
    const i = this.mainLine[0].ValueEvent - 1
    if (i !== 0)
      this.InitMainLine(i)
    else
      this.InitMainLine(-1)
    this.Draw()
  }

  public OnPrevPage() {
    const i = this.mainLine[0].ValueEvent - this.mainLine.length
    if (i !== 0)
      this.InitMainLine(i)
    else
      this.InitMainLine(-1)
    this.Draw()
  }

  public OnNextPeriod() {
    const i = this.mainLine[0].ValueEvent + 1
    if (i !== 0)
      this.InitMainLine(i)
    else
      this.InitMainLine(1)
    this.Draw()
  }

  public OnNextPage() {
    const i = this.mainLine[0].ValueEvent + this.mainLine.length
    if (i !== 0)
      this.InitMainLine(i)
    else
      this.InitMainLine(1)
    this.Draw()
  }

  public Draw() {
    this.view.ClearContent()
    this.view.DrawDates(this.GetDrawDates())
    for (let i = 0; i < this.Count; i++) {
      this.view.DrawHeader(i, this.getHeaderText(i), this.Item(i).Parent === null)
      this.DrawTL(i, this.Item(i))
    }
  }

  private getHeaderText(tlIndex: number): string {
    const item = this.Item(tlIndex)
    let left: string
    let right: string
    switch (item.Begin.Type) {
      case EnumPeriod.day:
        left = DateUtils.formatDay(item.Begin.Day)
        break;
      case EnumPeriod.month:
        left = DateUtils.formatMonth(item.Begin.Month)
        break;
      case EnumPeriod.year:
        left = DateUtils.formatYear(item.Begin.Year)
        break;
      case EnumPeriod.decade:
        left = DateUtils.formatDecade(item.Begin.Decade)
        break;
      case EnumPeriod.century:
        left = DateUtils.formatCentury(item.Begin.Century)
        break;
    }
    switch (item.End.Type) {
      case EnumPeriod.day:
        right = DateUtils.formatDay(item.End.Day)
        break;
      case EnumPeriod.month:
        right = DateUtils.formatMonth(item.End.Month)
        break;
      case EnumPeriod.year:
        right = DateUtils.formatYear(item.End.Year)
        break;
      case EnumPeriod.decade:
        right = DateUtils.formatDecade(item.End.Decade)
        break;
      case EnumPeriod.century:
        right = DateUtils.formatCentury(item.End.Century)
        break;
    }
    return item.Name + ' ' + left + ' - ' + right
  }

  private GetDrawDates(): [string[], number[]] {
    const dates: string[] = []
    const datesNum: number[] = []
    for (let i = 0; i < this.mainLine.length; ++i) {
      datesNum.push(this.mainLine[i].ValueEvent)
      switch (this.Period) {
        case EnumPeriod.day:
          dates.push(DateUtils.formatDay(this.mainLine[i].ValueEvent))
          break
        case EnumPeriod.month:
          dates.push(DateUtils.formatMonth(this.mainLine[i].ValueEvent))
          break
        case EnumPeriod.year:
          dates.push(DateUtils.formatYear(this.mainLine[i].ValueEvent))
          break
        case EnumPeriod.decade:
          dates.push(DateUtils.formatDecade(this.mainLine[i].ValueEvent))
          break
        case EnumPeriod.century:
          dates.push(DateUtils.formatCentury(this.mainLine[i].ValueEvent))
          break
      }
    }
    return [dates, datesNum]
  }

  private getPeriodsInInterval(model: TLPeriod): TLPeriod[] {
    return model.Items.filter((value) => {
      return value.IsIntersectIntervalsForPeriod(this.mainLine[0].ValueEvent, this.mainLine[this.mainLine.length - 1].ValueEvent, this.Period)
    })
  }

  private DrawTL(tlIndex: number, model: TLPeriod) {
    // выбрать периоды попадающие в общий диапазон
    let items: TLPeriod[] = []
    if (!model.IsShowAll) {
      items = this.getPeriodsInInterval(model)
    } else {
      model.getAllSuitablePeriodsFromHierarchy(this.mainLine[0].ValueEvent, this.mainLine[this.mainLine.length - 1].ValueEvent, this.Period, items)
    }
    // вычисляем индексы
    let exItems: InterfaceExTLPeriod[] = []
    for (const p of items) {
      let il: number = null, ir: number = null
      let попал: boolean
      for (let i = 0; i < this.mainLine.length; i++) {
        попал = p.IsIntersectIntervalsForPeriod(this.mainLine[i].ValueEvent, this.mainLine[i].ValueEvent, this.Period)
        if (il === null) {
          if (попал) {
            il = i
          }
        }
        if (il !== null) {
          if (!попал) {
            ir = i - 1
            break
          }
        }
      }
      if (il !== null && ir === null) {
        ir = this.mainLine.length - 1
      }
      exItems.push({il: il, ir: ir, item: p})
    }
    // упакуем
    const полки: InterfaceExTLPeriod[][] = []
    let НомерПолки = -1 // индекс полки
    let НашлосьМесто: boolean
    let свободнаяфишка: InterfaceExTLPeriod
    let НомераУложенныхФишекНаПоследнююПолку: number[]
    while (exItems.length > 0) {
      let i = 0
      полки.push([])
      НомерПолки++
      НомераУложенныхФишекНаПоследнююПолку = []
      while (i < exItems.length) {
        свободнаяфишка = exItems[i]
        НашлосьМесто = true
        for (const уложеннаяфишка of полки[НомерПолки]) {
          if (TLPeriod.isIntersectIntervals(уложеннаяфишка.il, уложеннаяфишка.ir, свободнаяфишка.il, свободнаяфишка.ir)) {
            НашлосьМесто = false
            break
          }
        }
        if (НашлосьМесто) {
          полки[НомерПолки].push(свободнаяфишка)
          НомераУложенныхФишекНаПоследнююПолку.push(i)
        }
        i++
      }
      exItems = exItems.filter((_, index) => {
        return !НомераУложенныхФишекНаПоследнююПолку.includes(index)
      })
    }

    полки.reverse()
    for (const exitem of полки) {
      exitem.sort((a, b) => {
        return a.il - b.il
      })
      this.view.DrawEventsRow(tlIndex, exitem)
    }
  }

  public async OnLogin(): Promise<string> {
    if (!this.isAuthenticated) {
      const loginModel = new LoginModel(Globals.getCookie('timelineuser') || '')
      const loginView = new LoginView(loginModel)
      if (await loginView.ShowDialog()) {
        this.isAuthenticated = true
        return loginModel.Login
      } else {
        return null
      }
    } else {
      if (await ApiClient.getInstance().DoLogout()) {
        this.isAuthenticated = false
        return null
      }
    }
  }

  public async OnRegister() {
    const regModel = new RegisterModel('', '')
    const regView = new RegisterView(regModel)
    if (await regView.ShowDialog()) {
      await new BoxView(`Пользователь ${regModel.Login} успешно зарегистрирован`).Show()
    }
  }

  public async OnScaleForward(idx: number) {
    const value = this.mainLine[idx].ValueEvent
    let init: number
    switch (this.Period) {
      case EnumPeriod.day:
        this.Period = EnumPeriod.century
        init = DateUtils.getCenturyFromYMD(DateUtils.YMDFromAD(value))
        break
      case EnumPeriod.month:
        this.Period = EnumPeriod.day
        init = DateUtils.getDayFromYMD(DateUtils.YMDFromAD(DateUtils.FirstDayOfMonth(value)))
        break
      case EnumPeriod.year:
        this.Period = EnumPeriod.month
        init = DateUtils.getMonthFromYMD(DateUtils.YMDFromAD(DateUtils.FirstDayOfYear(value)))
        break
      case EnumPeriod.decade:
        this.Period = EnumPeriod.year
        init = DateUtils.YMDFromAD(DateUtils.FirstDayOfDecade(value)).year
        break
      case EnumPeriod.century:
        this.Period = EnumPeriod.decade
        init = DateUtils.getDecadeFromYMD(DateUtils.YMDFromAD(DateUtils.FirstDayOfCentury(value)))
        break
    }
    this.InitMainLine(init)
    this.Draw()
  }

  public async OnScaleBack(idx: number) {
    const value = this.mainLine[idx].ValueEvent
    let init: number
    switch (this.Period) {
      case EnumPeriod.day:
        this.Period = EnumPeriod.month
        init = DateUtils.getMonthFromYMD(DateUtils.YMDFromAD(value))
        break
      case EnumPeriod.month:
        this.Period = EnumPeriod.year
        init = DateUtils.getYearFromYMD(DateUtils.getYMDFromMonth(value))
        break
      case EnumPeriod.year:
        this.Period = EnumPeriod.decade
        init = DateUtils.getDecadeFromYMD(DateUtils.getYMDFromYear(value))
        break
      case EnumPeriod.decade:
        this.Period = EnumPeriod.century
        init = DateUtils.getCenturyFromYMD(DateUtils.getYMDFromDecade(value))
        break
      case EnumPeriod.century:
        this.Period = EnumPeriod.day
        init = DateUtils.getDayFromYMD(DateUtils.getYMDFromCentury(value))
        break
    }
    this.InitMainLine(init)
    this.Draw()
  }

  private ViewChangePeriod(oldPeriod: EnumPeriod, period: EnumPeriod) { // eslint-disable-line
    //let init: number
    //let ymd: YearMonthDay
    //let day: number
    //MyContextMenu.ChangeIconMenuPeriod(period)

    //switch (old_period) {
    //  case EnumPeriod.day:
    //    day = this.mainLine[0]
    //    break;
    //  case EnumPeriod.month:
    //    day = DateUtils.FirstDayOfMonth(this.mainLine[0])
    //    break;
    //  case EnumPeriod.year:
    //    day = DateUtils.FirstDayOfYear(this.mainLine[0])
    //    break;
    //  case EnumPeriod.decade:
    //    day = DateUtils.FirstDayOfDecade(this.mainLine[0])
    //    break;
    //  case EnumPeriod.century:
    //    day = DateUtils.FirstDayOfCentury(this.mainLine[0])
    //    break;
    //}
    //ymd = DateUtils.YMDFromAD(day)

    //switch (period) {
    //  case EnumPeriod.day:
    //    init = day
    //    break;
    //  case EnumPeriod.month:
    //    init = DateUtils.getMonthFromYMD(ymd)
    //    break;
    //  case EnumPeriod.year:
    //    init = DateUtils.getYearFromYMD(ymd)
    //    break;
    //  case EnumPeriod.decade:
    //    init = DateUtils.getDecadeFromYMD(ymd)
    //    break;
    //  case EnumPeriod.century:
    //    init = DateUtils.getCenturyFromYMD(ymd)
    //    break;
    //}
    //this.InitMainLine(init)
    //this.Draw()
  }
}