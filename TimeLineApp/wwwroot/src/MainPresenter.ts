import { ApiClient } from "./ApiClient";
import { BoxView } from "./BoxView";
import { ContextMenu } from "./contextmenu";
import { DateUtils, YearMonthDay } from "./dateutils";
import { EditStringView } from "./EditStringView";
import { Globals } from "./Globals";
import { LoginModel } from "./LoginModel";
import { LoginView } from "./LoginView";
import { MainModel } from "./MainModel";
import { MainView } from "./MainView";
import { MyContextMenu } from "./MyContextMenu";
import { RegisterModel } from "./RegisterModel";
import { RegisterView } from "./RegisterView";
import { TimeLineModel } from "./TimeLineModel";
import { EnumPeriod, TLEvent, TLEventDay, TLEventMonth } from "./TLEvent";
import { TlistView } from "./TlistView";
import { TLPeriod } from "./TLPeriod";

export class MainPresenter {
  private model: MainModel
  private view: MainView
  private menuCtx: ContextMenu
  private mainLine: TLEvent[]

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
      this.DrawTL(tl)
    })
    let kvo = Math.floor((document.documentElement.clientWidth - 2) / 87)
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
        this.mainLine[i] = init + i
      else {
        this.mainLine[i] = 1
        init++
      }
    }
  }

  private CreateEvent(i: number): TLEvent {
    let cur: TLEvent
    switch (this.Period) {
      case EnumPeriod.day:
        cur = TLEventDay.CreateTLEventDay1("", i)
        break;
      case EnumPeriod.month:
        cur = TLEventMonth.CreateTLEventMonth1("", i)
        break;
      case EnumPeriod.year:
        cur = TLEventDay.CreateTLEventDay1("", i)
        break;
      case EnumPeriod.decade:
        cur = TLEventDay.CreateTLEventDay1("", i)
        break;
      case EnumPeriod.century:
        cur = TLEventDay.CreateTLEventDay1("", i)
        break;
    }
    return cur
  }

  private ViewChangePeriod(old_period: EnumPeriod, period: EnumPeriod) {
    let init: number
    let ymd: YearMonthDay
    let day: number
    MyContextMenu.ChangeIconMenuPeriod(period)

    switch (old_period) {
      case EnumPeriod.day:
        day = this.mainLine[0]
        break;
      case EnumPeriod.month:
        day = DateUtils.FirstDayOfMonth(this.mainLine[0])
        break;
      case EnumPeriod.year:
        day = DateUtils.FirstDayOfYear(this.mainLine[0])
        break;
      case EnumPeriod.decade:
        day = DateUtils.FirstDayOfDecade(this.mainLine[0])
        break;
      case EnumPeriod.century:
        day = DateUtils.FirstDayOfCentury(this.mainLine[0])
        break;
    }
    ymd = DateUtils.YMDFromAD(day)

    switch (period) {
      case EnumPeriod.day:
        init = day
        break;
      case EnumPeriod.month:
        init = DateUtils.getMonthFromYMD(ymd)
        break;
      case EnumPeriod.year:
        init = DateUtils.getYearFromYMD(ymd)
        break;
      case EnumPeriod.decade:
        init = DateUtils.getDecadeFromYMD(ymd)
        break;
      case EnumPeriod.century:
        init = DateUtils.getCenturyFromYMD(ymd)
        break;
    }
    this.InitMainLine(init)
    this.Draw()
  }

  public OnPrev_Period() {
    let i = this.mainLine[0] - 1
    if (i !== 0)
      this.InitMainLine(i)
    else
      this.InitMainLine(-1)
    this.Draw()
  }

  public OnPrev_Page() {
    let i = this.mainLine[0] - this.mainLine.length
    if (i !== 0)
      this.InitMainLine(i)
    else
      this.InitMainLine(-1)
    this.Draw()
  }

  public OnNext_Period() {
    let i = this.mainLine[0] + 1
    if (i !== 0)
      this.InitMainLine(i)
    else
      this.InitMainLine(1)
    this.Draw()
  }

  public OnNext_Page() {
    let i = this.mainLine[0] + this.mainLine.length
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
      this.DrawTL(this.Item(i))
    }
  }

  private GetDrawDates(): string[] {
    let dates: string[] = []
    for (let i = 0; i < this.mainLine.length; ++i) {
      switch (this.Period) {
        case EnumPeriod.day:
          dates.push(DateUtils.formatDate(this.mainLine[i]))
          break
        case EnumPeriod.month:
          dates.push(DateUtils.formatMonth(this.mainLine[i]))
          break
        case EnumPeriod.year:
          dates.push(DateUtils.formatYear(this.mainLine[i]))
          break
        case EnumPeriod.decade:
          dates.push(DateUtils.formatDecade(this.mainLine[i]))
          break
        case EnumPeriod.century:
          dates.push(DateUtils.formatCentury(this.mainLine[i]))
          break
      }
    }
    return dates
  }

  private DrawTL(model: TimeLineModel) {
    this.view.DrawHeader(model.Name)
    let begin_day: number, end_day: number

    let items = model.Items.filter((value, index, array) => {
      return value.IsIntersectIntervals(this.mainLine[0], this.mainLine[this.mainLine.length - 1])
    })
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
}