define(["require", "exports", "./dateutils", "./saagraph", "./TLEvent"], function (require, exports, dateutils_1, saagraph_1, TLEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TimeLine {
        constructor(ctx, curPeriod = null, y = 0, color = null, period = null, name = 'нет имени', data = []) {
            this.ctx = ctx;
            this.curPeriod = curPeriod;
            this.x = ctx.canvas.clientWidth - 1 + TimeLine.INTERVAL_WIDTH + 0.5;
            this.y = y;
            this.color = color;
            this.period = period;
            this.name = name;
            this.data = data;
        }
        static getList() {
            return new Promise(function (resolve, reject) {
                $.ajax('api/storage/list')
                    .done(data => {
                    resolve(data);
                })
                    .fail((data) => {
                    reject(data.responseText);
                });
            });
        }
        save() {
            $.ajax('api/storage/save', {
                method: 'POST',
                data: {
                    s1: this.name,
                    s2: JSON.stringify(this.tldata)
                }
            })
                .done((_) => {
                alert('Сохранение прошло успешно.');
            })
                .fail((jqXHR) => {
                alert('Ошибка при сохранении.\n' + jqXHR.responseText);
            });
        }
        set Period(period) {
            this.x = this.ctx.canvas.clientWidth - 1 + TimeLine.INTERVAL_WIDTH + 0.5;
            this.curPeriod = TimeLine.getCurPeriod(period);
            this.period = period;
        }
        draw() {
            this.data = [];
            this.curdata = -1;
            let x0 = this.x;
            let dt = this.curPeriod;
            while (x0 >= 0) {
                this.drawCell(x0, dt);
                x0 -= TimeLine.INTERVAL_WIDTH;
                dt = this.getPeriodAgo(dt, -1);
            }
            x0 = this.x;
            dt = this.curPeriod;
            while (x0 <= this.ctx.canvas.clientWidth - 1 + TimeLine.INTERVAL_WIDTH) {
                this.drawCell(x0, dt);
                x0 += TimeLine.INTERVAL_WIDTH;
                dt = this.getPeriodAgo(dt, 1);
            }
            this.drawName();
        }
        /**
         * Формирует массив событий для текущего ОВ
         * @param dt
         * Текущее значение ОВ, которое в данный момент отрисовывается
         */
        //findevents(dt: number | Date): TLEvent[] {
        //  let rt: TLEvent[] = []
        //  this.tldata.Events.forEach(v => {
        //    if (v.Equal(this.period, dt)) {
        //      rt.push(v)
        //    }
        //  })
        //  return rt
        //}
        /**
         * Формирует массив периодов для текущего ОВ
         * @param dt
         * Текущее значение ОВ, которое в данный момент отрисовывается
         */
        findperiods(dt) {
            let rt = [];
            this.tldata.Periods.forEach(v => {
                if (v.Contains(this.period, dt)) {
                    rt.push(v);
                }
            });
            return rt;
        }
        drawName() {
            const HBOOKMARK = 30;
            const INDENT = 10;
            const RADIUS = 10;
            this.ctx.save();
            this.ctx.fillStyle = this.color;
            this.ctx.textBaseline = 'middle';
            this.ctx.textAlign = 'center';
            this.ctx.font = '16px serif';
            let wBookmark = this.ctx.measureText(this.name).width + INDENT / 2;
            saagraph_1.saaGraph.roundedRect(this.ctx, INDENT, this.y - HBOOKMARK, wBookmark, HBOOKMARK, RADIUS);
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(this.name, INDENT + wBookmark / 2, this.y - HBOOKMARK / 2);
            this.ctx.restore();
        }
        drawCell(x0, dt) {
            let path = new Path2D();
            path.rect(x0 - TimeLine.INTERVAL_WIDTH + 1, this.y, TimeLine.INTERVAL_WIDTH, TimeLine.LINE_THICKNESS);
            this.ctx.fillStyle = this.color;
            this.ctx.strokeStyle = 'white';
            this.ctx.fill(path);
            this.ctx.stroke(path);
            this.ctx.textBaseline = 'middle';
            this.ctx.textAlign = 'center';
            this.ctx.font = '14px serif';
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(this.formatPeriod(dt), x0 - TimeLine.HALF_INTERVAL_WIDTH, this.y + TimeLine.HALF_LINE_THICKNESS);
            let cellData = new CellData(dt, x0 - TimeLine.INTERVAL_WIDTH + 1, this.y, x0, this.y + TimeLine.LINE_THICKNESS - 1, path);
            //cellData.events = this.findevents(dt)
            cellData.periods = this.findperiods(dt);
            this.data.push(cellData);
        }
        /**
         * Получить индекс в массиве this.data для данной координаты курсора
         *
         * @param {number} x
         * @param {number} y
         * @returns number
         * @memberof TimeLine
         */
        getCellValue(x, y) {
            for (let i = 0; i < this.data.length; i++) {
                if (x > this.data[i].x1 && x < this.data[i].x2 && y > this.data[i].y1 && y < this.data[i].y2) {
                    return i;
                }
            }
            return -1;
        }
        onBox(_data) {
            let data = this.data[_data];
            this.ctx.strokeStyle = 'black';
            this.ctx.stroke(data.path);
        }
        offBox() {
            let data = this.data[this.curdata];
            this.ctx.strokeStyle = 'white';
            this.ctx.stroke(data.path);
        }
        shift(movementX) {
            this.x += movementX;
        }
        static getCurPeriod(periodType) {
            let rt;
            switch (periodType) {
                case TLEvent_1.EnumPeriod.month:
                    rt = dateutils_1.DateUtils.getMonthFromDate(dateutils_1.DateUtils.getCurDate());
                    break;
                case TLEvent_1.EnumPeriod.year:
                    rt = dateutils_1.DateUtils.getYearFromDate(dateutils_1.DateUtils.getCurDate());
                    break;
                case TLEvent_1.EnumPeriod.decade:
                    rt = dateutils_1.DateUtils.getDecadeFromDate(dateutils_1.DateUtils.getCurDate());
                    break;
                case TLEvent_1.EnumPeriod.century:
                    rt = dateutils_1.DateUtils.getCenturyFromDate(dateutils_1.DateUtils.getCurDate());
                    break;
                case TLEvent_1.EnumPeriod.day:
                default:
                    rt = dateutils_1.DateUtils.getCurDate();
                    break;
            }
            return rt;
        }
        formatPeriod(period) {
            let rt;
            switch (this.period) {
                case TLEvent_1.EnumPeriod.month:
                    rt = dateutils_1.DateUtils.formatMonth(period);
                    break;
                case TLEvent_1.EnumPeriod.year:
                    rt = dateutils_1.DateUtils.formatYear(period);
                    break;
                case TLEvent_1.EnumPeriod.decade:
                    rt = dateutils_1.DateUtils.formatDecade(period);
                    break;
                case TLEvent_1.EnumPeriod.century:
                    rt = dateutils_1.DateUtils.formatCentury(period);
                    break;
                case TLEvent_1.EnumPeriod.day:
                default:
                    rt = dateutils_1.DateUtils.formatDate(period);
                    break;
            }
            return rt;
        }
        getPeriodAgo(period, offset) {
            let dt0;
            switch (this.period) {
                case TLEvent_1.EnumPeriod.month:
                case TLEvent_1.EnumPeriod.year:
                case TLEvent_1.EnumPeriod.decade:
                    dt0 = period + offset;
                    break;
                case TLEvent_1.EnumPeriod.century:
                    dt0 = period + offset;
                    if (dt0 === 0) {
                        dt0 = dt0 + offset;
                    }
                    break;
                case TLEvent_1.EnumPeriod.day:
                default:
                    dt0 = dateutils_1.DateUtils.getDateAgo(period, offset);
                    break;
            }
            return dt0;
        }
    }
    TimeLine.LINE_THICKNESS = 25;
    TimeLine.HALF_LINE_THICKNESS = TimeLine.LINE_THICKNESS / 2;
    TimeLine.INTERVAL_WIDTH = 100;
    TimeLine.HALF_INTERVAL_WIDTH = TimeLine.INTERVAL_WIDTH / 2;
    exports.TimeLine = TimeLine;
    class CellData {
        constructor(value, x1, y1, x2, y2, path) {
            this.value = value;
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.path = path;
        }
    }
});
//# sourceMappingURL=timeline.js.map