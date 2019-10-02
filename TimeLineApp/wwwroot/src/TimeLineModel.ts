import { TLPeriod } from './TLPeriod';
import { TLPeriodEvent } from './TLPeriodEvent';
import { TLEvent } from './TLEvent';
import { SimpleEventDispatcher, ISimpleEvent } from 'ste-simple-events';
export class TimeLineModel {
  private it: number
  private periods: TLPeriod[] = [];
  public Name: string = 'Новая'

  static CreateTimeLineModel(name?: string, data?: any): TimeLineModel {
    let rt = new TimeLineModel();
    if (name) {
      rt.Name = name
    }
    if (data) {
      rt.Name = data.Name;
      data.Periods.forEach(o => {
        if (TLEvent.Equal(o.Begin, o.End))
          rt.periods.push(TLPeriodEvent.CreateTLPeriodEvent(o));
        else
          rt.periods.push(TLPeriod.CreateTLPeriod(o));
      });
    }
    return rt;
  }

  public Add(model: TLPeriod): number {
    let rt = this.periods.push(model)
    this.e_AddPeriod.dispatch(model)
    return rt
  }

  public Remove(i: number): boolean {
    if (!this.validIndex(i)) throw "Неверный индекс"
    this.periods.splice(i, 1)
    this.e_RemovePeriod.dispatch(i)
    return true
  }

  public get Count(): number {
    return this.periods.length
  }

  public Item(i: number): TLPeriod {
    if (!this.validIndex(i)) throw "Неверный индекс"
    return this.periods[i]
  }

  private e_AddPeriod = new SimpleEventDispatcher<TLPeriod>();
  public get evAddPeriod(): ISimpleEvent<TLPeriod> {
    return this.e_AddPeriod.asEvent();
  }

  private e_RemovePeriod = new SimpleEventDispatcher<number>();
  public get evRemovePeriod(): ISimpleEvent<number> {
    return this.e_RemovePeriod.asEvent();
  }

  private validIndex(i: number): boolean {
    if (!this.periods) return false
    if (this.periods.length === 0) return false
    if (i < 0 || i >= this.periods.length) return false
  }
}
