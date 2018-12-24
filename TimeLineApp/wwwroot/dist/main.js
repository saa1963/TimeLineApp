/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Globals.ts":
/*!************************!*\
  !*** ./src/Globals.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Globals = /** @class */ (function () {
    function Globals() {
    }
    Globals.getCookie = function (name) {
        var c = document.cookie;
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };
    Globals.IsAuthentificated = false;
    return Globals;
}());
exports.Globals = Globals;


/***/ }),

/***/ "./src/LogonHandlers.ts":
/*!******************************!*\
  !*** ./src/LogonHandlers.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Globals_1 = __webpack_require__(/*! ./Globals */ "./src/Globals.ts");
var LogonHandlers = /** @class */ (function () {
    function LogonHandlers() {
    }
    // Открытие окна входа пользователя
    LogonHandlers.OpenLogonWindow = function () {
        if (!Globals_1.Globals.IsAuthentificated) {
            $('#logLogin').val(Globals_1.Globals.getCookie('timelineuser') || '');
            $('#logPassword').val('');
            $('#tmLoginModal').modal();
            $('#log_server_error').css('display', 'none');
        }
        else {
            $.ajax('api/register/logout')
                .done(function (data) {
                if (data) {
                    Globals_1.Globals.IsAuthentificated = false;
                    $('#btnLogin').text('Вход');
                    $('#lblUser').css('display', 'none');
                    $('#lblUser').text('');
                }
            });
        }
        return false;
    };
    // Вход пользователя
    LogonHandlers.LoginLogout = function () {
        if ($('#logLogin')[0].reportValidity()
            && $('#logPassword')[0].reportValidity()) {
            $.ajax('api/register/log', {
                type: 'POST',
                data: {
                    Login: $('#logLogin').val(),
                    Password: $('#logPassword').val()
                }
            })
                .done(function (data) {
                if (data === '') {
                    Globals_1.Globals.IsAuthentificated = true;
                    $('#tmLoginModal').modal('hide');
                    $('#btnLogin').text('Выход');
                    $('#lblUser').css('display', 'unset');
                    $('#lblUser').text($('#logLogin').val());
                }
                else {
                    $('#log_server_error').text(data);
                    $('#log_server_error').css('display', 'unset');
                }
            });
        }
    };
    return LogonHandlers;
}());
exports.LogonHandlers = LogonHandlers;


/***/ }),

/***/ "./src/RegisterHandlers.ts":
/*!*********************************!*\
  !*** ./src/RegisterHandlers.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RegisterHandlers = /** @class */ (function () {
    function RegisterHandlers() {
    }
    RegisterHandlers.OpenRegisterWindow = function () {
        $('#regLogin').val('');
        $('#regEmail').val('');
        $('#regPassword1').val('');
        $('#regPassword2').val('');
        $('#tmRegisterModal').modal();
        $('#passw_not_matches').css('display', 'none');
        $('#reg_server_error').css('display', 'none');
        return false;
    };
    RegisterHandlers.RegisterUser = function () {
        if ($('#regLogin')[0].reportValidity()
            && $('#regEmail')[0].reportValidity()
            && $('#regPassword1')[0].reportValidity()
            && $('#regPassword2')[0].reportValidity()) {
            if ($('#regPassword1').val() === $('#regPassword2').val()) {
                $.ajax('api/register/reg', {
                    type: 'POST',
                    data: {
                        Login: $('#regLogin').val(),
                        Email: $('#regEmail').val(),
                        Password1: $('#regPassword1').val(),
                        Password2: $('#regPassword2').val()
                    }
                })
                    .done(function (data) {
                    if (data === '') {
                        $('#tmRegisterModal').modal('hide');
                    }
                    else {
                        $('#reg_server_error').text(data);
                        $('#reg_server_error').css('display', 'unset');
                    }
                });
            }
            else {
                $('#passw_not_matches').css('display', 'unset');
            }
        }
    };
    return RegisterHandlers;
}());
exports.RegisterHandlers = RegisterHandlers;


/***/ }),

/***/ "./src/TLEvent.ts":
/*!************************!*\
  !*** ./src/TLEvent.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dateutils_1 = __webpack_require__(/*! ./dateutils */ "./src/dateutils.ts");
