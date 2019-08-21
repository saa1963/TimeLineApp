import { IRegisterView } from "./IRegisterView";
import * as $ from 'jquery'
import { RegisterPresenter } from "./RegisterPresenter";
import { RegisterModel } from "./RegisterModel";
import { Globals } from "./Globals";

export class RegisterView implements IRegisterView {
  private Presenter: RegisterPresenter
  private tbLogin: HTMLInputElement
  private tbEmail: HTMLInputElement
  private tbPassword1: HTMLInputElement
  private tbPassword2: HTMLInputElement
  private btnOk: HTMLButtonElement
  private btnCancel: HTMLButtonElement
  private dlg: HTMLElement

  constructor(model: RegisterModel) {
    this.tbLogin = <HTMLInputElement>document.getElementById('regLogin')
    this.tbEmail = <HTMLInputElement>document.getElementById('regEmail')
    this.tbPassword1 = <HTMLInputElement>document.getElementById('regPassword1')
    this.tbPassword2 = <HTMLInputElement>document.getElementById('regPassword2')
    this.btnOk = <HTMLButtonElement>document.getElementById('btnRegisterUser')
    this.btnCancel = <HTMLButtonElement>document.getElementById('btnCancelRegisterUser')
    this.dlg = <HTMLElement>document.getElementById('tmRegisterModal')

    this.tbLogin.onchange = () => {
      this.Presenter.OnChangeLoginInView()
    }
    this.tbEmail.onchange = () => {
      this.Presenter.OnChangeEmailInView()
    }
    this.tbPassword1.onchange = () => {
      this.Presenter.OnChangePassword1InView()
    }
    this.tbPassword2.onchange = () => {
      this.Presenter.OnChangePassword2InView()
    }
    this.Presenter = new RegisterPresenter(this, model)
  }

  ShowDialog(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      $('#tmRegisterModal').modal()
      this.ClearError()
      this.btnOk.onclick = async () => {
        if (!Globals.ValidateElements(this.dlg)) return
        let err = await this.Presenter.DoRegister()
        if (err === '') {
          $('#tmRegisterModal').modal('hide')
          resolve(true)
        } else {
          this.SetError(err)
          resolve(false)
        }
      }
      this.btnCancel.onclick = async () => {
        $('#tmRegisterModal').modal('hide')
        reject()
      }
    })
  }
  SetLogin(login: string): void {
    $('#regLogin').val(login)
  }
  SetEmail(email: string): void {
    $('#regEmail').val(email)
  }
  SetPassword1(password: string): void {
    $('#regPassword1').val(password)
  }
  SetPassword2(password: string): void {
    $('#regPassword2').val(password)
  }
  SetError(err: string): void {
    $('#reg_server_error').text(err)
    $('#reg_server_error').css('display', 'unset')
  }
  GetLogin(): string {
    return <string>$('#regLogin').val()
  }
  GetEmail(): string {
    return <string>$('#regEmail').val()
  }
  GetPassword1(): string {
    return <string>$('#regPassword1').val()
  }
  GetPassword2(): string {
    return <string>$('#regPassword2').val()
  }
  private ClearError(): void {
    $('#reg_server_error').css('display', 'none')
  }
}