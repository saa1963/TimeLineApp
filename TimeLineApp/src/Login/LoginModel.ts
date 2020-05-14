import { SimpleEventDispatcher, ISimpleEvent } from "ste-simple-events";

export class LoginModel {
  public constructor(login: string) {
    this.Login = login
    this.Password = ''
  }
  private mLogin: string
  get Login() {
    return this.mLogin
  }
  set Login(value: string) {
    if (value !== this.mLogin) {
      this.mLogin = value
      this.e_ChangeLogin.dispatch(value)
    }
  }
  private mPassword: string
  get Password() {
    return this.mPassword
  }
  set Password(value: string) {
    if (value !== this.mPassword) {
      this.mPassword = value
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