var EnumPeriod;
(function (EnumPeriod) {
    EnumPeriod[EnumPeriod["day"] = 1] = "day";
    EnumPeriod[EnumPeriod["month"] = 2] = "month";
    EnumPeriod[EnumPeriod["year"] = 3] = "year";
    EnumPeriod[EnumPeriod["decade"] = 4] = "decade";
    EnumPeriod[EnumPeriod["century"] = 5] = "century";
})(EnumPeriod = exports.EnumPeriod || (exports.EnumPeriod = {}));
var TLDate = /** @class */ (function () {
    function TLDate(year, month, day, fromCrismas) {
        if (fromCrismas === undefined) {
            if (year == 0)
                throw new Error('Год равен 0');
            if (month > 12 || month < 1)
                throw new Error('Неверный месяц месяца');
            if (day < 1)
                throw new Error('День меньше 1');
            if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
                if (day > 31)
                    throw new Error('Неверный день месяца');
            }
            else if ([4, 6, 9, 11].includes(month)) {
                if (day > 30)
                    throw new Error('Неверный день месяца');
            }
            else {
                if (day > 29)
                    throw new Error('Неверный день месяца');
                if (year >= 1 && year <= 9999) {
                    var dt = new Date(year, month - 1, day);
                    if (dateutils_1.DateUtils.leapYear(year)) {
                        if (day > 27)
                            throw new Error('Неверный день месяца');
                    }
                    else {
                        if (day > 28)
                            throw new Error('Неверный день месяца');
                    }
                }
            }
            this.Day = day;
            this.Month = month;
            this.Year = year;
            this.FromCrismas = dateutils_1.DateUtils.DaysFromAD(year, month, day);
        }
        else {
        }
    }
    TLDate.prototype.Greater = function (o) {
        return this.FromCrismas > o.FromCrismas;
    };
    TLDate.prototype.GreaterOrEqual = function (o) {
        return this.FromCrismas >= o.FromCrismas;
    };
    TLDate.prototype.Less = function (o) {
        return this.FromCrismas < o.FromCrismas;
    };
    TLDate.prototype.LessOrEqual = function (o) {
        return this.FromCrismas <= o.FromCrismas;
    };
    TLDate.prototype.Equal = function (o) {
        return this.FromCrismas === o.FromCrismas;
    };
    return TLDate;
}());
var TLEvent = /** @class */ (function () {
    function TLEvent(name) {
        this.Name = name;
        this.Day = null;
        this.Month = null;
        this.Year = null;
        this.Decade = null;
        this.Century = null;
    }
    TLEvent.prototype.DecadeFromYear = function (year) {
        return year / 10 + (year / Math.abs(year));
    };
    TLEvent.prototype.CenturyFromDecade = function (decade) {
        return decade / 10 + (decade / Math.abs(decade));
    };
    TLEvent.prototype.YearFromMonth = function (month) {
        return (month - 1) / 12 + (month / Math.abs(month));
    };
    TLEvent.GetType = function (o) {
        if (o.Day !== null)
            return EnumPeriod.day;
        if (o.Month !== null)
            return EnumPeriod.month;
        if (o.Year !== null)
            return EnumPeriod.year;
        if (o.Decade !== null)
            return EnumPeriod.decade;
        if (o.Century !== null)
            return EnumPeriod.century;
    };
    /**
     * Попадает ли событие this в текущее значение ОВ
     * @param period
     * Текущая дробность отображения для ЛВ
     * @param vl
     * Текущее значение ОВ, которое в данный момент отрисовывается
     */
    TLEvent.Equal = function (o1, o2) {
        var rt = false;
        if (o1.Century === o2.Century
            && o1.Decade === o2.Decade
            && o1.Year === o2.Year
            && o1.Month === o2.Month
            && o1.Day.Year === o2.Day.Year
            && o1.Day.Month === o2.Day.Month
            && o1.Day.Day === o2.Day.Day)
            rt = true;
        return rt;
    };
    return TLEvent;
}());
exports.TLEvent = TLEvent;
var TLEventDay = /** @class */ (function (_super) {
    __extends(TLEventDay, _super);
    function TLEventDay(name, year, month, day) {
        var _this = _super.call(this, name) || this;
        _this.Day = new TLDate(year, month, day);
        _this.Month = ((Math.abs(year) - 1) * 12 + month) * (year / Math.abs(year));
        _this.Year = year;
        _this.Decade = _this.DecadeFromYear(year);
        _this.Century = _this.CenturyFromDecade(_this.Decade);
        _this.Type = EnumPeriod.day;
        return _this;
    }
    return TLEventDay;
}(TLEvent));
exports.TLEventDay = TLEventDay;
var TLEventMonth = /** @class */ (function (_super) {
    __extends(TLEventMonth, _super);
    function TLEventMonth(name, par1, par2) {
        var _this = _super.call(this, name) || this;
        if (par2 !== undefined) {
            var year = par1;
            var month = par2;
            _this.Month = ((Math.abs(year) - 1) * 12 + month) * (year / Math.abs(year));
            _this.Year = year;
            _this.Decade = _this.DecadeFromYear(year);
            _this.Century = _this.CenturyFromDecade(_this.Decade);
        }
        else {
            var month = par1;
            _this.Month = month;
            _this.Year = _this.YearFromMonth(month);
            _this.Decade = _this.DecadeFromYear(_this.Year);
            _this.Century = _this.CenturyFromDecade(_this.Decade);
        }
        _this.Type = EnumPeriod.month;
        return _this;
    }
    return TLEventMonth;
}(TLEvent));
exports.TLEventMonth = TLEventMonth;
var TLEventYear = /** @class */ (function (_super) {
    __extends(TLEventYear, _super);
    function TLEventYear(name, year) {
        var _this = _super.call(this, name) || this;
        _this.Year = year;
        _this.Decade = _this.DecadeFromYear(year);
        _this.Century = _this.CenturyFromDecade(_this.Decade);
        _this.Type = EnumPeriod.year;
        return _this;
    }
    return TLEventYear;
}(TLEvent));
exports.TLEventYear = TLEventYear;
var TLEventDecade = /** @class */ (function (_super) {
    __extends(TLEventDecade, _super);
    function TLEventDecade(name, par1, par2) {
        var _this = _super.call(this, name) || this;
        if (par2 !== undefined) {
            var century = par1;
            var decade = par2;
            if (decade < 0 || decade > 9)
                throw Error('Неверный номер десятилетия');
            _this.Decade = ((Math.abs(century) - 1) * 10 + decade + 1) * (century / Math.abs(century));
            _this.Century = century;
        }
        else {
            var decade = par1;
            _this.Decade = decade;
            _this.Century = _this.CenturyFromDecade(decade);
        }
        _this.Type = EnumPeriod.decade;
        return _this;
    }
    return TLEventDecade;
}(TLEvent));
exports.TLEventDecade = TLEventDecade;
var TLEventCentury = /** @class */ (function (_super) {
    __extends(TLEventCentury, _super);
    function TLEventCentury(name, century) {
        var _this = _super.call(this, name) || this;
        _this.Century = century;
        _this.Type = EnumPeriod.century;
        return _this;
    }
    return TLEventCentury;
}(TLEvent));
exports.TLEventCentury = TLEventCentury;
var TLPeriod = /** @class */ (function () {
    function TLPeriod(o) {
        this.Name = o.Name;
        var type;
        type = TLEvent.GetType(o.Begin);
        if (type === EnumPeriod.day) {
            this.Begin = new TLEventDay(o.Begin.Name, o.Begin.Day.Year, o.Begin.Day.Month, o.Begin.Day.Day);
        }
        else if (type === EnumPeriod.month) {
            this.Begin = new TLEventMonth(o.Begin.Name, o.Begin.Month);
        }
        else if (type === EnumPeriod.year) {
            this.Begin = new TLEventYear(o.Begin.Name, o.Begin.Year);
        }
        else if (type === EnumPeriod.decade) {
            this.Begin = new TLEventDecade(o.Begin.Name, o.Begin.Decade);
        }
        else if (type === EnumPeriod.century) {
            this.Begin = new TLEventCentury(o.Begin.Name, o.Begin.Century);
        }
        type = TLEvent.GetType(o.End);
        if (type === EnumPeriod.day) {
            this.End = new TLEventDay(o.End.Name, o.End.Day.Year, o.End.Day.Month, o.End.Day.Day);
        }
        else if (type === EnumPeriod.month) {
            this.End = new TLEventMonth(o.End.Name, o.End.Month);
        }
        else if (type === EnumPeriod.year) {
            this.End = new TLEventYear(o.End.Name, o.End.Year);
        }
        else if (type === EnumPeriod.decade) {
            this.End = new TLEventDecade(o.End.Name, o.End.Decade);
        }
        else if (type === EnumPeriod.century) {
            this.End = new TLEventCentury(o.End.Name, o.End.Century);
        }
    }
    /**
     * Попадает текущее значение ОВ в период this
     * @param period
     * Текущая дробность отображения для ЛВ
     * @param vl
     * Текущее значение ОВ, которое в данный момент отрисовывается
     */
    TLPeriod.prototype.Contains = function (period, vl) {
        var rt = false;
        switch (period) {
            case EnumPeriod.day:
                var dt = vl;
                rt = this.ContainsDay(new TLDate(dt.getFullYear(), dt.getMonth() + 1, dt.getDate()));
                break;
            case EnumPeriod.month:
                //rt = (vl === this.Month)
                break;
            case EnumPeriod.year:
                //rt = (vl === this.Year)
                break;
            case EnumPeriod.decade:
                //rt = (vl === this.Decade)
                break;
            case EnumPeriod.century:
                //rt = (vl === this.Century)
                break;
            default:
                break;
        }
        return rt;
    };
    /**
     *
     * @param dt отображаемый ОВ
     * @param o объект насчет которого принимается решение включать или нет
     */
    TLPeriod.prototype.ContainsDay = function (dt) {
        var dt1, dt2;
        switch (this.Begin.Type) {
            case EnumPeriod.day:
                dt1 = this.Begin.Day;
                break;
            case EnumPeriod.month:
                dt1 = new TLDate(this.Begin.Day.Year, this.Begin.Day.Month, 1);
                break;
            case EnumPeriod.year:
                dt1 = new TLDate(this.Begin.Day.Year, 1, 1);
                break;
            case EnumPeriod.decade:
                dt1 = new TLDate(Math.floor(this.Begin.Year / 10) + 1, 1, 1);
                break;
            case EnumPeriod.century:
                dt1 = new TLDate(Math.floor(this.Begin.Year / 100) + 1, 1, 1);
                break;
        }
        switch (this.End.Type) {
            case EnumPeriod.day:
                dt2 = this.End.Day;
                break;
            case EnumPeriod.month:
                dt2 = new TLDate(this.Begin.Day.Year, this.Begin.Day.Month, 1);
                break;
            case EnumPeriod.year:
                dt2 = new TLDate(this.Begin.Day.Year, 1, 1);
                break;
            case EnumPeriod.decade:
                dt2 = new TLDate(Math.floor(this.Begin.Year / 10) + 1, 1, 1);
                break;
            case EnumPeriod.century:
                dt2 = new TLDate(Math.floor(this.Begin.Year / 100) + 1, 1, 1);
                break;
        }
        return dt.GreaterOrEqual(dt1) && dt.LessOrEqual(dt2);
    };
    return TLPeriod;
}());
exports.TLPeriod = TLPeriod;
var TimeLineData = /** @class */ (function () {
    function TimeLineData(o) {
        var _this = this;
        /** Здесь только события с конкретными датами */
        //Events: TLEvent[] = []
        /** Здесь периоды, события у которых нет конкретной даты тоже относятся к периодам */
        this.Periods = [];
        this.Name = o.Name;
        o.Periods.forEach(function (data) {
            if (TLEvent.Equal(data.Begin, data.End))
                _this.Periods.push(new TLPeriodEvent(data));
            else
                _this.Periods.push(new TLPeriod(data));
        });
    }
    return TimeLineData;
}());
exports.TimeLineData = TimeLineData;
var TLPeriodEvent = /** @class */ (function (_super) {
    __extends(TLPeriodEvent, _super);
    function TLPeriodEvent(o) {
        return _super.call(this, o) || this;
    }
    return TLPeriodEvent;
}(TLPeriod));
exports.TLPeriodEvent = TLPeriodEvent;


