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

  public DrawDates(dates: string[]) {
    let tr = $('#tls').append('<table></table>').append('<tr class="date"></tr>')
    for (let i = 0; i < dates.length; ++i) {
      tr.append(`<td>${dates[i]}</td>`)
    }
  }

  public OnNewTL() {
    this.Presenter.OpenNewTLDialog()
  }

  public OnOpenTL() {
    this.Presenter.OpenLoadTLDialog()
  }

  public handleEvent(event: Event) {
    if (event.type === 'contextmenu') {
      this.Presenter.OnContextMenu(<MouseEvent>event)
      event.preventDefault()
    }
  }
}