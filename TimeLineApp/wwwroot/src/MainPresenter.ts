import {TimeLinePresenter} from "./TimeLinePresenter"
import { TimeLineData } from "./TimeLineData";
import { EnumPeriod } from "./TLEvent";

export class MainPresenter {
  public Period: EnumPeriod = EnumPeriod.day
  public TimeLinePresenters: TimeLinePresenter[]
  constructor() {
    this.TimeLinePresenters = []
  }
}