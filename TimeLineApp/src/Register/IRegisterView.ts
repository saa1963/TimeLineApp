export interface InterfaceRegisterView {
  ShowDialog(): void;
  SetLogin(login: string): void;
  SetEmail(email: string): void;
  SetPassword1(password: string): void;
  SetPassword2(password: string): void;
  SetError(err: string): void;
  GetLogin(): string;
  GetEmail(): string;
  GetPassword1(): string;
  GetPassword2(): string;
}