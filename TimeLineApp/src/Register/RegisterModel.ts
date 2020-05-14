import { SimpleEventDispatcher, ISimpleEvent } from "ste-simple-events";

export class RegisterModel {
  public constructor(login: string, email: string) {
    this.Login = login
    this.Email = email
    this.Password1 = ''
    this.Password2 = ''
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

  private mEmail: string
  get Email() {
    return this.mEmail
  }
  set Email(value: string) {
    if (value !== this.mEmail) {
      this.mEmail = value
      this.e_ChangeEmail.dispatch(value)
    }
  }

  private mPassword1: string
  get Password1() {
    return this.mPassword1
  }
  set Password1(value: string) {
    if (value !== this.mPassword1) {
      this.mPassword1 = value
      this.e_ChangePassword1.dispatch(value)
    }
  }

  private mPassword2: string
  get Password2() {
    return this.mPassword2
  }
  set Password2(value: string) {
    if (value !== this.mPassword2) {
      this.mPassword2 = value
      this.e_ChangePassword2.dispatch(value)
    }
  }

  private e_ChangeLogin = new SimpleEventDispatcher<string>();
  public get evChangeLogin(): ISimpleEvent<string> {
    return this.e_ChangeLogin.asEvent();
  }

  private e_ChangeEmail = new SimpleEventDispatcher<string>();
  public get evChangeEmail(): ISimpleEvent<string> {
    return this.e_ChangeEmail.asEvent();
  }

  private e_ChangePassword1 = new SimpleEventDispatcher<string>();
  public get evChangePassword1(): ISimpleEvent<string> {
    return this.e_ChangePassword1.asEvent();
  }

  private e_ChangePassword2 = new SimpleEventDispatcher<string>();
  public get evChangePassword2(): ISimpleEvent<string> {
    return this.e_ChangePassword2.asEvent();
  }
}