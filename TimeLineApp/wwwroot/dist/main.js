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
/* eslint-disable eqeqeq */
function ContextMenu(menu, options) {
    var self = this;
    var num = ContextMenu.count++;
    this.menu = menu;
    this.contextTarget = null;
    if (!(menu instanceof Array)) {
        throw new Error('Parameter 1 must be of type Array');
    }
    if (typeof options !== 'undefined') {
        if (typeof options !== 'object') {
            throw new Error('Parameter 2 must be of type object');
        }
    }
    else {
        options = {};
    }
    window.addEventListener('resize', function () {
        if (exports.ContextUtil.getProperty(options, 'close_on_resize', true)) {
            self.hide();
        }
    });
    this.setOptions = function (_options) {
        if (typeof _options === 'object') {
            options = _options;
        }
        else {
            throw new Error('Parameter 1 must be of type object');
        }
    };
    this.changeOption = function (option, value) {
        if (typeof option === 'string') {
            if (typeof value !== 'undefined') {
                options[option] = value;
            }
            else {
                throw new Error('Parameter 2 must be set');
            }
        }
        else {
            throw new Error('Parameter 1 must be of type string');
        }
    };
    this.getOptions = function () {
        return options;
    };
    this.reload = function () {
        if (document.getElementById('cm_' + num) == null) {
            var cnt = document.createElement('div');
            cnt.className = 'cm_container';
            cnt.id = 'cm_' + num;
            document.body.appendChild(cnt);
        }
        var container = document.getElementById('cm_' + num);
        container.innerHTML = '';
        container.appendChild(renderLevel(menu));
    };
    function renderLevel(level) {
        var ulOuter = document.createElement('ul');
        level.forEach(function (item) {
            var li = document.createElement('li');
            li.menu = self;
            if (typeof item.type === 'undefined') {
                var iconSpan = document.createElement('span');
                iconSpan.className = 'cm_icon_span';
                if (exports.ContextUtil.getProperty(item, 'icon', '') != '') {
                    iconSpan.innerHTML = exports.ContextUtil.getProperty(item, 'icon', '');
                }
                else {
                    iconSpan.innerHTML = exports.ContextUtil.getProperty(options, 'default_icon', '');
                }
                var textSpan = document.createElement('span');
                textSpan.className = 'cm_text';
                if (exports.ContextUtil.getProperty(item, 'text', '') != '') {
                    textSpan.innerHTML = exports.ContextUtil.getProperty(item, 'text', '');
                }
                else {
                    textSpan.innerHTML = exports.ContextUtil.getProperty(options, 'default_text', 'item');
                }
                var subSpan = document.createElement('span');
                subSpan.className = 'cm_sub_span';
                if (typeof item.sub !== 'undefined') {
                    if (exports.ContextUtil.getProperty(options, 'sub_icon', '') != '') {
                        subSpan.innerHTML = exports.ContextUtil.getProperty(options, 'sub_icon', '');
                    }
                    else {
                        subSpan.innerHTML = '&#155;';
                    }
                }
                li.appendChild(iconSpan);
                li.appendChild(textSpan);
                li.appendChild(subSpan);
                if (!exports.ContextUtil.getProperty(item, 'enabled', true)) {
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
                        li.appendChild(renderLevel(item.sub));
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
    }
    this.display = function (e, target) {
        if (typeof target !== 'undefined') {
            self.contextTarget = target;
        }
        else {
            self.contextTarget = e.target;
        }
        var menu = document.getElementById('cm_' + num);
        var clickCoords = { x: e.clientX, y: e.clientY };
        var clickCoordsX = clickCoords.x;
        var clickCoordsY = clickCoords.y;
        var menuWidth = menu.offsetWidth + 4;
        var menuHeight = menu.offsetHeight + 4;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var mouseOffset = parseInt(exports.ContextUtil.getProperty(options, 'mouse_offset', 2));
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
        var sizes = exports.ContextUtil.getSizes(menu);
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
        if (exports.ContextUtil.getProperty(options, 'close_on_click', true)) {
            window.addEventListener('click', documentClick);
        }
        e.preventDefault();
    };
    this.hide = function () {
        document.getElementById('cm_' + num).classList.remove('display');
        window.removeEventListener('click', documentClick);
    };
    function documentClick() {
        self.hide();
    }
    this.reload();
}
exports.ContextMenu = ContextMenu;
ContextMenu.count = 0;
ContextMenu.DIVIDER = 'cm_divider';
exports.DIVIDER = 'cm_divider';
exports.ContextUtil = {
    getProperty: function (options, opt, def) {
        if (typeof options[opt] !== 'undefined') {
            return options[opt];
        }
        else {
            return def;
        }
    },
    getSizes: function (obj) {
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
                var ulSize = exports.ContextUtil.getSizes(ul[0]);
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
    }
};
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
    DateUtils.mth = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'];
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
var MIN_GAP = 100;
var PERIOD_TYPE = timeline_1.EnumPeriod.day;
var HTOP = 56;
var IsAuthentificated = false;
var timeLines = [];
var ctx;
(function main() {
    var isDragDrop = false;
    var indLine;
    var menuitems = [
        {
            'id': 'new',
            'text': 'Новая',
            'icon': '<i class="far fa-file"></i></i>',
            'events': {
                'click': NewTmDialog
            }
        },
        {
            'id': 'load',
            'text': 'Загрузить',
            'icon': '<i class="far fa-folder-open"></i>',
            'events': {
                'click': function (e) {
                    LoadTimeLine();
                }
            }
        },
        {
            'id': 'save',
            'text': 'Сохранить',
            'icon': '<i class="far fa-save"></i>',
            'enabled': false,
            'events': {
                'click': function (e) {
                    timeLines[indLine].save();
                }
            }
        },
        {
            'id': 'line',
            'type': contextmenu_1.DIVIDER
        },
        {
            'id': 'period',
            'text': 'Периодичность',
            'sub': [
                {
                    'id': timeline_1.EnumPeriod.day,
                    'text': 'День',
                    'icon': '<i class="fas fa-angle-down"></i>',
                    'events': {
                        'click': function (e) {
                            SwitchPeriod(menuCtx, timeline_1.EnumPeriod.day);
                        }
                    }
                },
                {
                    'id': timeline_1.EnumPeriod.month,
                    'text': 'Месяц',
                    'events': {
                        'click': function (e) {
                            SwitchPeriod(menuCtx, timeline_1.EnumPeriod.month);
                        }
                    }
                },
                {
                    'id': timeline_1.EnumPeriod.year,
                    'text': 'Год',
                    'events': {
                        'click': function (e) {
                            SwitchPeriod(menuCtx, timeline_1.EnumPeriod.year);
                        }
                    }
                },
                {
                    'id': timeline_1.EnumPeriod.decade,
                    'text': 'Десятилетие',
                    'events': {
                        'click': function (e) {
                            SwitchPeriod(menuCtx, timeline_1.EnumPeriod.decade);
                        }
                    }
                },
                {
                    'id': timeline_1.EnumPeriod.century,
                    'text': 'Век',
                    'events': {
                        'click': function (e) {
                            SwitchPeriod(menuCtx, timeline_1.EnumPeriod.century);
                        }
                    }
                }
            ]
        }
    ];
    var menuCtx = new contextmenu_1.ContextMenu(menuitems);
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
        NewTmDialog();
    });
    $('#load').click(function (ev) {
        LoadTimeLine();
    });
    $('#save').click(function (ev) {
        alert('save');
    });
    $('#options').click(function (ev) {
        $('#typePeriod').val(timeline_1.EnumPeriod.year);
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
    $('#btnReg').click(function (ev) {
        $('#regLogin').val('');
        $('#regEmail').val('');
        $('#regPassword1').val('');
        $('#regPassword2').val('');
        $('#tmRegisterModal').modal();
        $('#passw_not_matches').css('display', 'none');
        $('#reg_server_error').css('display', 'none');
        return false;
    });
    // Регистрация пользователя btnRegisterUser
    $('#btnRegisterUser').click(function (ev) {
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
    });
    // Открытие окна входа пользователя btnLogin
    $('#btnLogin').click(function (ev) {
        if (!IsAuthentificated) {
            $('#logLogin').val('');
            $('#logPassword').val('');
            $('#tmLoginModal').modal();
            $('#log_server_error').css('display', 'none');
        }
        else {
            $.ajax('api/register/logout')
                .done(function (data) {
                if (data) {
                    IsAuthentificated = false;
                    $('#btnLogin').text('Вход');
                    $('#lblUser').css('display', 'none');
                    $('#lblUser').text('');
                }
            });
        }
        return false;
    });
    // Вход пользователя btnLoginUser
    $('#btnLoginUser').click(function (ev) {
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
                    IsAuthentificated = true;
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
    });
})();
function LoadTimeLine() {
    var tl = timeline_1.TimeLine.load(ctx);
    NewTimeLine(tl.name, tl);
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
function NewTmDialog() {
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


/***/ })

/******/ });
//# sourceMappingURL=main.js.map