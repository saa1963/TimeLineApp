import { RegisterModel } from "./RegisterModel";
import { InterfaceRegisterView } from "./IRegisterView";
import { ApiClient } from "../ApiClient";

export class RegisterPresenter {
  private model: RegisterModel
  private view: InterfaceRegisterView
  private mLogin: string
  private mEmail: string
  private mPassword1: string
  private mPassword2: string

  constructor(view: InterfaceRegisterView, model: RegisterModel) {
    this.model = model
    this.view = view
    this.model.evChangeLogin.subscribe((login) => {
      if (login !== this.mLogin) {
        this.view.SetLogin(login)
      }
    })
    this.model.evChangeEmail.subscribe((email) => {
      if (email !== this.mEmail) {
        this.view.SetEmail(email)
      }
    })
    this.model.evChangePassword1.subscribe((password) => {
      if (password !== this.mPassword1) {
        this.view.SetPassword1(password)
      }
    })
    this.model.evChangePassword2.subscribe((password) => {
      if (password !== this.mPassword2) {
        this.view.SetPassword2(password)
      }
    })
    this.mLogin = model.Login
    this.mEmail = model.Email
    this.mPassword1 = model.Password1
    this.mPassword2 = model.Password2
    this.view.SetLogin(model.Login)
    this.view.SetEmail(model.Email)
    this.view.SetPassword1(model.Password1)
    this.view.SetPassword2(model.Password2)
  }

  public get Login(): string {
    return this.mLogin
  }

  // обработчики вызовов из View
  public OnChangeLoginInView() {
    this.mLogin = this.view.GetLogin()
    this.model.Login = this.mLogin
  }
  public OnChangeEmailInView() {
    this.mEmail = this.view.GetEmail()
    this.model.Email = this.mEmail
  }
  public OnChangePassword1InView() {
    this.mPassword1 = this.view.GetPassword1()
    this.model.Password1 = this.mPassword1
  }
  public OnChangePassword2InView() {
    this.mPassword2 = this.view.GetPassword2()
    this.model.Password2 = this.mPassword2
  }

  public async DoRegister(): Promise<string> {
    return await ApiClient.getInstance().DoRegister(this.mLogin, this.mEmail, this.mPassword1, this.mPassword2)
  }
}