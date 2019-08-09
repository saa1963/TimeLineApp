import { LoginModel } from "./LoginModel";
import { LoginView } from "./LoginView";

export class LoginPresenter {
  private model: LoginModel
  private view: LoginView
  private m_Login: string
  private m_Password: string
  constructor(view: LoginView, model: LoginModel) {
    this.model = model
    this.view = view
    this.model.evChangeLogin.subscribe((login) => {
      if (login !== this.m_Login) {
        this.view.UpdateLogin(login)
      }
    })
    this.model.evChangePassword.subscribe((password) => {
      if (password !== this.m_Password) {
        this.view.UpdatePassword(password)
      }
    })
    this.view.UpdateLogin(model.Login)
    this.view.UpdatePassword(model.Password)
  }

  // обработчики вызовов из View
  public OnChangeLoginInView() {
    this.m_Login = this.view.GetLogin()
    this.model.Login =  this.m_Login
  }
  public OnChangePasswordInView() {
    this.m_Password = this.view.GetPassword()
    this.model.Password = this.m_Password
  }
 }