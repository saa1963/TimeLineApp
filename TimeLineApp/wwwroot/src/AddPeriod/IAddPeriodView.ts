import { EnumPeriod } from "../TLEvent";

export interface IAddPeriodView {
  ShowDialog(): void
  SetName(value: string): void
  SetIsPeriod(value: boolean): void
  SetBeginType(value: EnumPeriod): void
  SetBegin_DayDay(value: number): void
  SetBegin_DayMonth(value: number): void
  SetBegin_DayYear(value: number): void
  SetBegin_MonthMonth(value: number): void
  SetBegin_MonthYear(value: number): void
  SetBegin_Year(value: number): void
  SetError(err: string): void
  GetName(): string
  GetIsPeriod(): boolean
  GetBeginType(): EnumPeriod
  GetBegin_DayDay(): number
  GetBegin_DayMonth(): number
  GetBegin_DayYear(): number
  GetBegin_MonthMonth(): number
  GetBegin_MonthYear(): number
  GetBegin_Year(): number
}