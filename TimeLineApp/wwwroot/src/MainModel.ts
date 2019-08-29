import { TimeLineModel } from "./TimeLineModel";
import { SimpleEventDispatcher, ISimpleEvent } from "ste-simple-events";
import { ContextMenu, MenuItem, MenuItemDivider, MenuItemSub } from "./contextmenu";

export class MainModel {
  private static instance: MainModel;
  private models: TimeLineModel[] = []

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
    let rt = this.models.push(model)
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

  public Item(i: number): TimeLineModel {
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

  private validIndex(i: number): boolean {
    if (!this.models) return false
    if (this.models.length === 0) return false
    if (i < 0 || i >= this.models.length) return false
  }
}