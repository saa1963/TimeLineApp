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
    this.Presenter = new LoginPresenter(this, model)
  }

  public ShowDialog(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      $('#tmLoginModal').modal()
      this.ClearError()
      this.btnOk.onclick = async () => {
        if (!Globals.ValidateElements(this.dlg)) return
        let err = await this.Presenter.DoLogin()
        if (err === '') {
          $('#tmLoginModal').modal('hide')
          resolve(true)
        } else {
          this.SetError(err)
          resolve(false)
        }
      }
      this.btnCancel.onclick = async () => {
        $('#tmLoginModal').modal('hide')
        reject()
      }
    })
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

  public GetLogin(): string {
    return <string>$('#logLogin').val()
  }

  public GetPassword(): string {
    return <string>$('#logPassword').val()
  }

  public static Logout() {
    Globals.IsAuthentificated = false
  }
}