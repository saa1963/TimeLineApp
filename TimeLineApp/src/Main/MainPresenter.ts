﻿import { ApiClient } from "../ApiClient";
import { BoxView } from "../BoxView";
import { ContextMenu } from "../contextmenu";
import { DateUtils, YearMonthDay } from "../dateutils";
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
import { NS_EventPeriod } from "../EP/EventPeriod"
import { AddPeriodView } from "../AddPeriod/AddPeriodView";
import { AddPeriodModel } from "../AddPeriod/AddPeriodModel";
import { UploadFileView } from "../UploadFileView";
import { PeriodContextMenu } from "../PeriodContextMenu";

export interface IExTLPeriod { il: number, ir: number, item: TLPeriod }

export class MainPresenter {
  private model: MainModel
  private view: MainView
  private menuCtx: ContextMenu
  private mainLine: NS_EventPeriod.Event[]

  // ******************* Свойства *********************************

  // свойство Period
  private m_Period: EnumPeriod = EnumPeriod.day
  public get Period() {
    return this.m_Period
  }
  public set Period(value: EnumPeriod) {
    if (this.m_Period !== value) {
      let old_period = this.m_Period
      this.m_Period = value
      this.ViewChangePeriod(old_period, value)
    }
  }
  // ! свойство Period

  public get MainLineCount(): number {
    return this.mainLine.length
  }

  // ****************** ! Свойства ********************************

  public OpenNewTLDialog() {
    let model = new AddPeriodModel()
    let today = new Date()
    model.Name = ""
    model.IsPeriod = false
    model.BeginType = EnumPeriod.day
    model.Begin_DayDay = today.getDate()
    model.Begin_DayMonth = today.getMonth() + 1
    model.Begin_DayYear = today.getFullYear()
    model.Begin_MonthMonth = today.getMonth() + 1
    model.Begin_MonthYear = today.getFullYear()
    model.Begin_Year = today.getFullYear()
    model.Begin_DecadeDecade = DateUtils.getDecadeRelativeFromDate(today) + 1
    model.Begin_DecadeCentury = 21
    model.Begin_Century = 21
    model.EndType = EnumPeriod.day
    model.End_DayDay = today.getDate()
    model.End_DayMonth = today.getMonth() + 1
    model.End_DayYear = today.getFullYear()
    model.End_MonthMonth = today.getMonth() + 1
    model.End_MonthYear = today.getFullYear()
    model.End_Year = today.getFullYear()
    model.End_DecadeDecade = DateUtils.getDecadeRelativeFromDate(today) + 1
    model.End_DecadeCentury = 21
    model.End_Century = 21
    let view = new AddPeriodView(model)
    view.ShowDialog()
      .then(async (value) => {
        if (value) {
          let period = TLPeriod.CreateTLPeriodWithArgs(
            value.Name,
            value.IsPeriod,
            value.BeginType,
            value.Begin_DayDay,
            value.Begin_DayMonth,
            value.Begin_DayYear,
            value.Begin_MonthMonth,
            value.Begin_MonthYear,
            value.Begin_Year,
            value.Begin_DecadeDecade,
            value.Begin_DecadeCentury,
            value.Begin_Century,
            value.EndType,
            value.End_DayDay,
            value.End_DayMonth,
            value.End_DayYear,
            value.End_MonthMonth,
            value.End_MonthYear,
            value.End_Year,
            value.End_DecadeDecade,
            value.End_DecadeCentury,
            value.End_Century
          )
          period.Parent = null
          this.model.Add(period)
        }
      })
      .catch()
  }

  public async OpenLoadTLDialog() {
    try {
      let value = await ApiClient.getInstance().GetUsersList()
      let view = new TlistView(value)
      view.ShowDialog()
        .then(async (value) => {
          this.model.Add(value)
        })
        .catch(() => { })
    } catch (err) {
      await new BoxView(err).Show()
    }
  }

  public async UploadFile() {
    try {
      let view = new UploadFileView()
      //let value = await ApiClient.getInstance().GetUsersList()
      //let view = new TlistView(value)
      view.ShowDialog()
        .then(async (value) => {
          this.model.Add(value)
        })
        .catch(() => { })
    } catch(err) {
      await new BoxView(err).Show()
    }
  }

