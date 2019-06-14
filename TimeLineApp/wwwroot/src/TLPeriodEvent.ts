import { TLPeriod } from './TLPeriod';
export class TLPeriodEvent extends TLPeriod {
  /**
   * Создает TLPeriodEvent из объекта десериализованного из JSON
   * @param o
   */
  static CreateTLPeriodEvent(o: TLPeriodEvent): TLPeriodEvent {
    let rt: TLPeriodEvent
    rt = <TLPeriodEvent>TLPeriod.CreateTLPeriod(o)
    return rt
  }
}
