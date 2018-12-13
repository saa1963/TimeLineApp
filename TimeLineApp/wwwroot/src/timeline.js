"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dateutils_1 = require("./dateutils");
var saagraph_1 = require("./saagraph");
var TLEvent_1 = require("./TLEvent");
var TimeLine = /** @class */ (function () {
    function TimeLine(ctx, curPeriod, y, color, period, name, data) {
        if (curPeriod === void 0) { curPeriod = null; }
        if (y === void 0) { y = 0; }
        if (color === void 0) { color = null; }
        if (period === void 0) { period = null; }
        if (name === void 0) { name = 'нет имени'; }
        if (data === void 0) { data = []; }
        this.ctx = ctx;
        this.curPeriod = curPeriod;
        this.x = ctx.canvas.clientWidth - 1 + TimeLine.INTERVAL_WIDTH + 0.5;
        this.y = y;
        this.color = color;
        this.period = period;
        this.name = name;
        this.data = data;
    }
    TimeLine.getList = function () {
        return new Promise(function (resolve, reject) {
            $.ajax('api/storage/list')
                .done(function (data) {
                resolve(data);
            })
                .fail(function (data) {
                reject(data.responseText);
            });
        });
    };
    TimeLine.prototype.save = function () {
        $.ajax('api/storage/save', {
            method: 'POST',
            data: {
                s1: this.name,
                s2: JSON.stringify(this.tldata)
            }
        })
            .done(function (_) {
            alert('Сохранение прошло успешно.');
        })
            .fail(function (jqXHR) {
            alert('Ошибка при сохранении.\n' + jqXHR.responseText);
        });
    };
    Object.defineProperty(TimeLine.prototype, "Period", {
        set: function (period) {
            this.x = this.ctx.canvas.clientWidth - 1 + TimeLine.INTERVAL_WIDTH + 0.5;
            this.curPeriod = TimeLine.getCurPeriod(period);
            this.period = period;
        },
        enumerable: true,
        configurable: true
    });
    TimeLine.prototype.draw = function () {
        this.data = [];
        this.curdata = -1;
        var x0 = this.x;
        var dt = this.curPeriod;
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
    };
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
    TimeLine.prototype.findperiods = function (dt) {
        var _this = this;
        var rt = [];
        this.tldata.Periods.forEach(function (v) {
            if (v.Contains(_this.period, dt)) {
                rt.push(v);
            }
        });
        return rt;
    };
    TimeLine.prototype.drawName = function () {
        var HBOOKMARK = 30;
        var INDENT = 10;
        var RADIUS = 10;
        this.ctx.save();
        this.ctx.fillStyle = this.color;
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
        this.ctx.font = '16px serif';
        var wBookmark = this.ctx.measureText(this.name).width + INDENT / 2;
        saagraph_1.saaGraph.roundedRect(this.ctx, INDENT, this.y - HBOOKMARK, wBookmark, HBOOKMARK, RADIUS);
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(this.name, INDENT + wBookmark / 2, this.y - HBOOKMARK / 2);
        this.ctx.restore();
    };
    TimeLine.prototype.drawCell = function (x0, dt) {
        var path = new Path2D();
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
        var cellData = new CellData(dt, x0 - TimeLine.INTERVAL_WIDTH + 1, this.y, x0, this.y + TimeLine.LINE_THICKNESS - 1, path);
        //cellData.events = this.findevents(dt)
        cellData.periods = this.findperiods(dt);
        this.data.push(cellData);
    };
    /**
     * Получить индекс в массиве this.data для данной координаты курсора
     *
     * @param {number} x
     * @param {number} y
     * @returns number
     * @memberof TimeLine
     */
    TimeLine.prototype.getCellValue = function (x, y) {
        for (var i = 0; i < this.data.length; i++) {
            if (x > this.data[i].x1 && x < this.data[i].x2 && y > this.data[i].y1 && y < this.data[i].y2) {
                return i;
            }
        }
        return -1;
    };
    TimeLine.prototype.onBox = function (_data) {
        var data = this.data[_data];
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke(data.path);
    };
    TimeLine.prototype.offBox = function () {
        var data = this.data[this.curdata];
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke(data.path);
    };
    TimeLine.prototype.shift = function (movementX) {
        this.x += movementX;
    };
    TimeLine.getCurPeriod = function (periodType) {
        var rt;
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
    };
    TimeLine.prototype.formatPeriod = function (period) {
        var rt;
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
    };
    TimeLine.prototype.getPeriodAgo = function (period, offset) {
        var dt0;
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
    };
    TimeLine.LINE_THICKNESS = 25;
    TimeLine.HALF_LINE_THICKNESS = TimeLine.LINE_THICKNESS / 2;
    TimeLine.INTERVAL_WIDTH = 100;
    TimeLine.HALF_INTERVAL_WIDTH = TimeLine.INTERVAL_WIDTH / 2;
    return TimeLine;
}());
exports.TimeLine = TimeLine;
var CellData = /** @class */ (function () {
    function CellData(value, x1, y1, x2, y2, path) {
        this.value = value;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.path = path;
    }
    return CellData;
}());
//# sourceMappingURL=timeline.js.map