  public async OnSave(idx: number) {
    try {
      await ApiClient.getInstance().SaveTL(this.model.Item(idx))
      await new BoxView('Данные сохранены').Show()
    } catch (err) {
      await new BoxView(Globals.ResponseErrorText(err)).Show()
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
    let item = this.model.Item(idx)
    if (item.Parent) {
      this.model.Remove(idx)
    }
  }

  public async OnShowAll(idx: number) {
    this.model.Add(this.model.Item(idx))
    //this.view.DrawHeader(idx, this.getHeaderText(idx), this.model.Item(idx).Parent == null)
    //this.DrawTL(idx, this.model.Item(idx), (x) => { return this.qq(x) })
  }

  private qq(p: TLPeriod): TLPeriod[] {
    let rt: TLPeriod[] = []
    for (let i = 0; i < p.Periods.length; i++) {
      let period = p.Periods[i]
      if (period.Count == 0) {
        if (period.IsIntersectIntervalsForPeriod(this.mainLine[0].ValueEvent, this.mainLine[this.mainLine.length - 1].ValueEvent, this.Period)) {
          rt.push(period)
        }
      } else {
        rt.concat(this.qq(period))
      }
    }
    return rt
  }

  // Function to download data to a file
  private download(data: string, filename: string, type: string) {
    let file = new Blob([data], { type: type })
    let a = document.createElement("a")
    let url = URL.createObjectURL(file)
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
    let [period] = this.FindPeriod(idx, id)
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
    let data = ev.dataTransfer.getData('application/json')
    let tl = TLPeriod.CreateTLPeriod(JSON.parse(data))
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
    let period = this.model.Item(idx).Items.find((value, index, array) => {
      if (value.Id == id) {
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
    let [period, idx0] = this.FindPeriod(idx, id)
    let menu = PeriodContextMenu.Create();
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
    menu.reload()
    menu.display(ev)
  }

  private async EditPeriod(idx: number, idx0: number, period: TLPeriod) {
    let model = new AddPeriodModel()
    let view = new AddPeriodView(model)
    model.Name = period.Name
    model.IsPeriod = period.IsPeriod
    model.BeginType = period.Begin.Type
    switch (period.Begin.Type) {
      case EnumPeriod.day:
        let ymd = DateUtils.YMDFromAD(period.Begin.Day)
        model.Begin_DayDay = ymd.day
        model.Begin_DayMonth = ymd.month
        model.Begin_DayYear = ymd.year
      case EnumPeriod.month:
        model.Begin_MonthMonth = DateUtils.getMonthFromMonth(period.Begin.Month)
        model.Begin_MonthYear = DateUtils.getYearFromMonth(period.Begin.Month)
      case EnumPeriod.year:
        model.Begin_Year = period.Begin.Year
      case EnumPeriod.decade:
        model.Begin_DecadeDecade = DateUtils.getDecadeFromDecade(period.Begin.Decade)
        model.Begin_DecadeCentury = DateUtils.getCenturyFromDecade(period.Begin.Decade)
      case EnumPeriod.century:
        model.Begin_Century = period.Begin.Century
        break;
    }
    model.EndType = period.End.Type
    switch (period.End.Type) {
      case EnumPeriod.day:
        let ymd = DateUtils.YMDFromAD(period.End.Day)
        model.End_DayDay = ymd.day
        model.End_DayMonth = ymd.month
        model.End_DayYear = ymd.year
      case EnumPeriod.month:
        model.End_MonthMonth = DateUtils.getMonthFromMonth(period.End.Month)
        model.End_MonthYear = DateUtils.getYearFromMonth(period.End.Month)
      case EnumPeriod.year:
        model.End_Year = period.End.Year
      case EnumPeriod.decade:
        model.End_DecadeDecade = DateUtils.getDecadeFromDecade(period.End.Decade)
        model.End_DecadeCentury = DateUtils.getCenturyFromDecade(period.End.Decade)
      case EnumPeriod.century:
        model.End_Century = period.End.Century
        break;
    }
    view.ShowDialog()
      .then(async (value) => {
        if (value) {
          let temp_period = TLPeriod.CreateTLPeriodWithArgs(
            value.Name,
            value.IsPeriod,
            value.BeginType,
            value.Begin_DayDay,
            value.Begin_DayMonth,
            value.Begin_DayYear,
            value.Begin_MonthMonth,
            value.Begin_MonthYear,
            value.Begin_Year,
            value.Begin_DecadeDecade,
            value.Begin_DecadeCentury,
            value.Begin_Century,
            value.EndType,
            value.End_DayDay,
            value.End_DayMonth,
            value.End_DayYear,
            value.End_MonthMonth,
            value.End_MonthYear,
            value.End_Year,
            value.End_DecadeDecade,
            value.End_DecadeCentury,
            value.End_Century
          )
          period.Name = temp_period.Name,
          period.Begin = temp_period.Begin
          period.End = temp_period.End
          period.m_BeginDay = temp_period.m_BeginDay
          period.m_EndDay = temp_period.m_EndDay
          period.Id = temp_period.Id
          this.view.RemoveDataRows(idx)
          this.DrawTL(idx, this.model.Item(idx))
        }
      })
      .catch()
  }

  public async OnAddPeriod(idx: number) {
    let model = new AddPeriodModel()
    let today = new Date()
    model.Name = ""
    model.IsPeriod = false
    model.BeginType = EnumPeriod.day
    model.Begin_DayDay = today.getDate()
    model.Begin_DayMonth = today.getMonth() + 1
    model.Begin_DayYear = today.getFullYear()
    model.Begin_MonthMonth = today.getMonth() + 1
    model.Begin_MonthYear = today.getFullYear()
    model.Begin_Year = today.getFullYear()
    model.Begin_DecadeDecade = DateUtils.getDecadeRelativeFromDate(today) + 1
    model.Begin_DecadeCentury = 21
    model.Begin_Century = 21
    model.EndType = EnumPeriod.day
    model.End_DayDay = today.getDate()
    model.End_DayMonth = today.getMonth() + 1
    model.End_DayYear = today.getFullYear()
    model.End_MonthMonth = today.getMonth() + 1
    model.End_MonthYear = today.getFullYear()
    model.End_Year = today.getFullYear()
    model.End_DecadeDecade = DateUtils.getDecadeRelativeFromDate(today) + 1
    model.End_DecadeCentury = 21
    model.End_Century = 21
    let view = new AddPeriodView(model)
    view.ShowDialog()
      .then(async (value) => {
        if (value) {
          let period0 = this.model.Item(idx)
          let period = TLPeriod.CreateTLPeriodWithArgs(
            value.Name,
            value.IsPeriod,
            value.BeginType,
            value.Begin_DayDay,
            value.Begin_DayMonth,
            value.Begin_DayYear,
            value.Begin_MonthMonth,
            value.Begin_MonthYear,
            value.Begin_Year,
            value.Begin_DecadeDecade,
            value.Begin_DecadeCentury,
            value.Begin_Century,
            value.EndType,
            value.End_DayDay,
            value.End_DayMonth,
            value.End_DayYear,
            value.End_MonthMonth,
            value.End_MonthYear,
            value.End_Year,
            value.End_DecadeDecade,
            value.End_DecadeCentury,
            value.End_Century
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

  public async SaveCurrentTL() {

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
    this.m_Period = EnumPeriod.decade
    this.model.evAddTimeLine.subscribe((tl) => {
      this.view.DrawHeader(this.Count - 1, this.getHeaderText(this.Count - 1), tl.Parent == null)
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
    let kvo = Math.floor((document.documentElement.clientWidth - 2) / 120)
    this.mainLine = new Array(kvo)
    this.InitMainLine(this.GetFirstInit())
    this.Draw()
  }

  private GetFirstInit() {
    let dt = new Date()
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
        this.mainLine[i] = NS_EventPeriod.Event.CreateEvent(init + i, this.Period)
      else {
        this.mainLine[i] = NS_EventPeriod.Event.CreateEvent(1, this.Period)
        init++
      }
    }
  }

  private ViewChangePeriod(old_period: EnumPeriod, period: EnumPeriod) {
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

  public OnPrev_Period() {
    let i = this.mainLine[0].ValueEvent - 1
    if (i !== 0)
      this.InitMainLine(i)
    else
      this.InitMainLine(-1)
    this.Draw()
  }

  public OnPrev_Page() {
    let i = this.mainLine[0].ValueEvent - this.mainLine.length
    if (i !== 0)
      this.InitMainLine(i)
    else
      this.InitMainLine(-1)
    this.Draw()
  }

  public OnNext_Period() {
    let i = this.mainLine[0].ValueEvent + 1
    if (i !== 0)
      this.InitMainLine(i)
    else
      this.InitMainLine(1)
    this.Draw()
  }

  public OnNext_Page() {
    let i = this.mainLine[0].ValueEvent + this.mainLine.length
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
      this.view.DrawHeader(i, this.getHeaderText(i), this.Item(i).Parent == null)
      this.DrawTL(i, this.Item(i))
    }
  }

  private getHeaderText(tl_index: number): string {
    let item = this.Item(tl_index)
    let left: string
    let right: string
    switch (item.Begin.Type) {
      case EnumPeriod.day:
        left = DateUtils.formatDate(item.Begin.Day)
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
        right = DateUtils.formatDate(item.End.Day)
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

  private GetDrawDates(): string[] {
    let dates: string[] = []
    for (let i = 0; i < this.mainLine.length; ++i) {
      switch (this.Period) {
        case EnumPeriod.day:
          dates.push(DateUtils.formatDate(this.mainLine[i].ValueEvent))
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
    return dates
  }

  private getPeriodsInInterval(model: TLPeriod): TLPeriod[] {
    return model.Items.filter((value, index, array) => {
      return value.IsIntersectIntervalsForPeriod(this.mainLine[0].ValueEvent, this.mainLine[this.mainLine.length - 1].ValueEvent, this.Period)
    })
  }

  private DrawTL(tl_index: number, model: TLPeriod, filter?: (x: TLPeriod) => TLPeriod[]) {
    // выбрать периоды попадающие в общий диапазон
    let items: TLPeriod[]
    if (!filter) {
      items = this.getPeriodsInInterval(model)
    } else {
      items = filter(model)
    }
    // вычисляем индексы
    let exItems: IExTLPeriod[] = []
    for (let p of items) {
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
    let полки: IExTLPeriod[][] = []
    let НомерПолки = -1 // индекс полки
    let НашлосьМесто: boolean
    let свободнаяфишка: IExTLPeriod
    let НомераУложенныхФишекНаПоследнююПолку: number[]
    while (exItems.length > 0) {
      let i = 0
      полки.push([])
      НомерПолки++
      НомераУложенныхФишекНаПоследнююПолку = []
      while (i < exItems.length) {
        свободнаяфишка = exItems[i]
        НашлосьМесто = true
        for (let уложеннаяфишка of полки[НомерПолки]) {
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
      exItems = exItems.filter((value, index, array) => {
        return !НомераУложенныхФишекНаПоследнююПолку.includes(index)
      })
    }

    полки.reverse()
    for (let exitem of полки) {
      exitem.sort((a, b) => {
        return a.il - b.il
      })
      this.view.DrawEventsRow(tl_index, exitem)
    }
  }

  public async OnLogin(): Promise<string> {
    if (!Globals.IsAuthentificated) {
      let loginModel = new LoginModel(Globals.getCookie('timelineuser') || '')
      let loginView = new LoginView(loginModel)
      if (await loginView.ShowDialog()) {
        Globals.IsAuthentificated = true
        return loginModel.Login
      } else {
        return null
      }
    } else {
      if (await ApiClient.getInstance().DoLogout()) {
        Globals.IsAuthentificated = false
        return null
      }
    }
  }

  public async OnRegister() {
    let regModel = new RegisterModel('', '')
    let regView = new RegisterView(regModel)
    if (await regView.ShowDialog()) {
      await new BoxView(`Пользователь ${regModel.Login} успешно зарегистрирован`).Show()
    }
  }

  public async OnScaleForward(idx: number) {
    let value = this.mainLine[idx].ValueEvent
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
    let value = this.mainLine[idx].ValueEvent
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
}