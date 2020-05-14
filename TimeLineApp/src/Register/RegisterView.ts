import { InterfaceRegisterView } from "./IRegisterView";
import * as $ from 'jquery'
import { RegisterPresenter } from "./RegisterPresenter";
import { RegisterModel } from "./RegisterModel";
import { Globals } from "../Globals";

export class RegisterView implements InterfaceRegisterView {
  private Presenter: RegisterPresenter
  private tbLogin: HTMLInputElement
  private tbEmail: HTMLInputElement
  private tbPassword1: HTMLInputElement
  private tbPassword2: HTMLInputElement
  private btnOk: HTMLButtonElement
  private btnCancel: HTMLButtonElement
  private dlg: HTMLElement

  constructor(model: RegisterModel) {
    this.tbLogin = document.getElementById('regLogin') as HTMLInputElement
    this.tbEmail = document.getElementById('regEmail') as HTMLInputElement
    this.tbPassword1 = document.getElementById('regPassword1') as HTMLInputElement
    this.tbPassword2 = document.getElementById('regPassword2') as HTMLInputElement
    this.btnOk = document.getElementById('btnRegisterUser') as HTMLButtonElement
    this.btnCancel = document.getElementById('btnCancelRegisterUser') as HTMLButtonElement
    this.dlg = document.getElementById('tmRegisterModal') as HTMLElement

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
        const err = await this.Presenter.DoRegister()
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
    return $('#regLogin').val() as string
  }
  GetEmail(): string {
    return $('#regEmail').val() as string
  }
  GetPassword1(): string {
    return $('#regPassword1').val() as string
  }
  GetPassword2(): string {
    return $('#regPassword2').val() as string
  }
  private ClearError(): void {
    $('#reg_server_error').css('display', 'none')
  }
}