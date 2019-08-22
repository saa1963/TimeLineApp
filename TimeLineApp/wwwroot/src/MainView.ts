import { MainPresenter } from "./MainPresenter";
import { ContextMenu, MenuItem, MenuItemType, MenuItemDivider, MenuItemSub } from "./contextmenu";
import { EnumPeriod } from "./TLEvent";
import { TimeLine } from "./timeline";
import { LoginView } from "./LoginView";
import { Globals } from "./Globals";
import { LoginModel } from "./LoginModel";
import { RegisterModel } from "./RegisterModel";
import { RegisterView } from "./RegisterView";
import * as $ from 'jquery'
import { TlistView } from "./TlistView";
import { ApiClient } from "./ApiClient";
import { BoxView } from "./BoxView";
import { EditStringView } from "./EditStringView";

export class MainView {
  // private свойства
  private ctx: CanvasRenderingContext2D
  private menuCtx: ContextMenu

  // пункты меню с периодами
  private PeriodDay: MenuItem
  private PeriodMonth: MenuItem
  private PeriodYear: MenuItem
  private PeriodDecade: MenuItem
  private PeriodCentury: MenuItem

  // pubic свойства
  public Presenter: MainPresenter;

  constructor() {
    let menuitems: MenuItem[] = []
    let m = new Map<string, () => void>().set('click', this.OpenNewTLDialog)
    menuitems.push(new MenuItem('new', 'Новая', '<i class="far fa-file"></i>', m))
    m = new Map<string, () => void>().set('click', () => this.OpenLoadTLDialog())
    menuitems.push(new MenuItem('load', 'Загрузить', '<i class="far fa-folder-open"></i>', m))
    m = new Map<string, () => void>().set('click', this.SaveCurrentTL)
    menuitems.push(new MenuItem('save', 'Сохранить', '<i class="far fa-save"></i>', m, false))
    menuitems.push(new MenuItemDivider())
    let sub: MenuItem[] = []
    m = new Map<string, () => void>().set('click', () => { this.Presenter.Period = EnumPeriod.day })
    sub.push(this.PeriodDay = new MenuItem('switch_to_day', 'День', null, m))
    m = new Map<string, () => void>().set('click', () => { this.Presenter.Period = EnumPeriod.month })
    sub.push(this.PeriodMonth = new MenuItem('switch_to_month', 'Месяц', null, m))
    m = new Map<string, () => void>().set('click', () => { this.Presenter.Period = EnumPeriod.year })
    sub.push(this.PeriodYear = new MenuItem('switch_to_year', 'Год', null, m))
    m = new Map<string, () => void>().set('click', () => { this.Presenter.Period = EnumPeriod.decade })
    sub.push(this.PeriodDecade = new MenuItem('switch_to_decade', 'Десятилетие', null, m))
    m = new Map<string, () => void>().set('click', () => { this.Presenter.Period = EnumPeriod.century })
    sub.push(this.PeriodCentury = new MenuItem('switch_to_century', 'Век', null, m))
    menuitems.push(new MenuItemSub('period', 'Периодичность', sub))

    this.ChangeIconMenuPeriod(EnumPeriod.day)
    this.menuCtx = new ContextMenu(menuitems)

    this.Presenter = new MainPresenter(this)
    this.Presenter.evChangePeriod.subscribe((period) => {
      this.ChangeIconMenuPeriod(period)
    })
  }

  private ChangeIconMenuPeriod(period: EnumPeriod) {
    const fa_angle_down = '<i class="far fa-check-square"></i>'
    this.PeriodDay.icon = ''
    this.PeriodMonth.icon = ''
    this.PeriodYear.icon = ''
    this.PeriodDecade.icon = ''
    this.PeriodCentury.icon = ''
    switch (period) {
      case EnumPeriod.day:
        this.PeriodDay.icon = fa_angle_down
        break;
      case EnumPeriod.month:
        this.PeriodMonth.icon = fa_angle_down
        break;
      case EnumPeriod.year:
        this.PeriodYear.icon = fa_angle_down
        break;
      case EnumPeriod.decade:
        this.PeriodDecade.icon = fa_angle_down
        break;
      case EnumPeriod.century:
        this.PeriodCentury.icon = fa_angle_down
        break;
    }
  }

  // отрисовка Линий Времени 
  public Draw() {
    
  }

  private OpenNewTLDialog() {
    let view = new EditStringView('')
    view.Show()
      .then(async (value) => {
        await new BoxView(value).Show()
      })
  }

  private async OpenLoadTLDialog() {
    try {
      let value = await ApiClient.getInstance().GetUsersList()
      let view = new TlistView(value)
      view.ShowDialog()
        .then(async (value) => {
          await new BoxView(value.Name).Show()
        })
    } catch (err) {
      await new BoxView(err).Show()
    }
  }

  private SaveCurrentTL() {

  }

  public OnResizeWindow(width: number, height: number) {
    this.Draw()
  }

  public OnContextMenu(e: MouseEvent) {
    this.menuCtx.reload()
    this.menuCtx.display(e)
  }

  public async OnLogin() {
    if (!Globals.IsAuthentificated) {
      let loginModel = new LoginModel(Globals.getCookie('timelineuser') || '')
      let loginView = new LoginView(loginModel)
      if (await loginView.ShowDialog()) {
        Globals.IsAuthentificated = true
        this.SetUserLabel(loginModel.Login)
      }
    } else {
      if (await ApiClient.getInstance().DoLogout()) {
        Globals.IsAuthentificated = false
        MainView.ClearUserLabel()
      }
    }
  }

  private SetUserLabel(user: string): void {
    $('#lblUser').text(user)
    $('#lblUser').css('display', 'unset')
    $('#btnLogin').text('Выход')
  }

  private static ClearUserLabel(): void {
    $('#lblUser').css('display', 'none')
    $('#btnLogin').text('Вход')
  }

  public async OnRegister() {
    let regModel = new RegisterModel('','')
    let regView = new RegisterView(regModel)
    if (await regView.ShowDialog()) {
      await new BoxView(`Пользователь ${regModel.Login} успешно зарегистрирован`).Show()
    }
  }

  public handleEvent(event: Event) {
    if (event.type === 'contextmenu') {
      this.OnContextMenu(<MouseEvent>event)
      event.preventDefault()
    }
  }
}