/***/ }),

/***/ "./src/colorutils.ts":
/*!***************************!*\
  !*** ./src/colorutils.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeColor = function () {
    var index, colors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                index = 0;
                colors = ['magenta', 'green', 'rgba(255, 0, 0, 1.0)', 'blue', 'magenta', 'orange'];
                _a.label = 1;
            case 1:
                if (false) {}
                return [4 /*yield*/, colors[index]];
            case 2:
                _a.sent();
                if (index < 4) {
                    index++;
                }
                else {
                    index = 0;
                }
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
};


/***/ }),

/***/ "./src/contextmenu.ts":
/*!****************************!*\
  !*** ./src/contextmenu.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ContextMenu = /** @class */ (function () {
    function ContextMenu(menu, options) {
        var _this = this;
        this.contextTarget = null;
        var num = ContextMenu.count++;
        this.menu = menu;
        if (options == undefined)
            this.options = {};
        else
            this.options = options;
        window.addEventListener('resize', function () { return _this.onresize(); });
        this.reload();
    }
    ContextMenu.prototype.onresize = function () {
        if (ContextUtil.getProperty(this.options, 'close_on_resize', true)) {
            this.hide();
        }
    };
    ContextMenu.prototype.hide = function () {
        var _this = this;
        document.getElementById('cm_' + ContextMenu.count).classList.remove('display');
        window.removeEventListener('click', function () { return _this.documentClick(); });
    };
    ContextMenu.prototype.setOptions = function (_options) {
        this.options = _options;
    };
    ContextMenu.prototype.changeOption = function (option, value) {
        this.options[option] = value;
    };
    ContextMenu.prototype.getOptions = function () {
        return this.options;
    };
    ContextMenu.prototype.reload = function () {
        if (document.getElementById('cm_' + ContextMenu.count) == null) {
            var cnt = document.createElement('div');
            cnt.className = 'cm_container';
            cnt.id = 'cm_' + ContextMenu.count;
            document.body.appendChild(cnt);
        }
        var container = document.getElementById('cm_' + ContextMenu.count);
        container.innerHTML = '';
        container.appendChild(this.renderLevel(this.menu));
    };
    ContextMenu.prototype.renderLevel = function (level) {
        var _this = this;
        var ulOuter = document.createElement('ul');
        level.forEach(function (item) {
            var li = document.createElement('li');
            li.menu = _this;
            if (typeof item.type === 'undefined') {
                var iconSpan = document.createElement('span');
                iconSpan.className = 'cm_icon_span';
                if (ContextUtil.getProperty(item, 'icon', '') != '') {
                    iconSpan.innerHTML = ContextUtil.getProperty(item, 'icon', '');
                }
                else {
                    iconSpan.innerHTML = ContextUtil.getProperty(_this.options, 'default_icon', '');
                }
                var textSpan = document.createElement('span');
                textSpan.className = 'cm_text';
                if (ContextUtil.getProperty(item, 'text', '') != '') {
                    textSpan.innerHTML = ContextUtil.getProperty(item, 'text', '');
                }
                else {
                    textSpan.innerHTML = ContextUtil.getProperty(_this.options, 'default_text', 'item');
                }
                var subSpan = document.createElement('span');
                subSpan.className = 'cm_sub_span';
                if (typeof item.sub !== 'undefined') {
                    if (ContextUtil.getProperty(_this.options, 'sub_icon', '') != '') {
                        subSpan.innerHTML = ContextUtil.getProperty(_this.options, 'sub_icon', '');
                    }
                    else {
                        subSpan.innerHTML = '&#155;';
                    }
                }
                li.appendChild(iconSpan);
                li.appendChild(textSpan);
                li.appendChild(subSpan);
                if (!ContextUtil.getProperty(item, 'enabled', true)) {
                    li.setAttribute('disabled', '');
                }
                else {
                    if (typeof item.events === 'object') {
                        var keys = Object.keys(item.events);
                        for (var i = 0; i < keys.length; i++) {
                            li.addEventListener(keys[i], item.events[keys[i]]);
                        }
                    }
                    if (typeof item.sub !== 'undefined') {
                        li.appendChild(_this.renderLevel(item.sub));
                    }
                }
            }
            else {
                if (item.type == ContextMenu.DIVIDER) {
                    li.className = 'cm_divider';
                }
            }
            ulOuter.appendChild(li);
        });
        return ulOuter;
    };
    ContextMenu.prototype.display = function (e, target) {
        var _this = this;
        if (typeof target !== 'undefined') {
            this.contextTarget = target;
        }
        else {
            this.contextTarget = e.target;
        }
        var menu = document.getElementById('cm_' + ContextMenu.count);
        var clickCoords = { x: e.clientX, y: e.clientY };
        var clickCoordsX = clickCoords.x;
        var clickCoordsY = clickCoords.y;
        var menuWidth = menu.offsetWidth + 4;
        var menuHeight = menu.offsetHeight + 4;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var mouseOffset = parseInt(ContextUtil.getProperty(this.options, 'mouse_offset', 2));
        if ((windowWidth - clickCoordsX) < menuWidth) {
            menu.style.left = windowWidth - menuWidth + 'px';
        }
        else {
            menu.style.left = (clickCoordsX + mouseOffset) + 'px';
        }
        if ((windowHeight - clickCoordsY) < menuHeight) {
            menu.style.top = windowHeight - menuHeight + 'px';
        }
        else {
            menu.style.top = (clickCoordsY + mouseOffset) + 'px';
        }
        var sizes = ContextUtil.getSizes(menu);
        if ((windowWidth - clickCoordsX) < sizes.width) {
            menu.classList.add('cm_border_right');
        }
        else {
            menu.classList.remove('cm_border_right');
        }
        if ((windowHeight - clickCoordsY) < sizes.height) {
            menu.classList.add('cm_border_bottom');
        }
        else {
            menu.classList.remove('cm_border_bottom');
        }
        menu.classList.add('display');
        if (ContextUtil.getProperty(this.options, 'close_on_click', true)) {
            window.addEventListener('click', function () { _this.documentClick(); });
        }
        e.preventDefault();
    };
    ContextMenu.prototype.documentClick = function () {
        this.hide();
    };
    ContextMenu.count = 0;
    ContextMenu.DIVIDER = 'cm_divider';
    return ContextMenu;
}());
exports.ContextMenu = ContextMenu;
var ContextUtil = /** @class */ (function () {
    function ContextUtil() {
    }
    ContextUtil.getProperty = function (options, opt, def) {
        if (typeof options[opt] !== 'undefined') {
            return options[opt];
        }
        else {
            return def;
        }
    };
    ContextUtil.getSizes = function (obj) {
        var lis = obj.getElementsByTagName('li');
        var widthDef = 0;
        var heightDef = 0;
        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            if (li.offsetWidth > widthDef) {
                widthDef = li.offsetWidth;
            }
            if (li.offsetHeight > heightDef) {
                heightDef = li.offsetHeight;
            }
        }
        var width = widthDef;
        var height = heightDef;
        for (var i_1 = 0; i_1 < lis.length; i_1++) {
            var li_1 = lis[i_1];
            var ul = li_1.getElementsByTagName('ul');
            if (typeof ul[0] !== 'undefined') {
                var ulSize = ContextUtil.getSizes(ul[0]);
                if (widthDef + ulSize.width > width) {
                    width = widthDef + ulSize.width;
                }
                if (heightDef + ulSize.height > height) {
                    height = heightDef + ulSize.height;
                }
            }
        }
        return {
            'width': width,
            'height': height
        };
    };
    return ContextUtil;
}());
exports.ContextUtil = ContextUtil;
var MyHTMLLIElement = /** @class */ (function (_super) {
    __extends(MyHTMLLIElement, _super);
    function MyHTMLLIElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyHTMLLIElement;
}(HTMLLIElement));


