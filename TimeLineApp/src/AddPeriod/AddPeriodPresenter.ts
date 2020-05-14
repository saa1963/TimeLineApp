import { AddPeriodModel } from "./AddPeriodModel"
import { InterfaceAddPeriodView } from "./IAddPeriodView"
import { EnumPeriod } from "../TLEvent"

export class AddPeriodPresenter {
  private model: AddPeriodModel
  private view: InterfaceAddPeriodView
  private mName: string
  private mIsPeriod: boolean
  private mBeginType: EnumPeriod
  private mBeginDayDay: number
  private mBeginDayMonth: number
  private mBeginDayYear: number
  private mBeginMonthMonth: number
  private mBeginMonthYear: number
  private mBeginYear: number
  private mBeginDecadeDecade: number
  private mBeginDecadeCentury: number
  private mBeginCentury: number
  private mEndType: number
  private mEndDayDay: number
  private mEndDayMonth: number
  private mEndDayYear: number
  private mEndMonthMonth: number
  private mEndMonthYear: number
  private mEndYear: number
  private mEndDecadeDecade: number
  private mEndDecadeCentury: number
  private mEndCentury: number

  constructor(view: InterfaceAddPeriodView, model: AddPeriodModel) {
    this.model = model
    this.view = view
    this.model.evChangeName.subscribe((value) => {
      if (value !== this.mName) {
        this.view.SetName(value)
      }
    })
    this.model.evChangeIsPeriod.subscribe((value) => {
      if (value !== this.mIsPeriod) {
        this.view.SetIsPeriod(value)
      }
    })
    this.model.evChangeBeginType.subscribe((value) => {
      if (value !== this.mBeginType) {
        this.view.SetBeginType(value)
      }
    })
    this.model.evChangeBeginDayDay.subscribe((value) => {
      if (value !== this.mBeginDayDay) {
        this.view.SetBeginDayDay(value)
      }
    })
    this.model.evChangeBeginDayMonth.subscribe((value) => {
      if (value !== this.mBeginDayMonth) {
        this.view.SetBeginDayMonth(value)
      }
    })
    this.model.evChangeBeginDayYear.subscribe((value) => {
      if (value !== this.mBeginDayYear) {
        this.view.SetBeginDayYear(value)
      }
    })
    this.model.evChangeBeginMonthMonth.subscribe((value) => {
      if (value !== this.mBeginMonthMonth) {
        this.view.SetBeginMonthMonth(value)
      }
    })
    this.model.evChangeBeginMonthYear.subscribe((value) => {
      if (value !== this.mBeginMonthYear) {
        this.view.SetBeginMonthYear(value)
      }
    })
    this.model.evChangeBeginYear.subscribe((value) => {
      if (value !== this.mBeginYear) {
        this.view.SetBeginYear(value)
      }
    })
    this.model.evChangeBeginDecadeDecade.subscribe((value) => {
      if (value !== this.mBeginDecadeDecade) {
        this.view.SetBeginDecadeDecade(value)
      }
    })
    this.model.evChangeBeginDecadeCentury.subscribe((value) => {
      if (value !== this.mBeginDecadeCentury) {
        this.view.SetBeginDecadeCentury(value)
      }
    })
    this.model.evChangeBeginCentury.subscribe((value) => {
      if (value !== this.mBeginCentury) {
        this.view.SetBeginCentury(value)
      }
    })

    this.model.evChangeEndType.subscribe((value) => {
      if (value !== this.mEndType) {
        this.view.SetEndType(value)
      }
    })
    this.model.evChangeEndDayDay.subscribe((value) => {
      if (value !== this.mEndDayDay) {
        this.view.SetEndDayDay(value)
      }
    })
    this.model.evChangeEndDayDay.subscribe((value) => {
      if (value !== this.mEndDayDay) {
        this.view.SetEndDayDay(value)
      }
    })
    this.model.evChangeEndDayMonth.subscribe((value) => {
      if (value !== this.mEndDayMonth) {
        this.view.SetEndDayMonth(value)
      }
    })
    this.model.evChangeEndDayYear.subscribe((value) => {
      if (value !== this.mEndDayYear) {
        this.view.SetEndDayYear(value)
      }
    })
    this.model.evChangeEndMonthMonth.subscribe((value) => {
      if (value !== this.mEndMonthMonth) {
        this.view.SetEndMonthMonth(value)
      }
    })
    this.model.evChangeEndMonthYear.subscribe((value) => {
      if (value !== this.mEndMonthYear) {
        this.view.SetEndMonthYear(value)
      }
    })
    this.model.evChangeEndYear.subscribe((value) => {
      if (value !== this.mEndYear) {
        this.view.SetEndYear(value)
      }
    })
    this.model.evChangeEndDecadeDecade.subscribe((value) => {
      if (value !== this.mEndDecadeDecade) {
        this.view.SetEndDecadeDecade(value)
      }
    })
    this.model.evChangeEndDecadeCentury.subscribe((value) => {
      if (value !== this.mEndDecadeCentury) {
        this.view.SetEndDecadeCentury(value)
      }
    })
    this.model.evChangeEndCentury.subscribe((value) => {
      if (value !== this.mEndCentury) {
        this.view.SetEndCentury(value)
      }
    })

    this.mName = model.Name
    this.mIsPeriod = model.IsPeriod
    this.mBeginType = model.BeginType
    this.mBeginDayDay = model.BeginDayDay
    this.mBeginDayMonth = model.BeginDayMonth
    this.mBeginDayYear = model.BeginDayYear
    this.mBeginMonthMonth = model.BeginMonthMonth
    this.mBeginMonthYear = model.BeginMonthYear
    this.mBeginYear = model.BeginYear
    this.mBeginDecadeDecade = model.BeginDecadeDecade
    this.mBeginDecadeCentury = model.BeginDecadeCentury
    this.mBeginCentury = model.BeginCentury
    this.mEndType = model.EndType
    this.mEndDayDay = model.EndDayDay
    this.mEndDayMonth = model.EndDayMonth
    this.mEndDayYear = model.EndDayYear
    this.mEndMonthMonth = model.EndMonthMonth
    this.mEndMonthYear = model.EndMonthYear
    this.mEndYear = model.EndYear
    this.mEndDecadeDecade = model.EndDecadeDecade
    this.mEndDecadeCentury = model.EndDecadeCentury
    this.mEndCentury = model.EndCentury
    this.view.SetName(model.Name)
    this.view.SetBeginType(model.BeginType)
    this.view.SetIsPeriod(model.IsPeriod)
    this.view.SetBeginDayDay(model.BeginDayDay)
    this.view.SetBeginDayMonth(model.BeginDayMonth)
    this.view.SetBeginDayYear(model.BeginDayYear)
    this.view.SetBeginMonthMonth(model.BeginMonthMonth)
    this.view.SetBeginMonthYear(model.BeginMonthYear)
    this.view.SetBeginYear(model.BeginYear)
    this.view.SetBeginDecadeDecade(model.BeginDecadeDecade)
    this.view.SetBeginDecadeCentury(model.BeginDecadeCentury)
    this.view.SetBeginCentury(model.BeginCentury)
    this.view.SetEndType(model.EndType)
    this.view.SetEndDayDay(model.EndDayDay)
    this.view.SetEndDayMonth(model.EndDayMonth)
    this.view.SetEndDayYear(model.EndDayYear)
    this.view.SetEndMonthMonth(model.EndMonthMonth)
    this.view.SetEndMonthYear(model.EndMonthYear)
    this.view.SetEndYear(model.EndYear)
    this.view.SetEndDecadeDecade(model.EndDecadeDecade)
    this.view.SetEndDecadeCentury(model.EndDecadeCentury)
    this.view.SetEndCentury(model.EndCentury)
  }

