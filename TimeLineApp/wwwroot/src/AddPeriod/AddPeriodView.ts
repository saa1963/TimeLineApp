import { IAddPeriodView } from "./IAddPeriodView";
import { EnumPeriod } from "../TLEvent"
import { AddPeriodPresenter } from "./AddPeriodPresenter";
import { AddPeriodModel } from "./AddPeriodModel";
import { Globals } from "../Globals";
import * as $ from 'jquery'

export class AddPeriodView implements IAddPeriodView {
  private Presenter: AddPeriodPresenter
  private model: AddPeriodModel
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
  private tbError: HTMLDivElement
  private tbCard1: HTMLDivElement
  private tbCard2: HTMLDivElement
  private form: HTMLFormElement
  private submit: HTMLInputElement
  private btnOk: HTMLButtonElement
  private btnCancel: HTMLButtonElement
  private dlg: HTMLElement
  public constructor(model: AddPeriodModel) {
    this.tbName = <HTMLInputElement>document.getElementById('addperiod_Name')
    this.tbIsPeriod = <HTMLInputElement>document.getElementById('addperiod_IsPeriod')
    this.tbBegin_Type = <HTMLSelectElement>document.getElementById('addperiod_Begin_Type')
    this.tbBegin_DayDay = <HTMLInputElement>document.getElementById('addperiod_Begin_DayDay')
    this.tbBegin_DayMonth = <HTMLSelectElement>document.getElementById('addperiod_Begin_DayMonth')
    this.tbBegin_DayYear = <HTMLInputElement>document.getElementById('addperiod_Begin_DayYear')
    this.tbBegin_MonthMonth = <HTMLSelectElement>document.getElementById('addperiod_Begin_MonthMonth')
    this.tbBegin_MonthYear = <HTMLInputElement>document.getElementById('addperiod_Begin_MonthYear')
    this.tbBegin_Year = <HTMLInputElement>document.getElementById('addperiod_Begin_Year')
    this.tbBegin_DecadeDecade = <HTMLSelectElement>document.getElementById('addperiod_Begin_DecadeDecade')
    this.tbBegin_DecadeCentury = <HTMLInputElement>document.getElementById('addperiod_Begin_DecadeCentury')
    this.tbBegin_Century = <HTMLInputElement>document.getElementById('addperiod_Begin_Century')
    this.tbEnd_Type = <HTMLSelectElement>document.getElementById('addperiod_End_Type')
    this.tbEnd_DayDay = <HTMLInputElement>document.getElementById('addperiod_End_DayDay')
    this.tbEnd_DayMonth = <HTMLSelectElement>document.getElementById('addperiod_End_DayMonth')
    this.tbEnd_DayYear = <HTMLInputElement>document.getElementById('addperiod_End_DayYear')
    this.tbEnd_MonthMonth = <HTMLSelectElement>document.getElementById('addperiod_End_MonthMonth')
    this.tbEnd_MonthYear = <HTMLInputElement>document.getElementById('addperiod_End_MonthYear')
    this.tbEnd_Year = <HTMLInputElement>document.getElementById('addperiod_End_Year')
    this.tbEnd_DecadeDecade = <HTMLSelectElement>document.getElementById('addperiod_End_DecadeDecade')
    this.tbEnd_DecadeCentury = <HTMLInputElement>document.getElementById('addperiod_End_DecadeCentury')
    this.tbEnd_Century = <HTMLInputElement>document.getElementById('addperiod_End_Century')
    this.tbError = <HTMLDivElement>document.getElementById('addperiod_server_error')
    this.tbCard1 = <HTMLDivElement>document.getElementById('addperiod_card1')
    this.tbCard2 = <HTMLDivElement>document.getElementById('addperiod_card2')
    this.form = <HTMLFormElement>document.getElementById('addperiod_form')
    this.submit = <HTMLInputElement>document.getElementById('addperiod_submit')
    this.btnOk = <HTMLButtonElement>document.getElementById('btnAddPeriod')
    this.btnCancel = <HTMLButtonElement>document.getElementById('btnCancelAddPeriod')
    this.dlg = <HTMLElement>document.getElementById('tmAddPeriod')

    this.tbName.onchange = () => {
      this.Presenter.OnChangeNameInView()
    }
    this.tbIsPeriod.onchange = () => {
      this.Presenter.OnChangeIsPeriodInView()
      this.IsPeriodTune()
    }
    this.tbBegin_Type.onchange = () => {
      this.Presenter.OnChangeBegin_TypeInView()
      this.BeginTypeTune()
    }
    this.tbBegin_DayDay.onchange = () => {
      this.Presenter.OnChangeBegin_DayDayInView()
    }
    this.tbBegin_DayMonth.onchange = () => {
      this.Presenter.OnChangeBegin_DayMonthInView()
    }
    this.tbBegin_DayYear.onchange = () => {
      this.Presenter.OnChangeBegin_DayYearInView()
    }
    this.tbBegin_MonthMonth.onchange = () => {
      this.Presenter.OnChangeBegin_MonthMonthInView()
    }
    this.tbBegin_MonthYear.onchange = () => {
      this.Presenter.OnChangeBegin_MonthYearInView()
    }
    this.tbBegin_Year.onchange = () => {
      this.Presenter.OnChangeBegin_YearInView()
    }
    this.tbBegin_DecadeDecade.onchange = () => {
      this.Presenter.OnChangeBegin_DecadeDecadeInView()
    }
    this.tbBegin_DecadeCentury.onchange = () => {
      this.Presenter.OnChangeBegin_DecadeCenturyInView()
    }
    this.tbBegin_Century.onchange = () => {
      this.Presenter.OnChangeBegin_CenturyInView()
    }
    this.tbEnd_Type.onchange = () => {
      this.Presenter.OnChangeEnd_TypeInView()
      this.EndTypeTune()
    }
    this.tbEnd_DayDay.onchange = () => {
      this.Presenter.OnChangeEnd_DayDayInView()
    }
    this.tbEnd_DayMonth.onchange = () => {
      this.Presenter.OnChangeEnd_DayMonthInView()
    }
    this.tbEnd_DayYear.onchange = () => {
      this.Presenter.OnChangeEnd_DayYearInView()
    }
    this.tbEnd_MonthMonth.onchange = () => {
      this.Presenter.OnChangeEnd_MonthMonthInView()
    }
    this.tbEnd_MonthYear.onchange = () => {
      this.Presenter.OnChangeEnd_MonthYearInView()
    }
    this.tbEnd_Year.onchange = () => {
      this.Presenter.OnChangeEnd_YearInView()
    }
    this.tbEnd_DecadeDecade.onchange = () => {
      this.Presenter.OnChangeEnd_DecadeDecadeInView()
    }
    this.tbEnd_DecadeCentury.onchange = () => {
      this.Presenter.OnChangeEnd_DecadeCenturyInView()
    }
    this.tbEnd_Century.onchange = () => {
      this.Presenter.OnChangeEnd_CenturyInView()
    }
    this.tbCard2.setAttribute('hidden', '')
    this.tbBegin_Type.selectedIndex = 0;
    this.tbEnd_Type.selectedIndex = 0;

    this.model = model
    this.Presenter = new AddPeriodPresenter(this, model)
  }

