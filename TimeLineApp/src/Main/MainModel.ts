import { SimpleEventDispatcher, ISimpleEvent } from "ste-simple-events";
import { TLPeriod } from "../TLPeriod";
import { EnumPeriod } from "../TLEvent";

export class MainModel {
  private static instance: MainModel;
  private models: TLPeriod[] = []

  public static getInstance() {
    if (!MainModel.instance) {
      MainModel.instance = new MainModel();
      // ... any one time initialization goes here ...
    }
    return MainModel.instance;
  }

  public Add(model: TLPeriod): number {
    const idx: number = this.models.length
    const rt = this.models.push(model)
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

  public Item(i: number): TLPeriod {
    if (!this.validIndex(i)) throw "Неверный индекс"
    return this.models[i]
  }

  private e_AddTimeLine = new SimpleEventDispatcher<TLPeriod>();
  public get evAddTimeLine(): ISimpleEvent<TLPeriod> {
    return this.e_AddTimeLine.asEvent();
  }

  private e_RemoveTimeLine = new SimpleEventDispatcher<number>();
  public get evRemoveTimeLine(): ISimpleEvent<number> {
    return this.e_RemoveTimeLine.asEvent();
  }

  private e_AddPeriod = new SimpleEventDispatcher<[number, TLPeriod]>();
  public get evAddPeriod(): ISimpleEvent<[number, TLPeriod]> {
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

  public GetSlice(n: number, period: EnumPeriod): TLPeriod[] {
    const items: TLPeriod[] = []
    for (const q of this.models) {
      q.getAllSuitablePeriodsFromHierarchy(n, n, period, items)
    }
    const items1: TLPeriod[] = []
    for (const it of items) {
      if (!items1.includes(it)) {
        items1.push(it)
      }
    }
    items1.sort((a, b) => a.mBeginDay - b.mBeginDay)
    return items1
  }
}