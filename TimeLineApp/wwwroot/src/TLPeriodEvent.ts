import { TLPeriod } from './TLPeriod';
export class TLPeriodEvent extends TLPeriod {
  /**
   * Создает TLPeriodEvent из объекта десериализованного из JSON
   * @param o
   */
  static CreateTLPeriodEvent(o: any): TLPeriodEvent {
    let rt: TLPeriodEvent
    rt = <TLPeriodEvent>TLPeriod.CreateTLPeriod(o)
    return rt
  }
}
