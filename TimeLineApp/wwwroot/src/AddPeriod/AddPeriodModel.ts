import { EnumPeriod } from "../TLEvent"
import { SimpleEventDispatcher, ISimpleEvent } from "ste-simple-events"

export class AddPeriodModel {
  private m_Name: string
  public get Name(): string { return this.m_Name; }
  public set Name(value: string){
    if (value !== this.m_Name) {
      this.m_Name = value
      this.e_ChangeName.dispatch(value)
    }
  }

  private m_IsPeriod: boolean
  public get IsPeriod(): boolean { return this.m_IsPeriod; }
  public set IsPeriod(value: boolean) {
    if (value !== this.m_IsPeriod) {
      this.m_IsPeriod = value
      this.e_ChangeIsPeriod.dispatch(value)
    }
  }
  private m_BeginType: EnumPeriod
  public get BeginType(): EnumPeriod { return this.m_BeginType; }
  public set IsBeginType(value: EnumPeriod) {
    if (value !== this.m_BeginType) {
      this.m_BeginType = value
      this.e_ChangeBeginType.dispatch(value)
    }
  }

  private m_Begin_DayDay: number
  public get Begin_DayDay(): number { return this.m_Begin_DayDay; }
  public set Begin_DayDay(value: number) {
    if (value !== this.m_Begin_DayDay) {
      this.m_Begin_DayDay = value
      this.e_ChangeBegin_DayDay.dispatch(value)
    }
  }

  private m_Begin_DayMonth: number
  public get Begin_DayMonth(): number { return this.m_Begin_DayMonth; }
  public set Begin_DayMonth(value: number) {
    if (value !== this.m_Begin_DayMonth) {
      this.m_Begin_DayMonth = value
      this.e_ChangeBegin_DayMonth.dispatch(value)
    }
  }

  private m_Begin_DayYear: number
  public get Begin_DayYear(): number { return this.m_Begin_DayYear; }
  public set Begin_DayYear(value: number) {
    if (value !== this.m_Begin_DayYear) {
      this.m_Begin_DayYear = value
      this.e_ChangeBegin_DayYear.dispatch(value)
    }
  }

  private m_Begin_MonthMonth: number
  public get Begin_MonthMonth(): number { return this.m_Begin_MonthMonth; }
  public set Begin_MonthMonth(value: number) {
    if (value !== this.m_Begin_MonthMonth) {
      this.m_Begin_MonthMonth = value
      this.e_ChangeBegin_MonthMonth.dispatch(value)
    }
  }

  private m_Begin_MonthYear: number
  public set Begin_MonthYear(value: number) {
    if (value !== this.m_Begin_MonthYear) {
      this.m_Begin_MonthYear = value
      this.e_ChangeBegin_MonthYear.dispatch(value)
    }
  }

  private m_Begin_Year
  public set Begin_Year(value: number) {
    if (value !== this.m_Begin_Year) {
      this.m_Begin_Year = value
      this.e_ChangeBegin_Year.dispatch(value)
    }
  }

  private m_EndType: EnumPeriod
  public get EndType(): EnumPeriod { return this.m_EndType; }
  public set IsEndType(value: EnumPeriod) {
    if (value !== this.m_EndType) {
      this.m_EndType = value
      this.e_ChangeEndType.dispatch(value)
    }
  }

  private m_End_DayDay: number
  public get End_DayDay(): number { return this.m_End_DayDay; }
  public set End_DayDay(value: number) {
    if (value !== this.m_End_DayDay) {
      this.m_End_DayDay = value
      this.e_ChangeEnd_DayDay.dispatch(value)
    }
  }

  private m_End_DayMonth: number
  public get End_DayMonth(): number { return this.m_End_DayMonth; }
  public set End_DayMonth(value: number) {
    if (value !== this.m_End_DayMonth) {
      this.m_End_DayMonth = value
      this.e_ChangeEnd_DayMonth.dispatch(value)
    }
  }

  private m_End_DayYear: number
  public get End_DayYear(): number { return this.m_End_DayYear; }
  public set End_DayYear(value: number) {
    if (value !== this.m_End_DayYear) {
      this.m_End_DayYear = value
      this.e_ChangeEnd_DayYear.dispatch(value)
    }
  }

