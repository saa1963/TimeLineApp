import { InterfaceAddPeriodView } from "./IAddPeriodView";
import { EnumPeriod } from "../TLEvent"
import { AddPeriodPresenter } from "./AddPeriodPresenter";
import { AddPeriodModel } from "./AddPeriodModel";
import { Globals } from "../Globals";
import * as $ from 'jquery'

export class AddPeriodView implements InterfaceAddPeriodView {
  private Presenter: AddPeriodPresenter
  private model: AddPeriodModel
  private tbName: HTMLInputElement
  private tbIsPeriod: HTMLInputElement
  private tbBeginType: HTMLSelectElement
  private tbBeginDayDay: HTMLInputElement
  private tbBeginDayMonth: HTMLSelectElement
  private tbBeginDayYear: HTMLInputElement
  private tbBeginMonthMonth: HTMLSelectElement
  private tbBeginMonthYear: HTMLInputElement
  private tbBeginYear: HTMLInputElement
  private tbBeginDecadeDecade: HTMLSelectElement
  private tbBeginDecadeCentury: HTMLInputElement
  private tbBeginCentury: HTMLInputElement
  private tbEndType: HTMLSelectElement
  private tbEndDayDay: HTMLInputElement
  private tbEndDayMonth: HTMLSelectElement
  private tbEndDayYear: HTMLInputElement
  private tbEndMonthMonth: HTMLSelectElement
  private tbEndMonthYear: HTMLInputElement
  private tbEndYear: HTMLInputElement
  private tbEndDecadeDecade: HTMLSelectElement
  private tbEndDecadeCentury: HTMLInputElement
  private tbEndCentury: HTMLInputElement
  private tbError: HTMLDivElement
  private tbCard1: HTMLDivElement
  private tbCard2: HTMLDivElement
  private form: HTMLFormElement
  private submit: HTMLInputElement
  private btnOk: HTMLButtonElement
  private btnCancel: HTMLButtonElement
  private dlg: HTMLElement
  public constructor(model: AddPeriodModel) {
    this.tbName = document.getElementById('addperiod_Name') as HTMLInputElement
    this.tbIsPeriod = document.getElementById('addperiod_IsPeriod') as HTMLInputElement
    this.tbBeginType = document.getElementById('addperiod_Begin_Type') as HTMLSelectElement
    this.tbBeginDayDay = document.getElementById('addperiod_Begin_DayDay') as HTMLInputElement
    this.tbBeginDayMonth = document.getElementById('addperiod_Begin_DayMonth') as HTMLSelectElement
    this.tbBeginDayYear = document.getElementById('addperiod_Begin_DayYear') as HTMLInputElement
    this.tbBeginMonthMonth = document.getElementById('addperiod_Begin_MonthMonth') as HTMLSelectElement
    this.tbBeginMonthYear = document.getElementById('addperiod_Begin_MonthYear') as HTMLInputElement
    this.tbBeginYear = document.getElementById('addperiod_Begin_Year') as HTMLInputElement
    this.tbBeginDecadeDecade = document.getElementById('addperiod_Begin_DecadeDecade') as HTMLSelectElement
    this.tbBeginDecadeCentury = document.getElementById('addperiod_Begin_DecadeCentury') as HTMLInputElement
    this.tbBeginCentury = document.getElementById('addperiod_Begin_Century') as HTMLInputElement
    this.tbEndType = document.getElementById('addperiod_End_Type') as HTMLSelectElement
    this.tbEndDayDay = document.getElementById('addperiod_End_DayDay') as HTMLInputElement
    this.tbEndDayMonth = document.getElementById('addperiod_End_DayMonth') as HTMLSelectElement
    this.tbEndDayYear = document.getElementById('addperiod_End_DayYear') as HTMLInputElement
    this.tbEndMonthMonth = document.getElementById('addperiod_End_MonthMonth') as HTMLSelectElement
    this.tbEndMonthYear = document.getElementById('addperiod_End_MonthYear') as HTMLInputElement
    this.tbEndYear = document.getElementById('addperiod_End_Year') as HTMLInputElement
    this.tbEndDecadeDecade = document.getElementById('addperiod_End_DecadeDecade') as HTMLSelectElement
    this.tbEndDecadeCentury = document.getElementById('addperiod_End_DecadeCentury') as HTMLInputElement
    this.tbEndCentury = document.getElementById('addperiod_End_Century') as HTMLInputElement
    this.tbError = document.getElementById('addperiod_server_error') as HTMLDivElement
    this.tbCard1 = document.getElementById('addperiod_card1') as HTMLDivElement
    this.tbCard2 = document.getElementById('addperiod_card2') as HTMLDivElement
    this.form = document.getElementById('addperiod_form') as HTMLFormElement
    this.submit = document.getElementById('addperiod_submit') as HTMLInputElement
    this.btnOk = document.getElementById('btnAddPeriod') as HTMLButtonElement
    this.btnCancel = document.getElementById('btnCancelAddPeriod') as HTMLButtonElement
    this.dlg = document.getElementById('tmAddPeriod') as HTMLElement

    this.tbName.onchange = () => {
      this.Presenter.OnChangeNameInView()
    }
    this.tbIsPeriod.onchange = () => {
      this.Presenter.OnChangeIsPeriodInView()
      this.IsPeriodTune()
    }
    this.tbBeginType.onchange = () => {
      this.Presenter.OnChangeBeginTypeInView()
      this.BeginTypeTune()
    }
    this.tbBeginDayDay.onchange = () => {
      this.Presenter.OnChangeBeginDayDayInView()
    }
    this.tbBeginDayMonth.onchange = () => {
      this.Presenter.OnChangeBeginDayMonthInView()
    }
    this.tbBeginDayYear.onchange = () => {
      this.Presenter.OnChangeBeginDayYearInView()
    }
    this.tbBeginMonthMonth.onchange = () => {
      this.Presenter.OnChangeBeginMonthMonthInView()
    }
    this.tbBeginMonthYear.onchange = () => {
      this.Presenter.OnChangeBeginMonthYearInView()
    }
    this.tbBeginYear.onchange = () => {
      this.Presenter.OnChangeBeginYearInView()
    }
    this.tbBeginDecadeDecade.onchange = () => {
      this.Presenter.OnChangeBeginDecadeDecadeInView()
    }
    this.tbBeginDecadeCentury.onchange = () => {
      this.Presenter.OnChangeBeginDecadeCenturyInView()
    }
    this.tbBeginCentury.onchange = () => {
      this.Presenter.OnChangeBeginCenturyInView()
    }
    this.tbEndType.onchange = () => {
      this.Presenter.OnChangeEndTypeInView()
      this.EndTypeTune()
    }
    this.tbEndDayDay.onchange = () => {
      this.Presenter.OnChangeEndDayDayInView()
    }
    this.tbEndDayMonth.onchange = () => {
      this.Presenter.OnChangeEndDayMonthInView()
    }
    this.tbEndDayYear.onchange = () => {
      this.Presenter.OnChangeEndDayYearInView()
    }
    this.tbEndMonthMonth.onchange = () => {
      this.Presenter.OnChangeEndMonthMonthInView()
    }
    this.tbEndMonthYear.onchange = () => {
      this.Presenter.OnChangeEndMonthYearInView()
    }
    this.tbEndYear.onchange = () => {
      this.Presenter.OnChangeEndYearInView()
    }
    this.tbEndDecadeDecade.onchange = () => {
      this.Presenter.OnChangeEndDecadeDecadeInView()
    }
    this.tbEndDecadeCentury.onchange = () => {
      this.Presenter.OnChangeEndDecadeCenturyInView()
    }
    this.tbEndCentury.onchange = () => {
      this.Presenter.OnChangeEndCenturyInView()
    }
    this.tbCard2.setAttribute('hidden', '')
    this.tbBeginType.selectedIndex = 0;
    this.tbEndType.selectedIndex = 0;

    this.model = model
    this.Presenter = new AddPeriodPresenter(this, model)
  }

