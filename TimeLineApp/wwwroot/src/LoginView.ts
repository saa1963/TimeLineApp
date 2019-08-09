import { LoginPresenter } from "./LoginPresenter";
import * as $ from 'jquery'
import { LoginModel } from "./LoginModel";

export class LoginView {
  private Presenter: LoginPresenter

  constructor(model: LoginModel) {
    document.getElementById('logLogin').onchange = () => {
      this.OnChangeLogin()
    }
    document.getElementById('logPassword').onchange = () => {
      this.OnChangePassword()
    }
    this.Presenter = new LoginPresenter(this, model)
  }

  public ShowDialog(): boolean {
    $('#tmLoginModal').modal()
    $('#log_server_error').css('display', 'none')

    return true
  }

  private Ok() {

  }

  public UpdateLogin(login) {
    $('logLogin').val(login)
  }

  public UpdatePassword(password) {
    $('logPassword').val(password)
  }

  private OnChangeLogin() {
    this.Presenter.OnChangeLoginInView()
  }

  private OnChangePassword() {
    this.Presenter.OnChangeLoginInView()
  }

  public GetLogin(): string {
    return <string>$('logLogin').val()
  }

  public GetPassword(): string {
    return <string>$('logPassword').val()
  }
}