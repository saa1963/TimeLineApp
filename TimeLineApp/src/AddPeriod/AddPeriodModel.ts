import { EnumPeriod } from "../TLEvent"
import { SimpleEventDispatcher, ISimpleEvent } from "ste-simple-events"

export class AddPeriodModel {
  private mName: string
  public get Name(): string { return this.mName; }
  public set Name(value: string){
    if (value !== this.mName) {
      this.mName = value
      this.e_ChangeName.dispatch(value)
    }
  }

  private mIsPeriod: boolean
  public get IsPeriod(): boolean { return this.mIsPeriod; }
  public set IsPeriod(value: boolean) {
    if (value !== this.mIsPeriod) {
      this.mIsPeriod = value
      this.e_ChangeIsPeriod.dispatch(value)
    }
  }
  private mBeginType: EnumPeriod
  public get BeginType(): EnumPeriod { return this.mBeginType; }
  public set BeginType(value: EnumPeriod) {
    if (value !== this.mBeginType) {
      this.mBeginType = value
      this.e_ChangeBeginType.dispatch(value)
    }
  }

  private mBeginDayDay: number
  public get BeginDayDay(): number { return this.mBeginDayDay;   }
  public set BeginDayDay(value: number) {
    if (value !== this.mBeginDayDay) {
      this.mBeginDayDay = value
      this.e_ChangeBegin_DayDay.dispatch(value)
    }
  }

  private mBeginDayMonth: number
  public get BeginDayMonth(): number { return this.mBeginDayMonth; }
  public set BeginDayMonth(value: number) {
    if (value !== this.mBeginDayMonth) {
      this.mBeginDayMonth = value
      this.e_ChangeBegin_DayMonth.dispatch(value)
    }
  }

  private mBeginDayYear: number
  public get BeginDayYear(): number { return this.mBeginDayYear; }
  public set BeginDayYear(value: number) {
    if (value !== this.mBeginDayYear) {
      this.mBeginDayYear = value
      this.e_ChangeBegin_DayYear.dispatch(value)
    }
  }

  private mBeginMonthMonth: number
  public get BeginMonthMonth(): number { return this.mBeginMonthMonth; }
  public set BeginMonthMonth(value: number) {
    if (value !== this.mBeginMonthMonth) {
      this.mBeginMonthMonth = value
      this.e_ChangeBegin_MonthMonth.dispatch(value)
    }
  }

  private mBeginMonthYear: number
  public get BeginMonthYear(): number { return this.mBeginMonthYear; }
  public set BeginMonthYear(value: number) {
    if (value !== this.mBeginMonthYear) {
      this.mBeginMonthYear = value
      this.e_ChangeBegin_MonthYear.dispatch(value)
    }
  }

  private m_Begin_Year
  public get Begin_Year(): number { return this.m_Begin_Year; }
  public set Begin_Year(value: number) {
    if (value !== this.m_Begin_Year) {
      this.m_Begin_Year = value
      this.e_ChangeBegin_Year.dispatch(value)
    }
  }

  private m_Begin_DecadeDecade
  public get Begin_DecadeDecade(): number { return this.m_Begin_DecadeDecade; }
  public set Begin_DecadeDecade(value: number) {
    if (value !== this.m_Begin_DecadeDecade) {
      this.m_Begin_DecadeDecade = value
      this.e_ChangeBegin_DecadeDecade.dispatch(value)
    }
  }

  private m_Begin_DecadeCentury
  public get Begin_DecadeCentury(): number { return this.m_Begin_DecadeCentury; }
  public set Begin_DecadeCentury(value: number) {
    if (value !== this.m_Begin_DecadeCentury) {
      this.m_Begin_DecadeCentury = value
      this.e_ChangeBegin_DecadeCentury.dispatch(value)
    }
  }

  private m_Begin_Century
  public get Begin_Century(): number { return this.m_Begin_Century; }
  public set Begin_Century(value: number) {
    if (value !== this.m_Begin_Century) {
      this.m_Begin_Century = value
      this.e_ChangeBegin_Century.dispatch(value)
    }
  }

  private m_EndType: EnumPeriod
  public get EndType(): EnumPeriod { return this.m_EndType; }
  public set EndType(value: EnumPeriod) {
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
  public get End_MonthYear(): number { return this.m_End_MonthYear; }
  public set End_MonthYear(value: number) {
    if (value !== this.m_End_MonthYear) {
      this.m_End_MonthYear = value
      this.e_ChangeEnd_MonthYear.dispatch(value)
    }
  }

  private m_End_Year
  public get End_Year(): number { return this.m_End_Year; }
  public set End_Year(value: number) {
    if (value !== this.m_End_Year) {
      this.m_End_Year = value
      this.e_ChangeEnd_Year.dispatch(value)
    }
  }

  private m_End_DecadeDecade
  public get End_DecadeDecade(): number { return this.m_End_DecadeDecade; }
  public set End_DecadeDecade(value: number) {
    if (value !== this.m_End_DecadeDecade) {
      this.m_End_DecadeDecade = value
      this.e_ChangeEnd_DecadeDecade.dispatch(value)
    }
  }

  private m_End_DecadeCentury
  public get End_DecadeCentury(): number { return this.m_End_DecadeCentury; }
  public set End_DecadeCentury(value: number) {
    if (value !== this.m_End_DecadeCentury) {
      this.m_End_DecadeCentury = value
      this.e_ChangeEnd_DecadeCentury.dispatch(value)
    }
  }

  private m_End_Century
  public get End_Century(): number { return this.m_End_Century; }
  public set End_Century(value: number) {
    if (value !== this.m_End_Century) {
      this.m_End_Century = value
      this.e_ChangeEnd_Century.dispatch(value)
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
  private e_ChangeBegin_DecadeDecade = new SimpleEventDispatcher<number>();
  public get evChangeBegin_DecadeDecade(): ISimpleEvent<number> {
    return this.e_ChangeBegin_DecadeDecade.asEvent();
  }
  private e_ChangeBegin_DecadeCentury = new SimpleEventDispatcher<number>();
  public get evChangeBegin_DecadeCentury(): ISimpleEvent<number> {
    return this.e_ChangeBegin_DecadeCentury.asEvent();
  }
  private e_ChangeBegin_Century = new SimpleEventDispatcher<number>();
  public get evChangeBegin_Century(): ISimpleEvent<number> {
    return this.e_ChangeBegin_Century.asEvent();
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
  private e_ChangeEnd_DecadeDecade = new SimpleEventDispatcher<number>();
  public get evChangeEnd_DecadeDecade(): ISimpleEvent<number> {
    return this.e_ChangeEnd_DecadeDecade.asEvent();
  }
  private e_ChangeEnd_DecadeCentury = new SimpleEventDispatcher<number>();
  public get evChangeEnd_DecadeCentury(): ISimpleEvent<number> {
    return this.e_ChangeEnd_DecadeCentury.asEvent();
  }
  private e_ChangeEnd_Century = new SimpleEventDispatcher<number>();
  public get evChangeEnd_Century(): ISimpleEvent<number> {
    return this.e_ChangeEnd_Century.asEvent();
  }
}