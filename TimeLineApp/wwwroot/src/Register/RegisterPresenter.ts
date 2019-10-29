import { Globals } from "../Globals";
import * as $ from 'jquery'
import { RegisterModel } from "./RegisterModel";
import { IRegisterView } from "./IRegisterView";
import { ApiClient } from "../ApiClient";

export class RegisterPresenter {
  private model: RegisterModel
  private view: IRegisterView
  private m_Login: string
  private m_Email: string
  private m_Password1: string
  private m_Password2: string

  constructor(view: IRegisterView, model: RegisterModel) {
    this.model = model
    this.view = view
    this.model.evChangeLogin.subscribe((login) => {
      if (login !== this.m_Login) {
        this.view.SetLogin(login)
      }
    })
    this.model.evChangeEmail.subscribe((email) => {
      if (email !== this.m_Email) {
        this.view.SetEmail(email)
      }
    })
    this.model.evChangePassword1.subscribe((password) => {
      if (password !== this.m_Password1) {
        this.view.SetPassword1(password)
      }
    })
    this.model.evChangePassword2.subscribe((password) => {
      if (password !== this.m_Password2) {
        this.view.SetPassword2(password)
      }
    })
    this.m_Login = model.Login
    this.m_Email = model.Email
    this.m_Password1 = model.Password1
    this.m_Password2 = model.Password2
    this.view.SetLogin(model.Login)
    this.view.SetEmail(model.Email)
    this.view.SetPassword1(model.Password1)
    this.view.SetPassword2(model.Password2)
  }

  public get Login(): string {
    return this.m_Login
  }

  // обработчики вызовов из View
  public OnChangeLoginInView() {
    this.m_Login = this.view.GetLogin()
    this.model.Login = this.m_Login
  }
  public OnChangeEmailInView() {
    this.m_Email = this.view.GetEmail()
    this.model.Email = this.m_Email
  }
  public OnChangePassword1InView() {
    this.m_Password1 = this.view.GetPassword1()
    this.model.Password1 = this.m_Password1
  }
  public OnChangePassword2InView() {
    this.m_Password2 = this.view.GetPassword2()
    this.model.Password2 = this.m_Password2
  }

  public async DoRegister(): Promise<string> {
    return await ApiClient.getInstance().DoRegister(this.m_Login, this.m_Email, this.m_Password1, this.m_Password2)
  }
}