  ShowDialog(): Promise<AddPeriodModel> {
    return new Promise<AddPeriodModel>((resolve, reject) => {
      $('#tmAddPeriod').modal()
      this.ClearError()
      this.btnOk.onclick = async () => {
        if (!this.ValidateElementsAddPeriod()) {
          this.submit.click()
        } else {
          $('#tmAddPeriod').modal('hide')
          resolve(this.model)
        }
      }
      this.btnCancel.onclick = async () => {
        $('#tmAddPeriod').modal('hide')
        resolve(null)
      }
    })
  }

  private ValidateElementsAddPeriod(): boolean {
    let rt = true
    if (!this.tbName.checkValidity()) { rt = false }
    switch (this.tbBegin_Type.selectedIndex) {
      case 0:
        if (!this.tbBegin_DayDay.checkValidity()) rt = false
        if (!this.tbBegin_DayMonth.checkValidity()) rt = false
        if (!this.tbBegin_DayYear.checkValidity()) rt = false
        break;
      case 1:
        if (!this.tbBegin_MonthMonth.checkValidity()) rt = false
        if (!this.tbBegin_MonthYear.checkValidity()) rt = false
        break;
      case 2:
        if (!this.tbBegin_Year.checkValidity()) rt = false
        break;
      case 3:
        if (!this.tbBegin_DecadeDecade.checkValidity()) rt = false
        if (!this.tbBegin_DecadeCentury.checkValidity()) rt = false
        break;
      case 4:
        if (!this.tbBegin_Century.checkValidity()) rt = false
        break;
    }
    if (this.tbIsPeriod.checked === true) {
      switch (this.tbEnd_Type.selectedIndex) {
        case 0:
          if (!this.tbEnd_DayDay.checkValidity()) rt = false
          if (!this.tbEnd_DayMonth.checkValidity()) rt = false
          if (!this.tbEnd_DayYear.checkValidity()) rt = false
          break;
        case 1:
          if (!this.tbEnd_MonthMonth.checkValidity()) rt = false
          if (!this.tbEnd_MonthYear.checkValidity()) rt = false
          break;
        case 2:
          if (!this.tbEnd_Year.checkValidity()) rt = false
          break;
        case 3:
          if (!this.tbEnd_DecadeDecade.checkValidity()) rt = false
          if (!this.tbEnd_DecadeCentury.checkValidity()) rt = false
          break;
        case 4:
          if (!this.tbEnd_Century.checkValidity()) rt = false
          break;
      }
    }
    return rt
  }

