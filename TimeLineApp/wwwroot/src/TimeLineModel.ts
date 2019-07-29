import { TLPeriod } from './TLPeriod';
import { TLPeriodEvent } from './TLPeriodEvent';
import { TLEvent } from './TLEvent';
export class TimeLineModel {
    Periods: TLPeriod[] = [];
    Name: string;
    static CreateTimeLineData(data: any): TimeLineModel {
        let rt = new TimeLineModel();
        rt.Name = data.Name;
        rt.Periods = [];
        data.Periods.forEach(o => {
            if (TLEvent.Equal(o.Begin, o.End))
                rt.Periods.push(TLPeriodEvent.CreateTLPeriodEvent(o));
            else
                rt.Periods.push(TLPeriod.CreateTLPeriod(o));
        });
        return rt;
    }
}
