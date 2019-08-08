import { LoginPresenter } from "./LoginPresenter";
import * as $ from 'jquery'

export class LoginView {
  private Presenter: LoginPresenter

  constructor() {
    this.Presenter = new LoginPresenter()
    this.Presenter.evChangeLogin.subscribe((login) => {
      $('#logLogin').val(this.Presenter.Login)
    })
    this.Presenter.evChangePassword.subscribe((password) => {
      $('#logPassword').val(this.Presenter.Password)
    })
  }

  public ShowDialog(): boolean {
    $('#tmLoginModal').modal()
    $('#log_server_error').css('display', 'none')
    return true
  }

  public OnChangeLogin() {
    this.Presenter.Login = 
  }
}