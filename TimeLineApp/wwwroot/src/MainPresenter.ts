import {TimeLinePresenter} from "./TimeLinePresenter"
import { TimeLineData } from "./TimeLineModel";
import { EnumPeriod } from "./TLEvent";
import { LiteEvent } from "./LightEvent";
import { MainView } from "./MainView";

export class MainPresenter {
  // само событие
  private readonly onChangePeriod = new LiteEvent<EnumPeriod>();
  // свойство для доступа к событию
  public get ChangePeriod() { return this.onChangePeriod.expose(); }

  private m_Period: EnumPeriod = EnumPeriod.day
  public get Period() {
    return this.m_Period
  }
  public set Period(value: EnumPeriod) {
    if (this.m_Period !== value) {
      this.m_Period = value
      this.onChangePeriod.trigger(value)
    }
  }
  public TimeLinePresenters: TimeLinePresenter[]

  constructor(view: MainView) {
    this.TimeLinePresenters = []
  }
}