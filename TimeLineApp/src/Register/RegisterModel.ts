import { SimpleEventDispatcher, ISimpleEvent } from "ste-simple-events";

export class RegisterModel {
  public constructor(login: string, email:string) {
    this.Login = login
    this.Email = email
    this.Password1 = ''
    this.Password2 = ''
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

  private m_Email: string
  get Email() {
    return this.m_Email
  }
  set Email(value: string) {
    if (value !== this.m_Email) {
      this.m_Email = value
      this.e_ChangeEmail.dispatch(value)
    }
  }

  private m_Password1: string
  get Password1() {
    return this.m_Password1
  }
  set Password1(value: string) {
    if (value !== this.m_Password1) {
      this.m_Password1 = value
      this.e_ChangePassword1.dispatch(value)
    }
  }

  private m_Password2: string
  get Password2() {
    return this.m_Password2
  }
  set Password2(value: string) {
    if (value !== this.m_Password2) {
      this.m_Password2 = value
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