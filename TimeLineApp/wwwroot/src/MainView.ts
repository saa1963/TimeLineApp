import { MainPresenter } from "./MainPresenter";
import * as $ from 'jquery'
import { MainModel } from "./MainModel";

export class MainView {
  // private свойства
  private ctx: CanvasRenderingContext2D
  private Presenter: MainPresenter;

  constructor(model: MainModel) {
    this.Presenter = new MainPresenter(this, model)
  }

  public OnResizeWindow(width: number, height: number) {
    this.Presenter.Draw()
  }

  public async OnLogin() {
    let login = await this.Presenter.OnLogin()
    if (login) {
      this.SetUserLabel(login)
    } else {
      this.ClearUserLabel()
    }
  }

  public ClearContent() {
    $('#tls').empty()
  }

  private SetUserLabel(user: string): void {
    $('#lblUser').text(user)
    $('#lblUser').css('display', 'unset')
    $('#btnLogin').text('Выход')
  }

  private ClearUserLabel(): void {
    $('#lblUser').css('display', 'none')
    $('#btnLogin').text('Вход')
  }

  public async OnRegister() {
    await this.Presenter.OnRegister()
  }

  public handleEvent(event: Event) {
    if (event.type === 'contextmenu') {
      this.Presenter.OnContextMenu(<MouseEvent>event)
      event.preventDefault()
    }
  }
}