/***/ }),

/***/ "./src/dateutils.ts":
/*!**************************!*\
  !*** ./src/dateutils.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var stringutils_1 = __webpack_require__(/*! ./stringutils */ "./src/stringutils.ts");
var DateUtils = /** @class */ (function () {
    function DateUtils() {
    }
    /**
     * Дни от РХ в год, месяц, день
     * @param days день от РХ
     */
    DateUtils.YMDFromAD = function (days) {
        var d = 0;
        var yr, delta;
        if (days > 0) {
            delta = yr = 1;
        }
        else if (days < 0) {
            delta = yr = -1;
        }
        else {
            return null;
        }
        var abs_days = Math.abs(days);
        while (Math.abs(d) < abs_days) {
            if (DateUtils.leapYear(yr)) {
                d += (366 * delta);
            }
            else {
                d += (365 * delta);
            }
            yr += delta;
        }
        // отматываем год назад
        yr -= delta;
        if (DateUtils.leapYear(yr)) {
            d -= (366 * delta);
        }
        else {
            d -= (365 * delta);
        }
        var dth0;
        if (DateUtils.leapYear(yr)) {
            dth0 = this.dth_leap;
        }
        else {
            dth0 = this.dth;
        }
        var mth = 0;
        while (Math.abs(d) < abs_days) {
            d += (dth0[mth] * delta);
            mth++;
        }
        mth--;
        d -= (dth0[mth] * delta);
        var ds = Math.abs(days) - Math.abs(d);
        return { year: yr, month: mth + 1, day: ds };
    };
    /**
     * День от Рождества Христова + -
     * @param year может быть с минусом
     * @param month 1-12
     * @param day
     */
    DateUtils.DaysFromAD = function (_year, month, day) {
        var year = Math.abs(_year);
        var days_from_Crismas = 0;
        for (var i = 1; i < year; i++) {
            if (DateUtils.leapYear(i)) {
                days_from_Crismas += 366;
            }
            else {
                days_from_Crismas += 365;
            }
        }
        if (DateUtils.leapYear(year)) {
            this.dth_leap.slice(0, month - 1).forEach(function (s) {
                days_from_Crismas += s;
            });
        }
        else {
            this.dth.slice(0, month - 1).forEach(function (s) {
                days_from_Crismas += s;
            });
        }
        return (days_from_Crismas + day) * (year / _year);
    };
    DateUtils.getCurDate = function () {
        var dt = new Date();
        return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    };
    DateUtils.getDateAgo = function (date, days) {
        var dateCopy = new Date(date);
        dateCopy.setDate(dateCopy.getDate() + days);
        return dateCopy;
    };
    DateUtils.formatDate = function (dt) {
        return stringutils_1.stringUtils.pad(dt.getDate(), 2) + '.' + stringutils_1.stringUtils.pad(dt.getMonth() + 1, 2) + '.' + (dt.getFullYear() + '').substring(2);
    };
    DateUtils.getMonthFromDate = function (dt) {
        return (dt.getFullYear() - 1) * 12 + dt.getMonth() + 1;
    };
    DateUtils.getYearFromDate = function (dt) {
        return dt.getFullYear();
    };
    DateUtils.getDecadeFromDate = function (dt) {
        return Math.floor(dt.getFullYear() / 10) + 1;
    };
    DateUtils.getCenturyFromDate = function (dt) {
        return Math.floor(dt.getFullYear() / 100) + 1;
    };
    DateUtils.getDecade = function (century, decade) {
        return (century - 1) * 10 + decade + 1;
    };
    DateUtils.formatMonth = function (period) {
        var year = Math.floor((period - 1) / 12) + 1;
        var month = period - (year - 1) * 12;
        return this.mth[month - 1] + ' ' + stringutils_1.stringUtils.pad(year, 4);
    };
    DateUtils.formatYear = function (period) {
        return period.toString();
    };
    DateUtils.formatDecade = function (period) {
        var century = Math.floor((period - 1) / 10) + 1;
        var decade = period - (century - 1) * 10;
        return romanize(century) + ' ' + (decade - 1) * 10 + 'е';
    };
    DateUtils.formatCentury = function (num) {
        return romanize(num);
    };
    DateUtils.getDecadeComponent = function (decade) {
        var century = Math.floor((decade - 1) / 10) + 1;
        return decade - (century - 1) * 10;
    };
    DateUtils.leapYear = function (year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    };
    DateUtils.mth = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'];
    DateUtils.dth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    DateUtils.dth_leap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return DateUtils;
}());
exports.DateUtils = DateUtils;
function romanize(num) {
    if (!+num) {
        return null;
    }
    var digits = String(+num).split('');
    var key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
        '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
        '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
    var roman = '';
    var i = 3;
    while (i--) {
        roman = (key[+digits.pop() + (i * 10)] || '') + roman;
    }
    return Array(+digits.join('') + 1).join('M') + roman;
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var timeline_1 = __webpack_require__(/*! ./timeline */ "./src/timeline.ts");
var colorutils_1 = __webpack_require__(/*! ./colorutils */ "./src/colorutils.ts");
var contextmenu_1 = __webpack_require__(/*! ./contextmenu */ "./src/contextmenu.ts");
var LogonHandlers_1 = __webpack_require__(/*! ./LogonHandlers */ "./src/LogonHandlers.ts");
var RegisterHandlers_1 = __webpack_require__(/*! ./RegisterHandlers */ "./src/RegisterHandlers.ts");
var TLEvent_1 = __webpack_require__(/*! ./TLEvent */ "./src/TLEvent.ts");
var dateutils_1 = __webpack_require__(/*! ./dateutils */ "./src/dateutils.ts");
var MIN_GAP = 100;
var PERIOD_TYPE = TLEvent_1.EnumPeriod.day;
var HTOP = 56;
var timeLines = [];
var ctx;
(function main() {
    var isDragDrop = false;
    var indLine;
    var menuitems = [
        { id: 'new', text: 'Новая', icon: '<i class="far fa-file"></i>',
            events: { click: OpenNewTLDialog } },
        { id: 'load', text: 'Загрузить', icon: '<i class="far fa-folder-open"></i>',
            events: { click: OpenLoadTLDialog } },
        { id: 'save', text: 'Сохранить', icon: '<i class="far fa-save"></i>',
            enabled: false,
            events: { click: function () { return timeLines[indLine].save(); } } },
        { id: 'line', type: contextmenu_1.ContextMenu.DIVIDER },
        { id: 'period', text: 'Периодичность',
            sub: [
                { id: TLEvent_1.EnumPeriod.day, text: 'День', icon: '<i class="fas fa-angle-down"></i>',
                    events: { click: function () { return SwitchPeriod(menuCtx, TLEvent_1.EnumPeriod.day); } } },
                { id: TLEvent_1.EnumPeriod.month, text: 'Месяц',
                    events: { click: function () { return SwitchPeriod(menuCtx, TLEvent_1.EnumPeriod.month); } } },
                { id: TLEvent_1.EnumPeriod.year, text: 'Год',
                    events: { click: function () { return SwitchPeriod(menuCtx, TLEvent_1.EnumPeriod.year); } } },
                { id: TLEvent_1.EnumPeriod.decade, text: 'Десятилетие',
                    events: { click: function () { return SwitchPeriod(menuCtx, TLEvent_1.EnumPeriod.decade); } } },
                { id: TLEvent_1.EnumPeriod.century, text: 'Век',
                    events: { click: function () { return SwitchPeriod(menuCtx, TLEvent_1.EnumPeriod.century); } } }
            ]
        }
    ];
    var menuCtx = new contextmenu_1.ContextMenu(menuitems);
    //document.getElementById('cm_' + num)
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.onmousedown = function (ev) {
        if (ev.button === 0) {
            var pos = getMousePos(canvas, ev);
            indLine = getIndexLine(pos.y);
            if (indLine !== -1) {
                isDragDrop = true;
                canvas.style.cursor = 'Pointer';
            }
        }
    };
    canvas.onmouseup = function (ev) {
        isDragDrop = false;
        canvas.style.cursor = 'Default';
    };
    canvas.onmousemove = function (ev) {
        var data;
        if (!isDragDrop) {
            for (var i = 0; i < timeLines.length; i++) {
                var pos = getMousePos(canvas, ev);
                data = timeLines[i].getCellValue(pos.x, pos.y);
                if (data !== timeLines[i].curdata) {
                    if (timeLines[i].curdata !== -1) {
                        timeLines[i].offBox();
                    }
                    if (data !== -1) {
                        timeLines[i].onBox(data);
                    }
                    timeLines[i].curdata = data;
                }
            }
        }
        else {
            timeLines[indLine].shift(ev.movementX);
            timeLines[indLine].draw();
        }
    };
    (window.onresize = function () {
        canvas.style.top = HTOP + 'px';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - HTOP;
        drawAll();
    })();
    $('#canvas').on('contextmenu', function (e) {
        var pos = getMousePos(canvas, e);
        indLine = getIndexLine(pos.y);
        var pMenu = menuCtx.menu.find(function (el) { return el.id === 'save'; });
        if (indLine === -1) {
            pMenu.enabled = false;
        }
        else {
            pMenu.enabled = true;
            pMenu.events = {
                'click': function (e) {
                    timeLines[indLine].save();
                }
            };
        }
        menuCtx.reload();
        menuCtx.display(e);
        e.preventDefault();
    });
    $('#newTimeline').click(function (ev) {
        OpenNewTLDialog();
    });
    $('#load').click(function (ev) {
        LoadTimeLine();
    });
    $('#save').click(function (ev) {
        alert('save');
    });
    $('#options').click(function (ev) {
        $('#typePeriod').val(TLEvent_1.EnumPeriod.year);
        $('#tmOptionsModal').modal();
    });
    $('#btnNewName').click(function (ev) {
        $('#tmNameModal').modal('hide');
        NewTimeLine($('#tmName').val());
    });
    $('.closenamemodal').click(function (ev) {
        $('#tmNameModal').modal('hide');
    });
    $('.closeoptionmodal').click(function (ev) {
        $('#tmOptionsModal').modal('hide');
    });
    $('.closeregistermodal').click(function (ev) {
        $('#tmRegisterModal').modal('hide');
    });
    $('.closeloginmodal').click(function (ev) {
        $('#tmLoginModal').modal('hide');
    });
    $('.closeloadmodal').click(function (ev) {
        $('#tmLoadModal').modal('hide');
    });
    $('#tmName').keyup(function (ev) {
        if ($('#tmName').val().trim() !== '') {
            $('#btnNewName').prop('disabled', false);
            if (ev.keyCode === 13) {
                $('#tmNameModal').modal('hide');
                NewTimeLine($('#tmName').val());
            }
        }
        else {
            $('#btnNewName').prop('disabled', true);
        }
    });
    $('#tmNameModal').on('shown.bs.modal', function () {
        $('#tmName').trigger('focus');
    });
    $('#action01').click(function (ev) {
        alert('action01');
    });
    $('#regPassword1').focus(function (ev) {
        $('#passw_not_matches').css('display', 'none');
    });
    $('#regPassword2').focus(function (ev) {
        $('#passw_not_matches').css('display', 'none');
    });
    $('#logPassword').focus(function (ev) {
        $('#log_server_error').css('display', 'none');
    });
    // Открытие окна регистрации пользователя btnReg
    $('#btnReg').click(RegisterHandlers_1.RegisterHandlers.OpenRegisterWindow);
    // Регистрация пользователя btnRegisterUser
    $('#btnRegisterUser').click(RegisterHandlers_1.RegisterHandlers.RegisterUser);
    // Открытие окна входа пользователя btnLogin
    $('#btnLogin').click(LogonHandlers_1.LogonHandlers.OpenLogonWindow);
    // Вход пользователя btnLoginUser
    $('#btnLoginUser').click(LogonHandlers_1.LogonHandlers.LoginLogout);
    // Загрузка TL btnLoadTL
    $('#btnLoadTL').click(LoadTimeLine);
    var daysFromAD = dateutils_1.DateUtils.DaysFromAD(-1, 1, 1);
    console.log('daysFromAD ' + daysFromAD);
    var qq = dateutils_1.DateUtils.YMDFromAD(daysFromAD);
    console.log(qq);
})();
function LoadTimeLine() {
    $.ajax('api/storage/load', { data: {
            fname: $('#files_list').val()
        }
    })
        .done(function (data) {
        var tldata = new TLEvent_1.TimeLineData(JSON.parse(data));
        var tl = new timeline_1.TimeLine(ctx);
        tl.name = tldata.Name;
        tl.tldata = tldata;
        NewTimeLine(tldata.Name, tl);
        $('#tmLoadModal').modal('hide');
    })
        .fail(function (data) {
        alert('Ошибка загрузки\n'
            + data.status.toString() + ' '
            + data.statusText + '\n'
            + data.responseText);
    });
}
function OpenLoadTLDialog() {
    timeline_1.TimeLine.getList()
        .then(function (value) {
        var files_list = $('#files_list');
        files_list.find('option').remove();
        for (var i = 0; i < value.length; i++) {
            files_list.append($('<option></option>', { value: value[i], text: value[i] }));
        }
        $('#tmLoadModal').modal();
    })
        .catch(function (responseText) {
        alert('Ошибка сервера.\n' + responseText);
    });
    //let tl = TimeLine.load(ctx)
    //NewTimeLine(tl.name, tl)
}
function NewTimeLine(name, tl) {
    if (tl === void 0) { tl = null; }
    var aY;
    if ((((timeLines.length + 2) * MIN_GAP) + (timeLines.length + 1) * timeline_1.TimeLine.LINE_THICKNESS) > ctx.canvas.clientHeight) {
        alert('Достигнуто максимальное количество линий времени');
        return;
    }
    else {
        aY = splitWorkspace(timeLines.length + 1);
    }
    var dt = timeline_1.TimeLine.getCurPeriod(PERIOD_TYPE);
    var nColor = colorutils_1.makeColor();
    if (tl === null) {
        tl = new timeline_1.TimeLine(ctx, dt, 0, 0, PERIOD_TYPE, name);
    }
    timeLines.push(tl);
    for (var i = 0; i < timeLines.length; i++) {
        timeLines[i].y = aY[i];
        timeLines[i].color = nColor.next().value;
    }
    drawAll();
}
function splitWorkspace(n) {
    var rt = [];
    var m = (ctx.canvas.clientHeight - n * timeline_1.TimeLine.LINE_THICKNESS) / (n + 1) + 0.5;
    for (var i = 0, y = m; i < n; i++, y += (m + timeline_1.TimeLine.LINE_THICKNESS)) {
        rt.push(y);
    }
    return rt;
}
function getIndexLine(y) {
    for (var i = 0; i < timeLines.length; i++) {
        if (y >= timeLines[i].y && y < timeLines[i].y + timeline_1.TimeLine.LINE_THICKNESS) {
            return i;
        }
    }
    return -1;
}
function drawAll() {
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    for (var i = 0; i < timeLines.length; i++) {
        timeLines[i].Period = PERIOD_TYPE;
        timeLines[i].draw();
    }
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function OpenNewTLDialog() {
    $('#tmName').val('');
    $('#btnNewName').prop('disabled', true);
    $('#tmNameModal').modal();
}
function SwitchPeriod(menuCtx, idPeriod) {
    menuCtx.menu.find(function (el) { return el.id === 'period'; }).sub.forEach(function (el, nd, arr) {
        if (el.id === idPeriod) {
            el.icon = '<i class="fas fa-angle-down"></i>';
        }
        else {
            el.icon = '';
        }
    });
    PERIOD_TYPE = idPeriod;
    drawAll();
    menuCtx.reload();
}


/***/ }),