  private m_End_MonthMonth: number
  public get End_MonthMonth(): number { return this.m_End_MonthMonth; }
  public set End_MonthMonth(value: number) {
    if (value !== this.m_End_MonthMonth) {
      this.m_End_MonthMonth = value
      this.e_ChangeEnd_MonthMonth.dispatch(value)
    }
  }

  private m_End_MonthYear: number
  public set End_MonthYear(value: number) {
    if (value !== this.m_End_MonthYear) {
      this.m_End_MonthYear = value
      this.e_ChangeEnd_MonthYear.dispatch(value)
    }
  }

  private m_End_Year
  public set End_Year(value: number) {
    if (value !== this.m_End_Year) {
      this.m_End_Year = value
      this.e_ChangeEnd_Year.dispatch(value)
    }
  }

  private e_ChangeName = new SimpleEventDispatcher<string>();
  public get evChangeName(): ISimpleEvent<string> {
    return this.e_ChangeName.asEvent();
  }
  private e_ChangeIsPeriod = new SimpleEventDispatcher<boolean>();
  public get evChangeIsPeriod(): ISimpleEvent<boolean> {
    return this.e_ChangeIsPeriod.asEvent();
  }
  private e_ChangeBeginType = new SimpleEventDispatcher<EnumPeriod>();
  public get evChangeBeginType(): ISimpleEvent<EnumPeriod> {
    return this.e_ChangeBeginType.asEvent();
  }
  private e_ChangeBegin_DayDay = new SimpleEventDispatcher<number>();
  public get evChangeBegin_DayDay(): ISimpleEvent<number> {
    return this.e_ChangeBegin_DayDay.asEvent();
  }
  private e_ChangeBegin_DayMonth = new SimpleEventDispatcher<number>();
  public get evChangeBegin_DayMonth(): ISimpleEvent<number> {
    return this.e_ChangeBegin_DayMonth.asEvent();
  }
  private e_ChangeBegin_DayYear = new SimpleEventDispatcher<number>();
  public get evChangeBegin_DayYear(): ISimpleEvent<number> {
    return this.e_ChangeBegin_DayYear.asEvent();
  }
  private e_ChangeBegin_MonthMonth = new SimpleEventDispatcher<number>();
  public get evChangeBegin_MonthMonth(): ISimpleEvent<number> {
    return this.e_ChangeBegin_MonthMonth.asEvent();
  }
  private e_ChangeBegin_MonthYear = new SimpleEventDispatcher<number>();
  public get evChangeBegin_MonthYear(): ISimpleEvent<number> {
    return this.e_ChangeBegin_MonthYear.asEvent();
  }
  private e_ChangeBegin_Year = new SimpleEventDispatcher<number>();
  public get evChangeBegin_Year(): ISimpleEvent<number> {
    return this.e_ChangeBegin_Year.asEvent();
  }

  private e_ChangeEndType = new SimpleEventDispatcher<EnumPeriod>();
  public get evChangeEndType(): ISimpleEvent<EnumPeriod> {
    return this.e_ChangeEndType.asEvent();
  }
  private e_ChangeEnd_DayDay = new SimpleEventDispatcher<number>();
  public get evChangeEnd_DayDay(): ISimpleEvent<number> {
    return this.e_ChangeEnd_DayDay.asEvent();
  }
  private e_ChangeEnd_DayMonth = new SimpleEventDispatcher<number>();
  public get evChangeEnd_DayMonth(): ISimpleEvent<number> {
    return this.e_ChangeEnd_DayMonth.asEvent();
  }
  private e_ChangeEnd_DayYear = new SimpleEventDispatcher<number>();
  public get evChangeEnd_DayYear(): ISimpleEvent<number> {
    return this.e_ChangeEnd_DayYear.asEvent();
  }
  private e_ChangeEnd_MonthMonth = new SimpleEventDispatcher<number>();
  public get evChangeEnd_MonthMonth(): ISimpleEvent<number> {
    return this.e_ChangeEnd_MonthMonth.asEvent();
  }
  private e_ChangeEnd_MonthYear = new SimpleEventDispatcher<number>();
  public get evChangeEnd_MonthYear(): ISimpleEvent<number> {
    return this.e_ChangeEnd_MonthYear.asEvent();
  }
  private e_ChangeEnd_Year = new SimpleEventDispatcher<number>();
  public get evChangeEnd_Year(): ISimpleEvent<number> {
    return this.e_ChangeEnd_Year.asEvent();
  }
}