  // обработчики вызовов из View
  public OnChangeNameInView() {
    this.mName = this.view.GetName()
    this.model.Name = this.mName
  }
  public OnChangeIsPeriodInView() {
    this.mIsPeriod = this.view.GetIsPeriod()
    this.model.IsPeriod = this.mIsPeriod
  }
  public OnChangeBeginTypeInView() {
    this.mBeginType = this.view.GetBeginType()
    this.model.BeginType = this.mBeginType
  }
  public OnChangeBeginDayDayInView() {
    this.mBeginDayDay = this.view.GetBeginDayDay()
    this.model.BeginDayDay = this.mBeginDayDay
  }
  public OnChangeBeginDayMonthInView() {
    this.mBeginDayMonth = this.view.GetBeginDayMonth()
    this.model.BeginDayMonth = this.mBeginDayMonth
  }
  public OnChangeBeginDayYearInView() {
    this.mBeginDayYear = this.view.GetBeginDayYear()
    this.model.BeginDayYear = this.mBeginDayYear
  }
  public OnChangeBeginMonthMonthInView() {
    this.mBeginMonthMonth = this.view.GetBeginMonthMonth()
    this.model.BeginMonthMonth = this.mBeginMonthMonth
  }
  public OnChangeBeginMonthYearInView() {
    this.mBeginMonthYear = this.view.GetBeginMonthYear()
    this.model.BeginMonthYear = this.mBeginMonthYear
  }
  public OnChangeBeginYearInView() {
    this.mBeginYear = this.view.GetBeginYear()
    this.model.BeginYear = this.mBeginYear
  }
  public OnChangeBeginDecadeDecadeInView() {
    this.mBeginDecadeDecade = this.view.GetBeginDecadeDecade()
    this.model.BeginDecadeDecade = this.mBeginDecadeDecade
  }
  public OnChangeBeginDecadeCenturyInView() {
    this.mBeginDecadeCentury = this.view.GetBeginDecadeCentury()
    this.model.BeginDecadeCentury = this.mBeginDecadeCentury
  }
  public OnChangeBeginCenturyInView() {
    this.mBeginCentury = this.view.GetBeginCentury()
    this.model.BeginCentury = this.mBeginCentury
  }

