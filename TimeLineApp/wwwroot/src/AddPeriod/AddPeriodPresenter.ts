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

    this.m_Login = model.Login
    this.m_Password = model.Password
    this.view.SetLogin(model.Login)
    this.view.SetPassword(model.Password)
  }

  // обработчики вызовов из View
  public OnChangeNameInView() {
    this.m_Name = this.view.GetLogin()
    this.model.Name = this.m_Login
  }
  public OnChangePasswordInView() {
    this.m_Password = this.view.GetPassword()
    this.model.Password = this.m_Password
  }
}