/***/ "./src/saagraph.ts":
/*!*************************!*\
  !*** ./src/saagraph.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.saaGraph = (function () {
    return {
        roundedRect: function (ctx, x, y, width, height, radius) {
            ctx.beginPath();
            ctx.moveTo(x, y + radius);
            ctx.lineTo(x, y + height);
            ctx.lineTo(x + width, y + height);
            ctx.lineTo(x + width, y + radius);
            ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
            ctx.lineTo(x + radius, y);
            ctx.quadraticCurveTo(x, y, x, y + radius);
            ctx.fill();
        }
    };
})();


/***/ }),

/***/ "./src/stringutils.ts":
/*!****************************!*\
  !*** ./src/stringutils.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.stringUtils = (function () {
    return {
        pad: function (num, size) {
            var s = num + '';
            while (s.length < size)
                s = '0' + s;
            return s;
        }
    };
})();


/***/ }),

/***/ "./src/timeline.ts":
/*!*************************!*\
  !*** ./src/timeline.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dateutils_1 = __webpack_require__(/*! ./dateutils */ "./src/dateutils.ts");
var saagraph_1 = __webpack_require__(/*! ./saagraph */ "./src/saagraph.ts");
var TLEvent_1 = __webpack_require__(/*! ./TLEvent */ "./src/TLEvent.ts");
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


/***/ })

/******/ });
//# sourceMappingURL=main.js.map