import { LoginPresenter } from "./LoginPresenter";
import * as $ from 'jquery'
import { LoginModel } from "./LoginModel";

export class LoginView {
  private Presenter: LoginPresenter
  private tbLogin: HTMLInputElement
  private tbPassword: HTMLInputElement
  private btnOk: HTMLButtonElement
  private btnCancel: HTMLButtonElement

  constructor(model: LoginModel) {
    this.tbLogin = <HTMLInputElement>document.getElementById('logLogin')
    this.tbPassword = <HTMLInputElement>document.getElementById('logPassword')
    this.btnOk = <HTMLButtonElement>document.getElementById('btnLoginUser')
    this.btnCancel = <HTMLButtonElement>document.getElementById('btnCancelLoginUser')

    this.tbLogin.onchange = () => {
      this.Presenter.OnChangeLoginInView()
    }
    this.tbPassword.onchange = () => {
      this.Presenter.OnChangeLoginInView()
    }
    this.btnOk.onclick = () => {
      $('#tmLoginModal').modal('hide')
    }
    this.btnCancel.onclick = () => {
      $('#tmLoginModal').modal('hide')
    }
    this.Presenter = new LoginPresenter(this, model)
  }

  public ShowDialog(): boolean {
    $('#tmLoginModal').modal()
    $('#log_server_error').css('display', 'none')
    return true
  }

  public SetLogin(login) {
    $('logLogin').val(login)
  }

  public SetPassword(password) {
    $('logPassword').val(password)
  }

  public GetLogin(): string {
    return <string>$('logLogin').val()
  }

  public GetPassword(): string {
    return <string>$('logPassword').val()
  }
}