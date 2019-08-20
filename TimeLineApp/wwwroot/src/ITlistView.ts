export interface ITlistView {
  ShowDialog(): void
  GetSelectedValue(): string
  SetError(err: string): void
}