  ShowDialog(): Promise<AddPeriodModel> {
    return new Promise<AddPeriodModel>((resolve) => {
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
    switch (this.tbBeginType.selectedIndex) {
      case 0:
        if (!this.tbBeginDayDay.checkValidity()) rt = false
        if (!this.tbBeginDayMonth.checkValidity()) rt = false
        if (!this.tbBeginDayYear.checkValidity()) rt = false
        break;
      case 1:
        if (!this.tbBeginMonthMonth.checkValidity()) rt = false
        if (!this.tbBeginMonthYear.checkValidity()) rt = false
        break;
      case 2:
        if (!this.tbBeginYear.checkValidity()) rt = false
        break;
      case 3:
        if (!this.tbBeginDecadeDecade.checkValidity()) rt = false
        if (!this.tbBeginDecadeCentury.checkValidity()) rt = false
        break;
      case 4:
        if (!this.tbBeginCentury.checkValidity()) rt = false
        break;
    }
    if (this.tbIsPeriod.checked === true) {
      switch (this.tbEndType.selectedIndex) {
        case 0:
          if (!this.tbEndDayDay.checkValidity()) rt = false
          if (!this.tbEndDayMonth.checkValidity()) rt = false
          if (!this.tbEndDayYear.checkValidity()) rt = false
          break;
        case 1:
          if (!this.tbEndMonthMonth.checkValidity()) rt = false
          if (!this.tbEndMonthYear.checkValidity()) rt = false
          break;
        case 2:
          if (!this.tbEndYear.checkValidity()) rt = false
          break;
        case 3:
          if (!this.tbEndDecadeDecade.checkValidity()) rt = false
          if (!this.tbEndDecadeCentury.checkValidity()) rt = false
          break;
        case 4:
          if (!this.tbEndCentury.checkValidity()) rt = false
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
    this.tbBeginType.selectedIndex = value - 1
    this.BeginTypeTune()
  }
  SetBeginDayDay(value: number): void {
    this.tbBeginDayDay.valueAsNumber = value
  }
  SetBeginDayMonth(value: number): void {
    this.tbBeginDayMonth.selectedIndex = value
  }
  SetBeginDayYear(value: number): void {
    this.tbBeginDayYear.valueAsNumber = value
  }
  SetBeginMonthMonth(value: number): void {
    this.tbBeginMonthMonth.selectedIndex = value
  }
  SetBeginMonthYear(value: number): void {
    this.tbBeginMonthYear.valueAsNumber = value
  }
  SetBeginYear(value: number): void {
    this.tbBeginYear.valueAsNumber = value
  }
  SetBeginDecadeDecade(value: number): void {
    this.tbBeginDecadeDecade.selectedIndex = value
  }
  SetBeginDecadeCentury(value: number): void {
    this.tbBeginDecadeCentury.valueAsNumber = value
  }
  SetBeginCentury(value: number): void {
    this.tbBeginCentury.valueAsNumber = value
  }
  SetEndType(value: EnumPeriod): void {
    this.tbEndType.selectedIndex = value - 1
    this.EndTypeTune()
  }
  SetEndDayDay(value: number): void {
    this.tbEndDayDay.valueAsNumber = value
  }
  SetEndDayMonth(value: number): void {
    this.tbEndDayMonth.selectedIndex = value
  }
  SetEndDayYear(value: number): void {
    this.tbEndDayYear.valueAsNumber = value
  }
  SetEndMonthMonth(value: number): void {
    this.tbEndMonthMonth.selectedIndex = value
  }
  SetEndMonthYear(value: number): void {
    this.tbEndMonthYear.valueAsNumber = value
  }
  SetEndYear(value: number): void {
    this.tbEndYear.valueAsNumber = value
  }
  SetEndDecadeDecade(value: number): void {
    this.tbEndDecadeDecade.selectedIndex = value
  }
  SetEndDecadeCentury(value: number): void {
    this.tbEndDecadeCentury.valueAsNumber = value
  }
  SetEndCentury(value: number): void {
    this.tbEndCentury.valueAsNumber = value
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
    return this.tbBeginType.selectedIndex + 1
  }
  GetBeginDayDay(): number {
    return this.tbBeginDayDay.valueAsNumber
  }
  GetBeginDayMonth(): number {
    return this.tbBeginDayMonth.selectedIndex
  }
  GetBeginDayYear(): number {
    return this.tbBeginDayYear.valueAsNumber
  }
  GetBeginMonthMonth(): number {
    return this.tbBeginMonthMonth.selectedIndex
  }
  GetBeginMonthYear(): number {
    return this.tbBeginMonthYear.valueAsNumber
  }
  GetBeginYear(): number {
    return this.tbBeginYear.valueAsNumber
  }
  GetBeginDecadeDecade(): number {
    return this.tbBeginDecadeDecade.selectedIndex
  }
  GetBeginDecadeCentury(): number {
    return this.tbBeginDecadeCentury.valueAsNumber
  }
  GetBeginCentury(): number {
    return this.tbBeginCentury.valueAsNumber
  }
  GetEndType(): EnumPeriod {
    return this.tbEndType.selectedIndex + 1
  }
  GetEndDayDay(): number {
    return this.tbEndDayDay.valueAsNumber
  }
  GetEndDayMonth(): number {
    return this.tbEndDayMonth.selectedIndex
  }
  GetEndDayYear(): number {
    return this.tbEndDayYear.valueAsNumber
  }
  GetEndMonthMonth(): number {
    return this.tbEndMonthMonth.selectedIndex
  }
  GetEndMonthYear(): number {
    return this.tbEndMonthYear.valueAsNumber
  }
  GetEndYear(): number {
    return this.tbEndYear.valueAsNumber
  }
  GetEndDecadeDecade(): number {
    return this.tbEndDecadeDecade.selectedIndex
  }
  GetEndDecadeCentury(): number {
    return this.tbEndDecadeCentury.valueAsNumber
  }
  GetEndCentury(): number {
    return this.tbEndCentury.valueAsNumber
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
    document.getElementById('addperiod-begin-row-' + (this.tbBeginType.selectedIndex + 1))
      .removeAttribute('hidden')
  }
  private EndTypeTune() {
    this.tbCard2.querySelectorAll('*[id|="addperiod-end-row"]').forEach((el) => {
      el.setAttribute('hidden', '')
    });
    document.getElementById('addperiod-end-row-' + (this.tbEndType.selectedIndex + 1))
      .removeAttribute('hidden')
  }
}