import { IAddPeriodView } from "./IAddPeriodView";
import { EnumPeriod } from "../TLEvent"
import { AddPeriodPresenter } from "./AddPeriodPresenter";

export class AddPeriodView implements IAddPeriodView {
  private Presenter: AddPeriodPresenter
  private tbLogin: HTMLInputElement
  private btnOk: HTMLButtonElement
  private btnCancel: HTMLButtonElement
  private dlg: HTMLElement
  public constructor() {
    
  }
  ShowDialog(): void {
    throw new Error("Method not implemented.");
  }
  SetName(value: string): void {
    throw new Error("Method not implemented.");
  }
  SetIsPeriod(value: boolean): void {
    throw new Error("Method not implemented.");
  }
  SetBeginType(value: EnumPeriod): void {
    throw new Error("Method not implemented.");
  }
  SetBegin_DayDay(value: number): void {
    throw new Error("Method not implemented.");
  }
  SetBegin_DayMonth(value: number): void {
    throw new Error("Method not implemented.");
  }
  SetBegin_DayYear(value: number): void {
    throw new Error("Method not implemented.");
  }
  SetBegin_MonthMonth(value: number): void {
    throw new Error("Method not implemented.");
  }
  SetBegin_MonthYear(value: number): void {
    throw new Error("Method not implemented.");
  }
  SetBegin_Year(value: number): void {
    throw new Error("Method not implemented.");
  }
  SetError(err: string): void {
    throw new Error("Method not implemented.");
  }
  GetName(): string {
    throw new Error("Method not implemented.");
  }
  GetIsPeriod(): boolean {
    throw new Error("Method not implemented.");
  }
  GetBeginType(): EnumPeriod {
    throw new Error("Method not implemented.");
  }
  GetBegin_DayDay(): number {
    throw new Error("Method not implemented.");
  }
  GetBegin_DayMonth(): number {
    throw new Error("Method not implemented.");
  }
  GetBegin_DayYear(): number {
    throw new Error("Method not implemented.");
  }
  GetBegin_MonthMonth(): number {
    throw new Error("Method not implemented.");
  }
  GetBegin_MonthYear(): number {
    throw new Error("Method not implemented.");
  }
  GetBegin_Year(): number {
    throw new Error("Method not implemented.");
  }


}