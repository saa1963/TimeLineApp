import { IAddPeriodView } from "./IAddPeriodView";
import { EnumPeriod } from "../TLEvent"
import { AddPeriodPresenter } from "./AddPeriodPresenter";

export class AddPeriodView implements IAddPeriodView {
    SetBegin_DecadeDecade(value: number): void {
        throw new Error("Method not implemented.");
    }
    SetBegin_DecadeCentury(value: number): void {
        throw new Error("Method not implemented.");
    }
    SetBegin_Century(value: number): void {
        throw new Error("Method not implemented.");
    }
    SetEndType(value: EnumPeriod): void {
        throw new Error("Method not implemented.");
    }
    SetEnd_DayDay(value: number): void {
        throw new Error("Method not implemented.");
    }
    SetEnd_DayMonth(value: number): void {
        throw new Error("Method not implemented.");
    }
    SetEnd_DayYear(value: number): void {
        throw new Error("Method not implemented.");
    }
    SetEnd_MonthMonth(value: number): void {
        throw new Error("Method not implemented.");
    }
    SetEnd_MonthYear(value: number): void {
        throw new Error("Method not implemented.");
    }
    SetEnd_Year(value: number): void {
        throw new Error("Method not implemented.");
    }
    SetEnd_DecadeDecade(value: number): void {
        throw new Error("Method not implemented.");
    }
    SetEnd_DecadeCentury(value: number): void {
        throw new Error("Method not implemented.");
    }
    SetEnd_Century(value: number): void {
        throw new Error("Method not implemented.");
    }
    GetBegin_DecadeDecade(): number {
        throw new Error("Method not implemented.");
    }
    GetBegin_DecadeCentury(): number {
        throw new Error("Method not implemented.");
    }
    GetBegin_Century(): number {
        throw new Error("Method not implemented.");
    }
    GetEndType(): EnumPeriod {
        throw new Error("Method not implemented.");
    }
    GetEnd_DayDay(): number {
        throw new Error("Method not implemented.");
    }
    GetEnd_DayMonth(): number {
        throw new Error("Method not implemented.");
    }
    GetEnd_DayYear(): number {
        throw new Error("Method not implemented.");
    }
    GetEnd_MonthMonth(): number {
        throw new Error("Method not implemented.");
    }
    GetEnd_MonthYear(): number {
        throw new Error("Method not implemented.");
    }
    GetEnd_Year(): number {
        throw new Error("Method not implemented.");
    }
    GetEnd_DecadeDecade(): number {
        throw new Error("Method not implemented.");
    }
    GetEnd_DecadeCentury(): number {
        throw new Error("Method not implemented.");
    }
    GetEnd_Century(): number {
        throw new Error("Method not implemented.");
    }
  private Presenter: AddPeriodPresenter
  private tbName: HTMLInputElement
  private tbIsPeriod: HTMLInputElement
  private tbBegin_Type: HTMLSelectElement
  private tbBegin_DayDay: HTMLInputElement
  private tbBegin_DayMonth: HTMLSelectElement
  private tbBegin_DayYear: HTMLInputElement
  private tbBegin_MonthMonth: HTMLSelectElement
  private tbBegin_MonthYear: HTMLInputElement
  private tbBegin_Year: HTMLInputElement
  private tbBegin_DecadeDecade: HTMLSelectElement
  private tbBegin_DecadeCentury: HTMLInputElement
  private tbBegin_Century: HTMLInputElement
  private tbEnd_Type: HTMLSelectElement
  private tbEnd_DayDay: HTMLInputElement
  private tbEnd_DayMonth: HTMLSelectElement
  private tbEnd_DayYear: HTMLInputElement
  private tbEnd_MonthMonth: HTMLSelectElement
  private tbEnd_MonthYear: HTMLInputElement
  private tbEnd_Year: HTMLInputElement
  private tbEnd_DecadeDecade: HTMLSelectElement
  private tbEnd_DecadeCentury: HTMLInputElement
  private tbEnd_Century: HTMLInputElement
  private btnOk: HTMLButtonElement
  private btnCancel: HTMLButtonElement
  private dlg: HTMLElement
  public constructor() {
    this.tbName = <HTMLInputElement>document.getElementById('addperiod_Name')
    this.tbIsPeriod = <HTMLInputElement>document.getElementById('addperiod_IsPeriod')
    this.tbBegin_Type = <HTMLSelectElement>document.getElementById('addperiod_Begin_Type')
    this.tbBegin_DayDay = <HTMLInputElement>document.getElementById('addperiod_Begin_DayDay')
    this.tbBegin_DayMonth = <HTMLSelectElement>document.getElementById('addperiod_Begin_DayMonth')
    this.tbBegin_DayYear = <HTMLInputElement>document.getElementById('addperiod_Begin_DayYear')
    this.tbBegin_MonthMonth = <HTMLSelectElement>document.getElementById('addperiod_Begin_MonthMonth')
    this.tbBegin_MonthYear = <HTMLInputElement>document.getElementById('addperiod_Begin_MonthYear')
    this.tbBegin_Year = <HTMLInputElement>document.getElementById('addperiod_Begin_DayMonth')
    this.tbBegin_DecadeDecade = <HTMLSelectElement>document.getElementById('addperiod_Begin_DecadeDecade')
    this.tbBegin_DecadeCentury = <HTMLInputElement>document.getElementById('addperiod_Begin_DecadeCentury')
    this.tbBegin_Century = <HTMLInputElement>document.getElementById('addperiod_Begin_Century')
    this.tbEnd_Type = <HTMLSelectElement>document.getElementById('addperiod_End_Type')
    this.tbEnd_DayDay = <HTMLInputElement>document.getElementById('addperiod_End_DayDay')
    this.tbEnd_DayMonth = <HTMLSelectElement>document.getElementById('addperiod_End_DayMonth')
    this.tbEnd_DayYear = <HTMLInputElement>document.getElementById('addperiod_End_DayYear')
    this.tbEnd_MonthMonth = <HTMLSelectElement>document.getElementById('addperiod_End_MonthMonth')
    this.tbEnd_MonthYear = <HTMLInputElement>document.getElementById('addperiod_End_MonthYear')
    this.tbEnd_Year = <HTMLInputElement>document.getElementById('addperiod_End_DayMonth')
    this.tbEnd_DecadeDecade = <HTMLSelectElement>document.getElementById('addperiod_End_DecadeDecade')
    this.tbEnd_DecadeCentury = <HTMLInputElement>document.getElementById('addperiod_End_DecadeCentury')
    this.tbEnd_Century = <HTMLInputElement>document.getElementById('addperiod_End_Century')
    this.btnOk = <HTMLButtonElement>document.getElementById('btnAddPeriod')
    this.btnCancel = <HTMLButtonElement>document.getElementById('btnCancelAddPeriod')
    this.dlg = <HTMLElement>document.getElementById('tmAddPeriod')
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