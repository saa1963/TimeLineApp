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
          MyContextMenu.ChangeIconMenuPeriod(EnumPeriod.day)
          break;
        case 'switch_to_month':
          MyContextMenu.ChangeIconMenuPeriod(EnumPeriod.month)
          break;
        case 'switch_to_year':
          MyContextMenu.ChangeIconMenuPeriod(EnumPeriod.year)
          break;
        case 'switch_to_decade':
          MyContextMenu.ChangeIconMenuPeriod(EnumPeriod.decade)
          break;
        case 'switch_to_century':
          MyContextMenu.ChangeIconMenuPeriod(EnumPeriod.century)
          break;
      }
    })
    MyContextMenu.ChangeIconMenuPeriod(EnumPeriod.day)

    this.Presenter = new MainPresenter(this, model)
  }

  // отрисовка Линий Времени 
  public Draw() {
    
  }

  private OpenNewTLDialog() {
    let view = new EditStringView('')
    view.Show()
      .then(async (value) => {
        if (value) {
          await new BoxView(value).Show()
        }
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
        .catch(() => { })
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