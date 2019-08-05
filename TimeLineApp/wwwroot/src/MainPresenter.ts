import {TimeLinePresenter} from "./TimeLinePresenter"
import { TimeLineModel } from "./TimeLineModel";
import { EnumPeriod } from "./TLEvent";
import { MainView } from "./MainView";
import { MainModel } from "./MainModel";
import {EventDispatcher, IEvent} from "strongly-typed-events"

export class MainPresenter {
  private model: MainModel
  private view: MainView

  // ****************** События ***********************************

  private e_ChangePeriod = new EventDispatcher<MainPresenter, EnumPeriod>();
  public get evChangePeriod(): IEvent<MainPresenter, EnumPeriod> {
    return this.e_ChangePeriod.asEvent();
  }

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
      this.e_ChangePeriod.dispatch(this, value);	
    }
  }
  // ! свойство Period

  // ****************** ! Свойства ********************************
  
  constructor(view: MainView) {
    this.model = new MainModel()
    this.view = view
  }
}