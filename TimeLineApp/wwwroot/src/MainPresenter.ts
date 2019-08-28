import {TimeLinePresenter} from "./TimeLinePresenter"
import { TimeLineModel } from "./TimeLineModel";
import { EnumPeriod } from "./TLEvent";
import { MainView } from "./MainView";
import { MainModel } from "./MainModel";
import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events"

export class MainPresenter {
  private model: MainModel
  private view: MainView

  // ******************* Свойства *********************************

  // свойство Period
  private m_Period: EnumPeriod = EnumPeriod.day
  public get Period() {
    return this.m_Period
  }
  public set Period(value: EnumPeriod) {
    if (this.m_Period !== value) {
      this.m_Period = value
    }
  }
  // ! свойство Period

  // ****************** ! Свойства ********************************

  constructor(view: MainView, model: MainModel) {
    this.model = model
    this.view = view
    //this.model.
  }
}