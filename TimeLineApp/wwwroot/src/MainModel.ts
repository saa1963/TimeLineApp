import { TimeLineModel } from "./TimeLineModel";
import { SimpleEventDispatcher, ISimpleEvent } from "ste-simple-events";

export class MainModel {
  private models: TimeLineModel[]

  public Add(model: TimeLineModel): number {
    let rt = this.models.push(model)
    this.e_AddTimeLine.dispatch(model)
    return rt
  }

  public Remove(i: number): boolean {
    if (!this.models) return false
    if (this.models.length === 0) return false
    if (i < 0 || i >= this.models.length) return false
    this.models.splice(i, 1)
    this.e_RemoveTimeLine.dispatch(i)
    return true
  }

  private e_AddTimeLine = new SimpleEventDispatcher<TimeLineModel>();
  public get evAddTimeLine(): ISimpleEvent<TimeLineModel> {
    return this.e_AddTimeLine.asEvent();
  }

  private e_RemoveTimeLine = new SimpleEventDispatcher<number>();
  public get evRemoveTimeLine(): ISimpleEvent<number> {
    return this.e_RemoveTimeLine.asEvent();
  }
}