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
import { TimeLineModel } from "./TimeLineModel";

export class MainView {
  // private свойства
  private ctx: CanvasRenderingContext2D
  // pubic свойства
  private Presenter: MainPresenter;

  constructor(model: MainModel) {
    this.Presenter = new MainPresenter(this, model)
  }

  // отрисовка Линий Времени 
  public Draw() {
    for (let i = 0; i < this.Presenter.Count; i++) {
      this.Presenter.Item(i)
    }
  }

  private DrawTimeLine(tl: TimeLineModel) {

  }

  public OnResizeWindow(width: number, height: number) {
    this.Draw()
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
      this.Presenter.OnContextMenu(<MouseEvent>event)
      event.preventDefault()
    }
  }
}