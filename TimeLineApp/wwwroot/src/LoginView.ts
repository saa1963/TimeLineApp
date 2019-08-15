import { LoginPresenter } from "./LoginPresenter";
import * as $ from 'jquery'
import { LoginModel } from "./LoginModel";
import { Globals } from "./Globals";
import { ILoginView } from "./ILoginView";

export class LoginView implements ILoginView {
  private Presenter: LoginPresenter
  private tbLogin: HTMLInputElement
  private tbPassword: HTMLInputElement
  private btnOk: HTMLButtonElement
  private btnCancel: HTMLButtonElement
  private dlg: HTMLElement

  constructor(model: LoginModel) {
    this.tbLogin = <HTMLInputElement>document.getElementById('logLogin')
    this.tbPassword = <HTMLInputElement>document.getElementById('logPassword')
    this.btnOk = <HTMLButtonElement>document.getElementById('btnLoginUser')
    this.btnCancel = <HTMLButtonElement>document.getElementById('btnCancelLoginUser')
    this.dlg = <HTMLElement>document.getElementById('tmLoginModal')

    this.tbLogin.onchange = () => {
      this.Presenter.OnChangeLoginInView()
    }
    this.tbPassword.onchange = () => {
      this.Presenter.OnChangePasswordInView()
    }
    this.btnOk.onclick = async () => {
      if (!Globals.ValidateElements(this.dlg)) return
      let success = await this.Presenter.DoLogin()
      if (success) {
        $('#tmLoginModal').modal('hide')
        $('#btnLogin').text('Выход')
        this.SetUserLabel(this.Presenter.Login)
      }
    }
    this.btnCancel.onclick = () => {
      $('#tmLoginModal').modal('hide')
    }
    this.Presenter = new LoginPresenter(this, model)
  }

  public ShowDialog(): void {
    $('#tmLoginModal').modal()
    this.ClearError()
  }

  public SetLogin(login) {
    $('#logLogin').val(login)
  }

  public SetPassword(password) {
    $('#logPassword').val(password)
  }

  public SetError(err: string): void {
    $('#log_server_error').text(err)
    $('#log_server_error').css('display', 'unset')
  }

  private ClearError(): void {
    $('#log_server_error').css('display', 'none')
  }

  private SetUserLabel(user: string): void {
    $('#lblUser').text(user)
    $('#lblUser').css('display', 'unset')
  }

  private static ClearUserLabel(): void {
    $('#lblUser').css('display', 'none')
  }

  public GetLogin(): string {
    return <string>$('#logLogin').val()
  }

  public GetPassword(): string {
    return <string>$('#logPassword').val()
  }

  public static Logout() {
    LoginView.ClearUserLabel()
    $('#btnLogin').text('Вход')
    Globals.IsAuthentificated = false
  }
}