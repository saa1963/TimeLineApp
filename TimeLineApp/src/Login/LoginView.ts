import { LoginPresenter } from "./LoginPresenter";
import * as $ from 'jquery'
import { LoginModel } from "./LoginModel";
import { Globals } from "../Globals";
import { InterfaceLoginView } from "./ILoginView";

export class LoginView implements InterfaceLoginView {
  private Presenter: LoginPresenter
  private tbLogin: HTMLInputElement
  private tbPassword: HTMLInputElement
  private btnOk: HTMLButtonElement
  private btnCancel: HTMLButtonElement
  private dlg: HTMLElement

  constructor(model: LoginModel) {
    this.tbLogin = document.getElementById('logLogin') as HTMLInputElement
    this.tbPassword = document.getElementById('logPassword') as HTMLInputElement
    this.btnOk = document.getElementById('btnLoginUser') as HTMLButtonElement
    this.btnCancel = document.getElementById('btnCancelLoginUser') as HTMLButtonElement
    this.dlg = document.getElementById('tmLoginModal') as HTMLElement

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
        const err = await this.Presenter.DoLogin()
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
    return $('#logLogin').val() as string
  }

  public GetPassword(): string {
    return $('#logPassword').val() as string
  }
}