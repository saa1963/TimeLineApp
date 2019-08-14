import { LoginModel } from "./LoginModel";
import { Globals } from "./Globals";
import * as $ from 'jquery'
import { ILoginView } from "./ILoginView";

export class LoginPresenter {
  private model: LoginModel
  private view: ILoginView
  private m_Login: string
  private m_Password: string
  constructor(view: ILoginView, model: LoginModel) {
    this.model = model
    this.view = view
    this.model.evChangeLogin.subscribe((login) => {
      if (login !== this.m_Login) {
        this.view.SetLogin(login)
      }
    })
    this.model.evChangePassword.subscribe((password) => {
      if (password !== this.m_Password) {
        this.view.SetPassword(password)
      }
    })
    this.m_Login = model.Login
    this.m_Password = model.Password
    this.view.SetLogin(model.Login)
    this.view.SetPassword(model.Password)
  }

  public get Login(): string {
    return this.m_Login
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
  
  public async DoLogin(): Promise<boolean> {
    if ((this.m_Login || '').trim() !== '' && (this.m_Password || '').trim() !== '') {
      let err = await $.ajax(
        'api/register/log', {
        type: 'POST',
        data: {
          Login: this.m_Login,
          Password: this.m_Password
        }
        })
      if (err === '') {
        Globals.IsAuthentificated = true
        return true
      } else {
        this.view.SetError(err)
        return false
      }
      } else {
      this.view.SetError('Не введены логин или пароль.')
      return false
    }
  }
}