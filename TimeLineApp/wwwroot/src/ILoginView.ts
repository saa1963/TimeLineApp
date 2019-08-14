export interface ILoginView {
  ShowDialog(): void
  SetLogin(login: string): void
  SetPassword(password: string): void
  SetError(err: string): void
  GetLogin(): string
  GetPassword(): string
}