  public OnChangeEndTypeInView() {
    this.mEndType = this.view.GetEndType()
    this.model.EndType = this.mEndType
  }
  public OnChangeEndDayDayInView() {
    this.mEndDayDay = this.view.GetEndDayDay()
    this.model.EndDayDay = this.mEndDayDay
  }
  public OnChangeEndDayMonthInView() {
    this.mEndDayMonth = this.view.GetEndDayMonth()
    this.model.EndDayMonth = this.mEndDayMonth
  }
  public OnChangeEndDayYearInView() {
    this.mEndDayYear = this.view.GetEndDayYear()
    this.model.EndDayYear = this.mEndDayYear
  }
  public OnChangeEndMonthMonthInView() {
    this.mEndMonthMonth = this.view.GetEndMonthMonth()
    this.model.EndMonthMonth = this.mEndMonthMonth
  }
  public OnChangeEndMonthYearInView() {
    this.mEndMonthYear = this.view.GetEndMonthYear()
    this.model.EndMonthYear = this.mEndMonthYear
  }
  public OnChangeEndYearInView() {
    this.mEndYear = this.view.GetEndYear()
    this.model.EndYear = this.mEndYear
  }
  public OnChangeEndDecadeDecadeInView() {
    this.mEndDecadeDecade = this.view.GetEndDecadeDecade()
    this.model.EndDecadeDecade = this.mEndDecadeDecade
  }
  public OnChangeEndDecadeCenturyInView() {
    this.mEndDecadeCentury = this.view.GetEndDecadeCentury()
    this.model.EndDecadeCentury = this.mEndDecadeCentury
  }
  public OnChangeEndCenturyInView() {
    this.mEndCentury = this.view.GetEndCentury()
    this.model.EndCentury = this.mEndCentury
  }
}