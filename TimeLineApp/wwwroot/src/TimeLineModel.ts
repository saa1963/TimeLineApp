import { TLPeriod } from './TLPeriod';
import { TLPeriodEvent } from './TLPeriodEvent';
import { TLEvent } from './TLEvent';
export class TimeLineModel {
    Periods: TLPeriod[] = [];
    Name: string = 'Новая'
    static CreateTimeLineModel(data: any): TimeLineModel {
      let rt = new TimeLineModel();
      if (data) {
        rt.Name = data.Name;
        data.Periods.forEach(o => {
          if (TLEvent.Equal(o.Begin, o.End))
            rt.Periods.push(TLPeriodEvent.CreateTLPeriodEvent(o));
          else
            rt.Periods.push(TLPeriod.CreateTLPeriod(o));
        });
      }
      return rt;
    }
}
