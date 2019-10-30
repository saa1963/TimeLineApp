import { ApiClient } from "../ApiClient";
import { BoxView } from "../BoxView";
import { ContextMenu } from "../contextmenu";
import { DateUtils, YearMonthDay } from "../dateutils";
import { EditStringView } from "../EditStringView";
import { Globals } from "../Globals";
import { LoginModel } from "../Login/LoginModel";
import { LoginView } from "../Login/LoginView";
import { MainModel } from "./MainModel";
import { MainView } from "./MainView";
import { MyContextMenu } from "../MyContextMenu";
import { RegisterModel } from "../Register/RegisterModel";
import { RegisterView } from "../Register//RegisterView";
import { TimeLineModel } from "../TimeLineModel";
import { EnumPeriod } from "../TLEvent";
import { TlistView } from "../Tlist/TlistView";
import { TLPeriod } from "../TLPeriod";
import { NS_EventPeriod } from "../EP/EventPeriod"
import { AddPeriodView } from "../AddPeriod/AddPeriodView";
import { AddPeriodModel } from "../AddPeriod/AddPeriodModel";

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
    let view = new EditStringView('')
    view.Show()
      .then(async (value) => {
        if (value) {
          //await new BoxView(value).Show()
          this.model.Add(TimeLineModel.CreateTimeLineModel(value))
        }
      })
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

  public async OnAddPeriod(idx: number) {
    let model = new AddPeriodModel()
    let today = new Date()
    model.Name = "Новый период"
    model.IsPeriod = true
    model.BeginType = EnumPeriod.day
    model.Begin_DayDay = today.getDate()
    model.Begin_DayMonth = today.getMonth() + 1
    model.Begin_DayYear = today.getFullYear()
    let view = new AddPeriodView(model)
    view.ShowDialog()
      .then(async (value) => {
        if (value) {
          await new BoxView("OK").Show()
        } else {
          await new BoxView("Fail").Show()
        }
      })
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

  public Item(i: number): TimeLineModel {
    return this.model.Item(i)
  }

  constructor(view: MainView, model: MainModel) {
    this.model = model
    this.view = view
    this.menuCtx = MyContextMenu.Create()
    this.menuCtx.evSelect.subscribe((s) => {
      switch (s) {
        case 'new':
          this.OpenNewTLDialog()
          break;
        case 'load':
          this.OpenLoadTLDialog()
          break;
        case 'save':
          this.SaveCurrentTL()
          break;
        case 'switch_to_day':
          this.Period = EnumPeriod.day
          break;
        case 'switch_to_month':
          this.Period = EnumPeriod.month
          break;
        case 'switch_to_year':
          this.Period = EnumPeriod.year
          break;
        case 'switch_to_decade':
          this.Period = EnumPeriod.decade
          break;
        case 'switch_to_century':
          this.Period = EnumPeriod.century
          break;
      }
    })
    this.m_Period = EnumPeriod.decade
    this.model.evAddTimeLine.subscribe((tl) => {
      this.DrawTL(this.Count - 1, tl)
    })
    let kvo = Math.floor((document.documentElement.clientWidth - 2) / 120)
    this.mainLine = new Array(kvo)
    this.InitMainLine(this.GetFirstInit())
    this.Draw()
  }

  private GetFirstInit() {
    let init
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
      this.DrawTL(i, this.Item(i))
    }
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

  private DrawTL(tl_index: number, model: TimeLineModel) {
    this.view.DrawHeader(tl_index, model.Name)
    // выбрать периоды попадающие в общий диапазон
    let items = model.Items.filter((value, index, array) => {
      return value.IsIntersectIntervalsForPeriod(this.mainLine[0].ValueEvent, this.mainLine[this.mainLine.length - 1].ValueEvent, this.Period)
    })
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

    for (let exitem of полки) {
      this.view.DrawEventsRow(exitem)
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

  public async OnScale(idx: number) {
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
}