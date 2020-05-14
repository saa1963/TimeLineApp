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

  private mBeginYear
  public get BeginYear(): number { return this.mBeginYear; }
  public set BeginYear(value: number) {
    if (value !== this.mBeginYear) {
      this.mBeginYear = value
      this.e_ChangeBegin_Year.dispatch(value)
    }
  }

  private mBeginDecadeDecade
  public get BeginDecadeDecade(): number { return this.mBeginDecadeDecade; }
  public set BeginDecadeDecade(value: number) {
    if (value !== this.mBeginDecadeDecade) {
      this.mBeginDecadeDecade = value
      this.e_ChangeBegin_DecadeDecade.dispatch(value)
    }
  }

  private mBeginDecadeCentury
  public get BeginDecadeCentury(): number { return this.mBeginDecadeCentury; }
  public set BeginDecadeCentury(value: number) {
    if (value !== this.mBeginDecadeCentury) {
      this.mBeginDecadeCentury = value
      this.e_ChangeBegin_DecadeCentury.dispatch(value)
    }
  }

  private mBeginCentury
  public get BeginCentury(): number { return this.mBeginCentury; }
  public set BeginCentury(value: number) {
    if (value !== this.mBeginCentury) {
      this.mBeginCentury = value
      this.e_ChangeBegin_Century.dispatch(value)
    }
  }

  private mEndType: EnumPeriod
  public get EndType(): EnumPeriod { return this.mEndType; }
  public set EndType(value: EnumPeriod) {
    if (value !== this.mEndType) {
      this.mEndType = value
      this.e_ChangeEndType.dispatch(value)
    }
  }

  private mEndDayDay: number
  public get EndDayDay(): number { return this.mEndDayDay; }
  public set EndDayDay(value: number) {
    if (value !== this.mEndDayDay) {
      this.mEndDayDay = value
      this.e_ChangeEnd_DayDay.dispatch(value)
    }
  }

  private mEndDayMonth: number
  public get EndDayMonth(): number { return this.mEndDayMonth; }
  public set EndDayMonth(value: number) {
    if (value !== this.mEndDayMonth) {
      this.mEndDayMonth = value
      this.e_ChangeEnd_DayMonth.dispatch(value)
    }
  }

  private mEndDayYear: number
  public get EndDayYear(): number { return this.mEndDayYear; }
  public set EndDayYear(value: number) {
    if (value !== this.mEndDayYear) {
      this.mEndDayYear = value
      this.e_ChangeEnd_DayYear.dispatch(value)
    }
  }

  private mEndMonthMonth: number
  public get EndMonthMonth(): number { return this.mEndMonthMonth; }
  public set EndMonthMonth(value: number) {
    if (value !== this.mEndMonthMonth) {
      this.mEndMonthMonth = value
      this.e_ChangeEnd_MonthMonth.dispatch(value)
    }
  }

  private mEndMonthYear: number
  public get EndMonthYear(): number { return this.mEndMonthYear; }
  public set EndMonthYear(value: number) {
    if (value !== this.mEndMonthYear) {
      this.mEndMonthYear = value
      this.e_ChangeEnd_MonthYear.dispatch(value)
    }
  }

  private mEndYear
  public get EndYear(): number { return this.mEndYear; }
  public set EndYear(value: number) {
    if (value !== this.mEndYear) {
      this.mEndYear = value
      this.e_ChangeEnd_Year.dispatch(value)
    }
  }

  private mEndDecadeDecade
  public get EndDecadeDecade(): number { return this.mEndDecadeDecade; }
  public set EndDecadeDecade(value: number) {
    if (value !== this.mEndDecadeDecade) {
      this.mEndDecadeDecade = value
      this.e_ChangeEnd_DecadeDecade.dispatch(value)
    }
  }

  private mEndDecadeCentury
  public get EndDecadeCentury(): number { return this.mEndDecadeCentury; }
  public set EndDecadeCentury(value: number) {
    if (value !== this.mEndDecadeCentury) {
      this.mEndDecadeCentury = value
      this.e_ChangeEnd_DecadeCentury.dispatch(value)
    }
  }

  private mEndCentury
  public get EndCentury(): number { return this.mEndCentury; }
  public set EndCentury(value: number) {
    if (value !== this.mEndCentury) {
      this.mEndCentury = value
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
  public get evChangeBeginDayDay(): ISimpleEvent<number> {
    return this.e_ChangeBegin_DayDay.asEvent();
  }
  private e_ChangeBegin_DayMonth = new SimpleEventDispatcher<number>();
  public get evChangeBeginDayMonth(): ISimpleEvent<number> {
    return this.e_ChangeBegin_DayMonth.asEvent();
  }
  private e_ChangeBegin_DayYear = new SimpleEventDispatcher<number>();
  public get evChangeBeginDayYear(): ISimpleEvent<number> {
    return this.e_ChangeBegin_DayYear.asEvent();
  }
  private e_ChangeBegin_MonthMonth = new SimpleEventDispatcher<number>();
  public get evChangeBeginMonthMonth(): ISimpleEvent<number> {
    return this.e_ChangeBegin_MonthMonth.asEvent();
  }
  private e_ChangeBegin_MonthYear = new SimpleEventDispatcher<number>();
  public get evChangeBeginMonthYear(): ISimpleEvent<number> {
    return this.e_ChangeBegin_MonthYear.asEvent();
  }
  private e_ChangeBegin_Year = new SimpleEventDispatcher<number>();
  public get evChangeBeginYear(): ISimpleEvent<number> {
    return this.e_ChangeBegin_Year.asEvent();
  }
  private e_ChangeBegin_DecadeDecade = new SimpleEventDispatcher<number>();
  public get evChangeBeginDecadeDecade(): ISimpleEvent<number> {
    return this.e_ChangeBegin_DecadeDecade.asEvent();
  }
  private e_ChangeBegin_DecadeCentury = new SimpleEventDispatcher<number>();
  public get evChangeBeginDecadeCentury(): ISimpleEvent<number> {
    return this.e_ChangeBegin_DecadeCentury.asEvent();
  }
  private e_ChangeBegin_Century = new SimpleEventDispatcher<number>();
  public get evChangeBeginCentury(): ISimpleEvent<number> {
    return this.e_ChangeBegin_Century.asEvent();
  }

  private e_ChangeEndType = new SimpleEventDispatcher<EnumPeriod>();
  public get evChangeEndType(): ISimpleEvent<EnumPeriod> {
    return this.e_ChangeEndType.asEvent();
  }
  private e_ChangeEnd_DayDay = new SimpleEventDispatcher<number>();
  public get evChangeEndDayDay(): ISimpleEvent<number> {
    return this.e_ChangeEnd_DayDay.asEvent();
  }
  private e_ChangeEnd_DayMonth = new SimpleEventDispatcher<number>();
  public get evChangeEndDayMonth(): ISimpleEvent<number> {
    return this.e_ChangeEnd_DayMonth.asEvent();
  }
  private e_ChangeEnd_DayYear = new SimpleEventDispatcher<number>();
  public get evChangeEndDayYear(): ISimpleEvent<number> {
    return this.e_ChangeEnd_DayYear.asEvent();
  }
  private e_ChangeEnd_MonthMonth = new SimpleEventDispatcher<number>();
  public get evChangeEndMonthMonth(): ISimpleEvent<number> {
    return this.e_ChangeEnd_MonthMonth.asEvent();
  }
  private e_ChangeEnd_MonthYear = new SimpleEventDispatcher<number>();
  public get evChangeEndMonthYear(): ISimpleEvent<number> {
    return this.e_ChangeEnd_MonthYear.asEvent();
  }
  private e_ChangeEnd_Year = new SimpleEventDispatcher<number>();
  public get evChangeEndYear(): ISimpleEvent<number> {
    return this.e_ChangeEnd_Year.asEvent();
  }
  private e_ChangeEnd_DecadeDecade = new SimpleEventDispatcher<number>();
  public get evChangeEndDecadeDecade(): ISimpleEvent<number> {
    return this.e_ChangeEnd_DecadeDecade.asEvent();
  }
  private e_ChangeEnd_DecadeCentury = new SimpleEventDispatcher<number>();
  public get evChangeEndDecadeCentury(): ISimpleEvent<number> {
    return this.e_ChangeEnd_DecadeCentury.asEvent();
  }
  private e_ChangeEnd_Century = new SimpleEventDispatcher<number>();
  public get evChangeEndCentury(): ISimpleEvent<number> {
    return this.e_ChangeEnd_Century.asEvent();
  }
}