import { LoginModel } from "./LoginModel";
import { InterfaceLoginView } from "./ILoginView";
import { ApiClient } from "../ApiClient";

export class LoginPresenter {
  private model: LoginModel
  private view: InterfaceLoginView
  private mLogin: string
  private mPassword: string
  constructor(view: InterfaceLoginView, model: LoginModel) {
    this.model = model
    this.view = view
    this.model.evChangeLogin.subscribe((login) => {
      if (login !== this.mLogin) {
        this.view.SetLogin(login)
      }
    })
    this.model.evChangePassword.subscribe((password) => {
      if (password !== this.mPassword) {
        this.view.SetPassword(password)
      }
    })
    this.mLogin = model.Login
    this.mPassword = model.Password
    this.view.SetLogin(model.Login)
    this.view.SetPassword(model.Password)
  }

  // обработчики вызовов из View
  public OnChangeLoginInView() {
    this.mLogin = this.view.GetLogin()
    this.model.Login =  this.mLogin
  }
  public OnChangePasswordInView() {
    this.mPassword = this.view.GetPassword()
    this.model.Password = this.mPassword
  }
  
  public async DoLogin(): Promise<string> {
    return await ApiClient.getInstance().DoLogin(this.mLogin, this.mPassword)
  }
}