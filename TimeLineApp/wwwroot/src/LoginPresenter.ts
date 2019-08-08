import { LoginModel } from "./LoginModel";
import { LoginView } from "./LoginView";
import { Globals } from "./Globals";
import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events"

export class LoginPresenter {
  private model: LoginModel
  constructor() {
    this.model = new LoginModel()
    this.Login = Globals.getCookie('timelineuser') || ''
    this.Password = ''
  }

  private e_ChangeLogin = new SimpleEventDispatcher<string>();
  public get evChangeLogin(): ISimpleEvent<string> {
    return this.e_ChangeLogin.asEvent();
  }

  private e_ChangePassword = new SimpleEventDispatcher<string>();
  public get evChangePassword(): ISimpleEvent<string> {
    return this.e_ChangePassword.asEvent();
  }

  public get Login() {
    return this.model.Login
  }
  public set Login(value: string) {
    this.model.Login = value
    this.e_ChangeLogin.dispatch(value)
  }
  public get Password() {
    return this.model.Password
  }
  public set Password(value: string) {
    this.model.Password = value
    this.e_ChangePassword.dispatch(value)
  }
}