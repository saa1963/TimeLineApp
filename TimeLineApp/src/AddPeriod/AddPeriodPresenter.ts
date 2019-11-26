import { AddPeriodModel } from "./AddPeriodModel"
import { IAddPeriodView } from "./IAddPeriodView"
import { EnumPeriod } from "../TLEvent"

export class AddPeriodPresenter {
  private model: AddPeriodModel
  private view: IAddPeriodView
  private m_Name: string
  private m_IsPeriod: boolean
  private m_Begin_Type: EnumPeriod
  private m_Begin_DayDay: number
  private m_Begin_DayMonth: number
  private m_Begin_DayYear: number
  private m_Begin_MonthMonth: number
  private m_Begin_MonthYear: number
  private m_Begin_Year: number
  private m_Begin_DecadeDecade: number
  private m_Begin_DecadeCentury: number
  private m_Begin_Century: number
  private m_End_Type: number
  private m_End_DayDay: number
  private m_End_DayMonth: number
  private m_End_DayYear: number
  private m_End_MonthMonth: number
  private m_End_MonthYear: number
  private m_End_Year: number
  private m_End_DecadeDecade: number
  private m_End_DecadeCentury: number
  private m_End_Century: number

  constructor(view: IAddPeriodView, model: AddPeriodModel) {
    this.model = model
    this.view = view
    this.model.evChangeName.subscribe((value) => {
      if (value !== this.m_Name) {
        this.view.SetName(value)
      }
    })
    this.model.evChangeIsPeriod.subscribe((value) => {
      if (value !== this.m_IsPeriod) {
        this.view.SetIsPeriod(value)
      }
    })
    this.model.evChangeBeginType.subscribe((value) => {
      if (value !== this.m_Begin_Type) {
        this.view.SetBeginType(value)
      }
    })
    this.model.evChangeBegin_DayDay.subscribe((value) => {
      if (value !== this.m_Begin_DayDay) {
        this.view.SetBegin_DayDay(value)
      }
    })
    this.model.evChangeBegin_DayMonth.subscribe((value) => {
      if (value !== this.m_Begin_DayMonth) {
        this.view.SetBegin_DayMonth(value)
      }
    })
    this.model.evChangeBegin_DayYear.subscribe((value) => {
      if (value !== this.m_Begin_DayYear) {
        this.view.SetBegin_DayYear(value)
      }
    })
    this.model.evChangeBegin_MonthMonth.subscribe((value) => {
      if (value !== this.m_Begin_MonthMonth) {
        this.view.SetBegin_MonthMonth(value)
      }
    })
    this.model.evChangeBegin_MonthYear.subscribe((value) => {
      if (value !== this.m_Begin_MonthYear) {
        this.view.SetBegin_MonthYear(value)
      }
    })
    this.model.evChangeBegin_Year.subscribe((value) => {
      if (value !== this.m_Begin_Year) {
        this.view.SetBegin_Year(value)
      }
    })
    this.model.evChangeBegin_DecadeDecade.subscribe((value) => {
      if (value !== this.m_Begin_DecadeDecade) {
        this.view.SetBegin_DecadeDecade(value)
      }
    })
    this.model.evChangeBegin_DecadeCentury.subscribe((value) => {
      if (value !== this.m_Begin_DecadeCentury) {
        this.view.SetBegin_DecadeCentury(value)
      }
    })
    this.model.evChangeBegin_Century.subscribe((value) => {
      if (value !== this.m_Begin_Century) {
        this.view.SetBegin_Century(value)
      }
    })

    this.model.evChangeEndType.subscribe((value) => {
      if (value !== this.m_End_Type) {
        this.view.SetEndType(value)
      }
    })
    this.model.evChangeEnd_DayDay.subscribe((value) => {
      if (value !== this.m_End_DayDay) {
        this.view.SetEnd_DayDay(value)
      }
    })
    this.model.evChangeEnd_DayDay.subscribe((value) => {
      if (value !== this.m_End_DayDay) {
        this.view.SetEnd_DayDay(value)
      }
    })
    this.model.evChangeEnd_DayMonth.subscribe((value) => {
      if (value !== this.m_End_DayMonth) {
        this.view.SetEnd_DayMonth(value)
      }
    })
    this.model.evChangeEnd_DayYear.subscribe((value) => {
      if (value !== this.m_End_DayYear) {
        this.view.SetEnd_DayYear(value)
      }
    })
    this.model.evChangeEnd_MonthMonth.subscribe((value) => {
      if (value !== this.m_End_MonthMonth) {
        this.view.SetEnd_MonthMonth(value)
      }
    })
    this.model.evChangeEnd_MonthYear.subscribe((value) => {
      if (value !== this.m_End_MonthYear) {
        this.view.SetEnd_MonthYear(value)
      }
    })
    this.model.evChangeEnd_Year.subscribe((value) => {
      if (value !== this.m_End_Year) {
        this.view.SetEnd_Year(value)
      }
    })
    this.model.evChangeEnd_DecadeDecade.subscribe((value) => {
      if (value !== this.m_End_DecadeDecade) {
        this.view.SetEnd_DecadeDecade(value)
      }
    })
    this.model.evChangeEnd_DecadeCentury.subscribe((value) => {
      if (value !== this.m_End_DecadeCentury) {
        this.view.SetEnd_DecadeCentury(value)
      }
    })
    this.model.evChangeEnd_Century.subscribe((value) => {
      if (value !== this.m_End_Century) {
        this.view.SetEnd_Century(value)
      }
    })

    this.m_Name = model.Name
    this.m_IsPeriod = model.IsPeriod
    this.m_Begin_Type = model.BeginType
    this.m_Begin_DayDay = model.Begin_DayDay
    this.m_Begin_DayMonth = model.Begin_DayMonth
    this.m_Begin_DayYear = model.Begin_DayYear
    this.m_Begin_MonthMonth = model.Begin_MonthMonth
    this.m_Begin_MonthYear = model.Begin_MonthYear
    this.m_Begin_Year = model.Begin_Year
    this.m_Begin_DecadeDecade = model.Begin_DecadeDecade
    this.m_Begin_DecadeCentury = model.Begin_DecadeCentury
    this.m_Begin_Century = model.Begin_Century
    this.m_End_Type = model.EndType
    this.m_End_DayDay = model.End_DayDay
    this.m_End_DayMonth = model.End_DayMonth
    this.m_End_DayYear = model.End_DayYear
    this.m_End_MonthMonth = model.End_MonthMonth
    this.m_End_MonthYear = model.End_MonthYear
    this.m_End_Year = model.End_Year
    this.m_End_DecadeDecade = model.End_DecadeDecade
    this.m_End_DecadeCentury = model.End_DecadeCentury
    this.m_End_Century = model.End_Century
    this.view.SetName(model.Name)
    this.view.SetBeginType(model.BeginType)
    this.view.SetIsPeriod(model.IsPeriod)
    this.view.SetBegin_DayDay(model.Begin_DayDay)
    this.view.SetBegin_DayMonth(model.Begin_DayMonth)
    this.view.SetBegin_DayYear(model.Begin_DayYear)
    this.view.SetBegin_MonthMonth(model.Begin_MonthMonth)
    this.view.SetBegin_MonthYear(model.Begin_MonthYear)
    this.view.SetBegin_Year(model.Begin_Year)
    this.view.SetBegin_DecadeDecade(model.Begin_DecadeDecade)
    this.view.SetBegin_DecadeCentury(model.Begin_DecadeCentury)
    this.view.SetBegin_Century(model.Begin_Century)
    this.view.SetEndType(model.EndType)
    this.view.SetEnd_DayDay(model.End_DayDay)
    this.view.SetEnd_DayMonth(model.End_DayMonth)
    this.view.SetEnd_DayYear(model.End_DayYear)
    this.view.SetEnd_MonthMonth(model.End_MonthMonth)
    this.view.SetEnd_MonthYear(model.End_MonthYear)
    this.view.SetEnd_Year(model.End_Year)
    this.view.SetEnd_DecadeDecade(model.End_DecadeDecade)
    this.view.SetEnd_DecadeCentury(model.End_DecadeCentury)
    this.view.SetEnd_Century(model.End_Century)
  }

