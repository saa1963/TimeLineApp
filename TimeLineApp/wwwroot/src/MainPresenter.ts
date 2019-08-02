import {TimeLinePresenter} from "./TimeLinePresenter"
import { TimeLineModel } from "./TimeLineModel";
import { EnumPeriod } from "./TLEvent";
import { LiteEvent } from "./LightEvent";
import { MainView } from "./MainView";
import { MainModel } from "./MainModel";

export class MainPresenter {
  private model: MainModel

  // ****************** События ***********************************

  // событие ChangePeriod
  private readonly onChangePeriod = new LiteEvent<EnumPeriod>();
  // свойство для доступа к событию
  public get ChangePeriod() { return this.onChangePeriod.expose(); }
  // ! событие ChangePeriod

  // ******************* ! События ********************************


  // ******************* Свойства *********************************

  // свойство Period
  private m_Period: EnumPeriod = EnumPeriod.day
  public get Period() {
    return this.m_Period
  }
  public set Period(value: EnumPeriod) {
    if (this.m_Period !== value) {
      this.m_Period = value
      //this.onChangePeriod.trigger(value as EnumPeriod.day & EnumPeriod.month & EnumPeriod.year & EnumPeriod.decade & EnumPeriod.century)
      this.onChangePeriod.trigger(value)
    }
  }
  // ! свойство Period

  // ****************** ! Свойства ********************************
  
  constructor(view: MainView) {
    this.model = new MainModel()
  }
}