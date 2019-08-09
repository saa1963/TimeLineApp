import { SimpleEventDispatcher, ISimpleEvent } from "ste-simple-events";

export class LoginModel {
  public constructor(login: string) {
    this.Login = login
    this.Password = ''
  }
  private m_Login: string
  get Login() {
    return this.m_Login
  }
  set Login(value: string) {
    if (value !== this.m_Login) {
      this.m_Login = value
      this.e_ChangeLogin.dispatch(value)
    }
  }
  private m_Password: string
  get Password() {
    return this.m_Password
  }
  set Password(value: string) {
    if (value !== this.m_Password) {
      this.m_Password = value
      this.e_ChangePassword.dispatch(value)
    }
  }

  private e_ChangeLogin = new SimpleEventDispatcher<string>();
  public get evChangeLogin(): ISimpleEvent<string> {
    return this.e_ChangeLogin.asEvent();
  }

  private e_ChangePassword = new SimpleEventDispatcher<string>();
  public get evChangePassword(): ISimpleEvent<string> {
    return this.e_ChangePassword.asEvent();
  }
}