  // обработчики вызовов из View
  public OnChangeNameInView() {
    this.m_Name = this.view.GetName()
    this.model.Name = this.m_Name
  }
  public OnChangeIsPeriodInView() {
    this.m_IsPeriod = this.view.GetIsPeriod()
    this.model.IsPeriod = this.m_IsPeriod
  }
  public OnChangeBegin_TypeInView() {
    this.m_Begin_Type = this.view.GetBeginType()
    this.model.BeginType = this.m_Begin_Type
  }
  public OnChangeBegin_DayDayInView() {
    this.m_Begin_DayDay = this.view.GetBegin_DayDay()
    this.model.Begin_DayDay = this.m_Begin_DayDay
  }
  public OnChangeBegin_DayMonthInView() {
    this.m_Begin_DayMonth = this.view.GetBegin_DayMonth()
    this.model.Begin_DayMonth = this.m_Begin_DayMonth
  }
  public OnChangeBegin_DayYearInView() {
    this.m_Begin_DayYear = this.view.GetBegin_DayYear()
    this.model.Begin_DayYear = this.m_Begin_DayYear
  }
  public OnChangeBegin_MonthMonthInView() {
    this.m_Begin_MonthMonth = this.view.GetBegin_MonthMonth()
    this.model.Begin_MonthMonth = this.m_Begin_MonthMonth
  }
  public OnChangeBegin_MonthYearInView() {
    this.m_Begin_MonthYear = this.view.GetBegin_MonthYear()
    this.model.Begin_MonthYear = this.m_Begin_MonthYear
  }
  public OnChangeBegin_YearInView() {
    this.m_Begin_Year = this.view.GetBegin_Year()
    this.model.Begin_Year = this.m_Begin_Year
  }
  public OnChangeBegin_DecadeDecadeInView() {
    this.m_Begin_DecadeDecade = this.view.GetBegin_DecadeDecade()
    this.model.Begin_DecadeDecade = this.m_Begin_DecadeDecade
  }
  public OnChangeBegin_DecadeCenturyInView() {
    this.m_Begin_DecadeCentury = this.view.GetBegin_DecadeCentury()
    this.model.Begin_DecadeCentury = this.m_Begin_DecadeCentury
  }
  public OnChangeBegin_CenturyInView() {
    this.m_Begin_Century = this.view.GetBegin_Century()
    this.model.Begin_Century = this.m_Begin_Century
  }