  private ClearError() {
    while (this.tbError.firstChild) {
      this.tbError.removeChild(this.tbError.firstChild);
    }
  }

  SetName(value: string): void {
    this.tbName.value = value
  }
  SetIsPeriod(value: boolean): void {
    this.tbIsPeriod.checked = value
    this.IsPeriodTune()
  }
  SetBeginType(value: EnumPeriod): void {
    this.tbBegin_Type.selectedIndex = value - 1
    this.BeginTypeTune()
  }
  SetBegin_DayDay(value: number): void {
    this.tbBegin_DayDay.valueAsNumber = value
  }
  SetBegin_DayMonth(value: number): void {
    this.tbBegin_DayMonth.selectedIndex = value
  }
  SetBegin_DayYear(value: number): void {
    this.tbBegin_DayYear.valueAsNumber = value
  }
  SetBegin_MonthMonth(value: number): void {
    this.tbBegin_MonthMonth.selectedIndex = value
  }
  SetBegin_MonthYear(value: number): void {
    this.tbBegin_MonthYear.valueAsNumber = value
  }
  SetBegin_Year(value: number): void {
    this.tbBegin_Year.valueAsNumber = value
  }
  SetBegin_DecadeDecade(value: number): void {
    this.tbBegin_DecadeDecade.selectedIndex = value
  }
  SetBegin_DecadeCentury(value: number): void {
    this.tbBegin_DecadeCentury.valueAsNumber = value
  }
  SetBegin_Century(value: number): void {
    this.tbBegin_Century.valueAsNumber = value
  }
  SetEndType(value: EnumPeriod): void {
    this.tbEnd_Type.selectedIndex = value - 1
    this.EndTypeTune()
  }
  SetEnd_DayDay(value: number): void {
    this.tbEnd_DayDay.valueAsNumber = value
  }
  SetEnd_DayMonth(value: number): void {
    this.tbEnd_DayMonth.selectedIndex = value
  }
  SetEnd_DayYear(value: number): void {
    this.tbEnd_DayYear.valueAsNumber = value
  }
  SetEnd_MonthMonth(value: number): void {
    this.tbEnd_MonthMonth.selectedIndex = value
  }
  SetEnd_MonthYear(value: number): void {
    this.tbEnd_MonthYear.valueAsNumber = value
  }
  SetEnd_Year(value: number): void {
    this.tbEnd_Year.valueAsNumber = value
  }
  SetEnd_DecadeDecade(value: number): void {
    this.tbEnd_DecadeDecade.selectedIndex = value
  }
  SetEnd_DecadeCentury(value: number): void {
    this.tbEnd_DecadeCentury.valueAsNumber = value
  }
  SetEnd_Century(value: number): void {
    this.tbEnd_Century.valueAsNumber = value
  }
  SetError(err: string): void {
    this.ClearError()
    this.tbError.append(err)
    this.tbError.style.display = 'unset'
  }
  GetName(): string {
    return this.tbName.value
  }
  GetIsPeriod(): boolean {
    return this.tbIsPeriod.checked
  }
  GetBeginType(): EnumPeriod {
    return this.tbBegin_Type.selectedIndex + 1
  }
  GetBegin_DayDay(): number {
    return this.tbBegin_DayDay.valueAsNumber
  }
  GetBegin_DayMonth(): number {
    return this.tbBegin_DayMonth.selectedIndex
  }
  GetBegin_DayYear(): number {
    return this.tbBegin_DayYear.valueAsNumber
  }
  GetBegin_MonthMonth(): number {
    return this.tbBegin_MonthMonth.selectedIndex
  }
  GetBegin_MonthYear(): number {
    return this.tbBegin_MonthYear.valueAsNumber
  }
  GetBegin_Year(): number {
    return this.tbBegin_Year.valueAsNumber
  }
  GetBegin_DecadeDecade(): number {
    return this.tbBegin_DecadeDecade.selectedIndex
  }
  GetBegin_DecadeCentury(): number {
    return this.tbBegin_DecadeCentury.valueAsNumber
  }
  GetBegin_Century(): number {
    return this.tbBegin_Century.valueAsNumber
  }
  GetEndType(): EnumPeriod {
    return this.tbEnd_Type.selectedIndex + 1
  }
  GetEnd_DayDay(): number {
    return this.tbEnd_DayDay.valueAsNumber
  }
  GetEnd_DayMonth(): number {
    return this.tbEnd_DayMonth.selectedIndex
  }
  GetEnd_DayYear(): number {
    return this.tbEnd_DayYear.valueAsNumber
  }
  GetEnd_MonthMonth(): number {
    return this.tbEnd_MonthMonth.selectedIndex
  }
  GetEnd_MonthYear(): number {
    return this.tbEnd_MonthYear.valueAsNumber
  }
  GetEnd_Year(): number {
    return this.tbEnd_Year.valueAsNumber
  }
  GetEnd_DecadeDecade(): number {
    return this.tbEnd_DecadeDecade.selectedIndex
  }
  GetEnd_DecadeCentury(): number {
    return this.tbEnd_DecadeCentury.valueAsNumber
  }
  GetEnd_Century(): number {
    return this.tbEnd_Century.valueAsNumber
  }
  private IsPeriodTune() {
    if (this.tbIsPeriod.checked) {
      this.tbCard2.removeAttribute('hidden')
    } else {
      this.tbCard2.setAttribute('hidden', '')
    }
  }
  private BeginTypeTune() {
    this.tbCard1.querySelectorAll('*[id|="addperiod-begin-row"]').forEach((el) => {
      el.setAttribute('hidden', '')
    });
    document.getElementById('addperiod-begin-row-' + (this.tbBegin_Type.selectedIndex + 1))
      .removeAttribute('hidden')
  }
  private EndTypeTune() {
    this.tbCard2.querySelectorAll('*[id|="addperiod-end-row"]').forEach((el) => {
      el.setAttribute('hidden', '')
    });
    document.getElementById('addperiod-end-row-' + (this.tbEnd_Type.selectedIndex + 1))
      .removeAttribute('hidden')
  }
}