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
  SetBegin_DecadeDecade(value: number): void
  SetBegin_DecadeCentury(value: number): void
  SetBegin_Century(value: number): void
  SetEndType(value: EnumPeriod): void
  SetEnd_DayDay(value: number): void
  SetEnd_DayMonth(value: number): void
  SetEnd_DayYear(value: number): void
  SetEnd_MonthMonth(value: number): void
  SetEnd_MonthYear(value: number): void
  SetEnd_Year(value: number): void
  SetEnd_DecadeDecade(value: number): void
  SetEnd_DecadeCentury(value: number): void
  SetEnd_Century(value: number): void
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
  GetBegin_DecadeDecade(): number
  GetBegin_DecadeCentury(): number
  GetBegin_Century(): number
  GetEndType(): EnumPeriod
  GetEnd_DayDay(): number
  GetEnd_DayMonth(): number
  GetEnd_DayYear(): number
  GetEnd_MonthMonth(): number
  GetEnd_MonthYear(): number
  GetEnd_Year(): number
  GetEnd_DecadeDecade(): number
  GetEnd_DecadeCentury(): number
  GetEnd_Century(): number
}