  public OnChangeEnd_TypeInView() {
    this.m_End_Type = this.view.GetEndType()
    this.model.EndType = this.m_End_Type
  }
  public OnChangeEnd_DayDayInView() {
    this.m_End_DayDay = this.view.GetEnd_DayDay()
    this.model.End_DayDay = this.m_End_DayDay
  }
  public OnChangeEnd_DayMonthInView() {
    this.m_End_DayMonth = this.view.GetEnd_DayMonth()
    this.model.End_DayMonth = this.m_End_DayMonth
  }
  public OnChangeEnd_DayYearInView() {
    this.m_End_DayYear = this.view.GetEnd_DayYear()
    this.model.End_DayYear = this.m_End_DayYear
  }
  public OnChangeEnd_MonthMonthInView() {
    this.m_End_MonthMonth = this.view.GetEnd_MonthMonth()
    this.model.End_MonthMonth = this.m_End_MonthMonth
  }
  public OnChangeEnd_MonthYearInView() {
    this.m_End_MonthYear = this.view.GetEnd_MonthYear()
    this.model.End_MonthYear = this.m_End_MonthYear
  }
  public OnChangeEnd_YearInView() {
    this.m_End_Year = this.view.GetEnd_Year()
    this.model.End_Year = this.m_End_Year
  }
  public OnChangeEnd_DecadeDecadeInView() {
    this.m_End_DecadeDecade = this.view.GetEnd_DecadeDecade()
    this.model.End_DecadeDecade = this.m_End_DecadeDecade
  }
  public OnChangeEnd_DecadeCenturyInView() {
    this.m_End_DecadeCentury = this.view.GetEnd_DecadeCentury()
    this.model.End_DecadeCentury = this.m_End_DecadeCentury
  }
  public OnChangeEnd_CenturyInView() {
    this.m_End_Century = this.view.GetEnd_Century()
    this.model.End_Century = this.m_End_Century
  }
}