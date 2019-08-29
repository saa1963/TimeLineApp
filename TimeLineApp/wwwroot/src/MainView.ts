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
import { MyContextMenu } from "./MyContextMenu";
import { MainModel } from "./MainModel";

export class MainView {
  // private свойства
  private ctx: CanvasRenderingContext2D
  private menuCtx: ContextMenu

  // pubic свойства
  public Presenter: MainPresenter;

  constructor(model: MainModel) {
    this.Presenter = new MainPresenter(this, model)
    this.menuCtx = MyContextMenu.Create()
    this.menuCtx.evSelect.subscribe((s) => {
      switch (s) {
        case 'new':
          this.Presenter.OpenNewTLDialog()
          break;
        case 'load':
          this.Presenter.OpenLoadTLDialog()
          break;
        case 'save':
          this.Presenter.SaveCurrentTL()
          break;
        case 'switch_to_day':
          this.Presenter.Period = EnumPeriod.day
          break;
        case 'switch_to_month':
          this.Presenter.Period = EnumPeriod.month
          break;
        case 'switch_to_year':
          this.Presenter.Period = EnumPeriod.year
          break;
        case 'switch_to_decade':
          this.Presenter.Period = EnumPeriod.decade
          break;
        case 'switch_to_century':
          this.Presenter.Period = EnumPeriod.century
          break;
      }
    })
    this.Presenter.Period = EnumPeriod.day
    this.Draw()
  }

  public ViewChangePeriod(period: EnumPeriod) {
    MyContextMenu.ChangeIconMenuPeriod(period)
    this.Draw()
  }

  // отрисовка Линий Времени 
  public Draw() {
    
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