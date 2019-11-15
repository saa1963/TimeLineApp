import { TimeLineModel } from "../TimeLineModel";
import { SimpleEventDispatcher, ISimpleEvent } from "ste-simple-events";
import { TLPeriod } from "../TLPeriod";
import { ITimeLineModel } from "../ITimeLineModel";

export class MainModel {
  private static instance: MainModel;
  private models: ITimeLineModel[] = []
  
  private constructor() {
  }

  public static getInstance() {
    if (!MainModel.instance) {
      MainModel.instance = new MainModel();
      // ... any one time initialization goes here ...
    }
    return MainModel.instance;
  }

  public Add(model: TimeLineModel): number {
    let idx: number = this.models.length
    let rt = this.models.push(model)
    model.evAddPeriod.subscribe((period) => {
      this.e_AddPeriod.dispatch([idx, period])
    })
    model.evRemovePeriod.subscribe(() => {
      this.e_RemovePeriod.dispatch(idx)
    })
    this.e_AddTimeLine.dispatch(model)
    return rt
  }

  public Remove(i: number): boolean {
    if (!this.validIndex(i)) throw "Неверный индекс"
    this.models.splice(i, 1)
    this.e_RemoveTimeLine.dispatch(i)
    return true
  }

  public get Count(): number {
    return this.models.length
  }

  public Item(i: number): ITimeLineModel {
    if (!this.validIndex(i)) throw "Неверный индекс"
    return this.models[i]
  }

  private e_AddTimeLine = new SimpleEventDispatcher<TimeLineModel>();
  public get evAddTimeLine(): ISimpleEvent<TimeLineModel> {
    return this.e_AddTimeLine.asEvent();
  }

  private e_RemoveTimeLine = new SimpleEventDispatcher<number>();
  public get evRemoveTimeLine(): ISimpleEvent<number> {
    return this.e_RemoveTimeLine.asEvent();
  }

  private e_AddPeriod = new SimpleEventDispatcher<[number,TLPeriod]>();
  public get evAddPeriod(): ISimpleEvent<[number,TLPeriod]> {
    return this.e_AddPeriod.asEvent();
  }

  private e_RemovePeriod = new SimpleEventDispatcher<number>();
  public get evRemovePeriod(): ISimpleEvent<number> {
    return this.e_RemovePeriod.asEvent();
  }

  private validIndex(i: number): boolean {
    if (!this.models) return false
    if (this.models.length === 0) return false
    if (i < 0 || i >= this.models.length) return false
    return true
  }
}