"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dateutils_1 = require("./dateutils");
var saagraph_1 = require("./saagraph");
var EnumPeriod;
(function (EnumPeriod) {
    EnumPeriod[EnumPeriod["day"] = 1] = "day";
    EnumPeriod[EnumPeriod["month"] = 2] = "month";
    EnumPeriod[EnumPeriod["year"] = 3] = "year";
    EnumPeriod[EnumPeriod["decade"] = 4] = "decade";
    EnumPeriod[EnumPeriod["century"] = 5] = "century";
})(EnumPeriod = exports.EnumPeriod || (exports.EnumPeriod = {}));
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
    TimeLine.load = function (ctx) {
        var o = new TimeLine(ctx);
        return o;
    };
    TimeLine.prototype.save = function () {
        $.ajax('api/storage/save', {
            method: 'POST',
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            },
            data: {
                s1: this.name,
                s2: JSON.stringify({
                    "name": "Жизнь Сошина",
                    "events": [
                        {
                            "type": 0,
                            "name": "Рождение",
                            "day": {
                                "year": 1963,
                                "month": 6,
                                "day": 5
                            },
                            "month": 23551,
                            "year": 1963,
                            "decade": 197,
                            "century": 20
                        },
                        {
                            "type": 0,
                            "name": "В школу",
                            "day": {
                                "year": 1970,
                                "month": 9,
                                "day": 1
                            },
                            "month": 23637,
                            "year": 1970,
                            "decade": 198,
                            "century": 20
                        },
                        {
                            "type": 0,
                            "name": "Окончил школу",
                            "day": {
                                "year": 1980,
                                "month": 6,
                                "day": 30
                            },
                            "month": 23754,
                            "year": 1980,
                            "decade": 199,
                            "century": 20
                        },
                        {
                            "type": 1,
                            "name": "1-ая учеба в ВУЗе",
                            "first": {
                                "day": {
                                    "year": 1981,
                                    "month": 9,
                                    "day": 1
                                },
                                "month": 23769,
                                "year": 1981,
                                "decade": 199,
                                "century": 20
                            },
                            "last": {
                                "day": {
                                    "year": 1984,
                                    "month": 8,
                                    "day": 31
                                },
                                "month": 23804,
                                "year": 1984,
                                "decade": 199,
                                "century": 20
                            }
                        }
                    ]
                })
            }
        }).done(function (data) { console.log('OK'); });
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
        this.data.push(new TimeLineData(dt, x0 - TimeLine.INTERVAL_WIDTH + 1, this.y, x0, this.y + TimeLine.LINE_THICKNESS - 1, path));
    };
    /**
     * Получить значение периода для данной координаты курсора
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
            case EnumPeriod.month:
                rt = dateutils_1.DateUtils.getMonthFromDate(dateutils_1.DateUtils.getCurDate());
                break;
            case EnumPeriod.year:
                rt = dateutils_1.DateUtils.getYearFromDate(dateutils_1.DateUtils.getCurDate());
                break;
            case EnumPeriod.decade:
                rt = dateutils_1.DateUtils.getDecadeFromDate(dateutils_1.DateUtils.getCurDate());
                break;
            case EnumPeriod.century:
                rt = dateutils_1.DateUtils.getCenturyFromDate(dateutils_1.DateUtils.getCurDate());
                break;
            case EnumPeriod.day:
            default:
                rt = dateutils_1.DateUtils.getCurDate();
                break;
        }
        return rt;
    };
    TimeLine.prototype.formatPeriod = function (period) {
        var rt;
        switch (this.period) {
            case EnumPeriod.month:
                rt = dateutils_1.DateUtils.formatMonth(period);
                break;
            case EnumPeriod.year:
                rt = dateutils_1.DateUtils.formatYear(period);
                break;
            case EnumPeriod.decade:
                rt = dateutils_1.DateUtils.formatDecade(period);
                break;
            case EnumPeriod.century:
                rt = dateutils_1.DateUtils.formatCentury(period);
                break;
            case EnumPeriod.day:
            default:
                rt = dateutils_1.DateUtils.formatDate(period);
                break;
        }
        return rt;
    };
    TimeLine.prototype.getPeriodAgo = function (period, offset) {
        var dt0;
        switch (this.period) {
            case EnumPeriod.month:
            case EnumPeriod.year:
            case EnumPeriod.decade:
                dt0 = period + offset;
                break;
            case EnumPeriod.century:
                dt0 = period + offset;
                if (dt0 === 0) {
                    dt0 = dt0 + offset;
                }
                break;
            case EnumPeriod.day:
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
var TimeLineData = /** @class */ (function () {
    function TimeLineData(value, x1, y1, x2, y2, path) {
        this.value = value;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.path = path;
    }
    return TimeLineData;
}());
//# sourceMappingURL=timeline.js.map