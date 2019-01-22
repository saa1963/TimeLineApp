define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Globals {
        static getCookie(name) {
            let c = document.cookie;
            var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }
    }
    Globals.IsAuthentificated = false;
    exports.Globals = Globals;
});

define(["require", "exports", "./Globals"], function (require, exports, Globals_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LogonHandlers {
        // Открытие окна входа пользователя
        static OpenLogonWindow() {
            if (!Globals_1.Globals.IsAuthentificated) {
                $('#logLogin').val(Globals_1.Globals.getCookie('timelineuser') || '');
                $('#logPassword').val('');
                $('#tmLoginModal').modal();
                $('#log_server_error').css('display', 'none');
            }
            else {
                $.ajax('api/register/logout')
                    .done(data => {
                    if (data) {
                        Globals_1.Globals.IsAuthentificated = false;
                        $('#btnLogin').text('Вход');
                        $('#lblUser').css('display', 'none');
                        $('#lblUser').text('');
                    }
                });
            }
            return false;
        }
        // Вход пользователя
        static LoginLogout() {
            if ($('#logLogin')[0].reportValidity()
                && $('#logPassword')[0].reportValidity()) {
                $.ajax('api/register/log', {
                    type: 'POST',
                    data: {
                        Login: $('#logLogin').val(),
                        Password: $('#logPassword').val()
                    }
                })
                    .done(data => {
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
        }
    }
    exports.LogonHandlers = LogonHandlers;
});

define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RegisterHandlers {
        static OpenRegisterWindow() {
            $('#regLogin').val('');
            $('#regEmail').val('');
            $('#regPassword1').val('');
            $('#regPassword2').val('');
            $('#tmRegisterModal').modal();
            $('#passw_not_matches').css('display', 'none');
            $('#reg_server_error').css('display', 'none');
            return false;
        }
        static RegisterUser() {
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
                        .done(data => {
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
        }
    }
    exports.RegisterHandlers = RegisterHandlers;
});

define(["require", "exports", "./dateutils"], function (require, exports, dateutils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EnumPeriod;
    (function (EnumPeriod) {
        EnumPeriod[EnumPeriod["day"] = 1] = "day";
        EnumPeriod[EnumPeriod["month"] = 2] = "month";
        EnumPeriod[EnumPeriod["year"] = 3] = "year";
        EnumPeriod[EnumPeriod["decade"] = 4] = "decade";
        EnumPeriod[EnumPeriod["century"] = 5] = "century";
    })(EnumPeriod = exports.EnumPeriod || (exports.EnumPeriod = {}));
    class TLDate {
        constructor(year, month, day, fromCrismas) {
            if (fromCrismas === undefined) {
                if (year == 0)
                    throw new Error('Год равен 0');
                if (month > 12 || month < 1)
                    throw new Error('Неверный месяц месяца');
                if (day < 1)
                    throw new Error('День меньше 1');
                if (this.Includes([1, 3, 5, 7, 8, 10, 12], month)) {
                    if (day > 31)
                        throw new Error('Неверный день месяца');
                }
                else if (this.Includes([4, 6, 9, 11], month)) {
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
                this.FromCrismas = fromCrismas;
                let temp = dateutils_1.DateUtils.YMDFromAD(fromCrismas);
                this.Day = temp.day;
                this.Month = temp.month;
                this.Year = temp.year;
            }
        }
        Includes(arr, value) {
            arr.forEach((v) => {
                if (v === value)
                    return true;
            });
            return false;
        }
        Greater(o) {
            return this.FromCrismas > o.FromCrismas;
        }
        GreaterOrEqual(o) {
            return this.FromCrismas >= o.FromCrismas;
        }
        Less(o) {
            return this.FromCrismas < o.FromCrismas;
        }
        LessOrEqual(o) {
            return this.FromCrismas <= o.FromCrismas;
        }
        Equal(o) {
            return this.FromCrismas === o.FromCrismas;
        }
        AddDays(n) {
            return new TLDate(null, null, null, this.FromCrismas + n);
        }
        AddMonths(n) {
            let rt;
            let mth;
            let mmn = dateutils_1.DateUtils.makeMonthNumber(this.Year, this.Month, n < 0);
            for (let i = 0; i < n; i++) {
                mth = mmn.next().value;
            }
            let day = this.Day;
            while (true) {
                try {
                    rt = new TLDate(mth.year, mth.month, day);
                    break;
                }
                catch (ex) {
                    day--;
                    continue;
                }
            }
            return rt;
        }
    }
    class TLEvent {
        constructor(name) {
            this.Name = name;
            this.Day = null;
            this.Month = null;
            this.Year = null;
            this.Decade = null;
            this.Century = null;
        }
        DecadeFromYear(year) {
            return year / 10 + (year / Math.abs(year));
        }
        CenturyFromDecade(decade) {
            return decade / 10 + (decade / Math.abs(decade));
        }
        YearFromMonth(month) {
            return (month - 1) / 12 + (month / Math.abs(month));
        }
        static GetType(o) {
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
        }
        /**
         * Попадает ли событие this в текущее значение ОВ
         * @param period
         * Текущая дробность отображения для ЛВ
         * @param vl
         * Текущее значение ОВ, которое в данный момент отрисовывается
         */
        static Equal(o1, o2) {
            let rt = false;
            if (o1.Century === o2.Century
                && o1.Decade === o2.Decade
                && o1.Year === o2.Year
                && o1.Month === o2.Month
                && o1.Day.Year === o2.Day.Year
                && o1.Day.Month === o2.Day.Month
                && o1.Day.Day === o2.Day.Day)
                rt = true;
            return rt;
        }
    }
    exports.TLEvent = TLEvent;
    class TLEventDay extends TLEvent {
        constructor(name, year, month, day) {
            super(name);
            this.Day = new TLDate(year, month, day);
            this.Month = ((Math.abs(year) - 1) * 12 + month) * (year / Math.abs(year));
            this.Year = year;
            this.Decade = this.DecadeFromYear(year);
            this.Century = this.CenturyFromDecade(this.Decade);
            this.Type = EnumPeriod.day;
        }
    }
    exports.TLEventDay = TLEventDay;
    class TLEventMonth extends TLEvent {
        constructor(name, par1, par2) {
            super(name);
            if (par2 !== undefined) {
                let year = par1;
                let month = par2;
                this.Month = ((Math.abs(year) - 1) * 12 + month) * (year / Math.abs(year));
                this.Year = year;
                this.Decade = this.DecadeFromYear(year);
                this.Century = this.CenturyFromDecade(this.Decade);
            }
            else {
                let month = par1;
                this.Month = month;
                this.Year = this.YearFromMonth(month);
                this.Decade = this.DecadeFromYear(this.Year);
                this.Century = this.CenturyFromDecade(this.Decade);
            }
            this.Type = EnumPeriod.month;
        }
    }
    exports.TLEventMonth = TLEventMonth;
    class TLEventYear extends TLEvent {
        constructor(name, year) {
            super(name);
            this.Year = year;
            this.Decade = this.DecadeFromYear(year);
            this.Century = this.CenturyFromDecade(this.Decade);
            this.Type = EnumPeriod.year;
        }
    }
    exports.TLEventYear = TLEventYear;
    class TLEventDecade extends TLEvent {
        constructor(name, par1, par2) {
            super(name);
            if (par2 !== undefined) {
                let century = par1;
                let decade = par2;
                if (decade < 0 || decade > 9)
                    throw Error('Неверный номер десятилетия');
                this.Decade = ((Math.abs(century) - 1) * 10 + decade + 1) * (century / Math.abs(century));
                this.Century = century;
            }
            else {
                let decade = par1;
                this.Decade = decade;
                this.Century = this.CenturyFromDecade(decade);
            }
            this.Type = EnumPeriod.decade;
        }
    }
    exports.TLEventDecade = TLEventDecade;
    class TLEventCentury extends TLEvent {
        constructor(name, century) {
            super(name);
            this.Century = century;
            this.Type = EnumPeriod.century;
        }
    }
    exports.TLEventCentury = TLEventCentury;
    class TLPeriod {
        constructor(o) {
            this.Name = o.Name;
            let type;
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
        Contains(period, vl) {
            let rt = false;
            switch (period) {
                case EnumPeriod.day:
                    let dt = vl;
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
        }
        /**
         *
         * @param dt отображаемый ОВ
         * @param this объект насчет которого принимается решение включать или нет
         */
        ContainsDay(dt) {
            let dt1, dt2;
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
        }
    }
    exports.TLPeriod = TLPeriod;
    class TimeLineData {
        constructor(o) {
            /** Здесь только события с конкретными датами */
            //Events: TLEvent[] = []
            /** Здесь периоды, события у которых нет конкретной даты тоже относятся к периодам */
            this.Periods = [];
            this.Name = o.Name;
            o.Periods.forEach(data => {
                if (TLEvent.Equal(data.Begin, data.End))
                    this.Periods.push(new TLPeriodEvent(data));
                else
                    this.Periods.push(new TLPeriod(data));
            });
        }
    }
    exports.TimeLineData = TimeLineData;
    class TLPeriodEvent extends TLPeriod {
        constructor(o) {
            super(o);
        }
    }
    exports.TLPeriodEvent = TLPeriodEvent;
});

define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeColor = function* () {
        var index = 0;
        let colors = ['magenta', 'green', 'rgba(255, 0, 0, 1.0)', 'blue', 'magenta', 'orange'];
        while (true) {
            yield colors[index];
            if (index < 4) {
                index++;
            }
            else {
                index = 0;
            }
        }
    };
});

define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ContextMenu {
        constructor(menu, options) {
            this.contextTarget = null;
            let num = ContextMenu.count++;
            this.menu = menu;
            if (options == undefined)
                this.options = {};
            else
                this.options = options;
            window.addEventListener('resize', () => this.onresize());
            this.reload();
        }
        onresize() {
            if (ContextUtil.getProperty(this.options, 'close_on_resize', true)) {
                this.hide();
            }
        }
        hide() {
            document.getElementById('cm_' + ContextMenu.count).classList.remove('display');
            window.removeEventListener('click', () => this.documentClick());
        }
        setOptions(_options) {
            this.options = _options;
        }
        changeOption(option, value) {
            this.options[option] = value;
        }
        //getOptions() {
        //  return this.options
        //}
        reload() {
            if (document.getElementById('cm_' + ContextMenu.count) == null) {
                var cnt = document.createElement('div');
                cnt.className = 'cm_container';
                cnt.id = 'cm_' + ContextMenu.count;
                document.body.appendChild(cnt);
            }
            var container = document.getElementById('cm_' + ContextMenu.count);
            container.innerHTML = '';
            container.appendChild(this.renderLevel(this.menu));
        }
        renderLevel(level) {
            var ulOuter = document.createElement('ul');
            level.forEach((item) => {
                let li = document.createElement('li');
                li.menu = this;
                if (typeof item.type === 'undefined') {
                    var iconSpan = document.createElement('span');
                    iconSpan.className = 'cm_icon_span';
                    if (ContextUtil.getProperty(item, 'icon', '') != '') {
                        iconSpan.innerHTML = ContextUtil.getProperty(item, 'icon', '');
                    }
                    else {
                        iconSpan.innerHTML = ContextUtil.getProperty(this.options, 'default_icon', '');
                    }
                    var textSpan = document.createElement('span');
                    textSpan.className = 'cm_text';
                    if (ContextUtil.getProperty(item, 'text', '') != '') {
                        textSpan.innerHTML = ContextUtil.getProperty(item, 'text', '');
                    }
                    else {
                        textSpan.innerHTML = ContextUtil.getProperty(this.options, 'default_text', 'item');
                    }
                    var subSpan = document.createElement('span');
                    subSpan.className = 'cm_sub_span';
                    if (typeof item.sub !== 'undefined') {
                        if (ContextUtil.getProperty(this.options, 'sub_icon', '') != '') {
                            subSpan.innerHTML = ContextUtil.getProperty(this.options, 'sub_icon', '');
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
                            li.appendChild(this.renderLevel(item.sub));
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
        display(e, target) {
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
                window.addEventListener('click', () => { this.documentClick(); });
            }
            e.preventDefault();
        }
        documentClick() {
            this.hide();
        }
    }
    ContextMenu.count = 0;
    ContextMenu.DIVIDER = 'cm_divider';
    exports.ContextMenu = ContextMenu;
    class ContextUtil {
        static getProperty(options, opt, def) {
            if (typeof options[opt] !== 'undefined') {
                return options[opt];
            }
            else {
                return def;
            }
        }
        static getSizes(obj) {
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
            for (let i = 0; i < lis.length; i++) {
                let li = lis[i];
                var ul = li.getElementsByTagName('ul');
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
        }
    }
    exports.ContextUtil = ContextUtil;
    class MyHTMLLIElement extends HTMLLIElement {
    }
});

define(["require", "exports", "./stringutils"], function (require, exports, stringutils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DateUtils {
        /**
         * Дни от РХ в год, месяц, день
         * @param days день от РХ
         */
        static YMDFromAD(days) {
            let d = 0;
            let yr, delta;
            if (days > 0) {
                delta = yr = 1;
            }
            else if (days < 0) {
                delta = yr = -1;
            }
            else {
                return null;
            }
            let abs_days = Math.abs(days);
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
            let dth0;
            if (DateUtils.leapYear(yr)) {
                dth0 = this.dth_leap;
            }
            else {
                dth0 = this.dth;
            }
            let mth = 0;
            while (Math.abs(d) < abs_days) {
                d += (dth0[mth] * delta);
                mth++;
            }
            mth--;
            d -= (dth0[mth] * delta);
            let ds = Math.abs(days) - Math.abs(d);
            return { year: yr, month: mth + 1, day: ds };
        }
        /**
         * День от Рождества Христова + -
         * @param year может быть с минусом
         * @param month 1-12
         * @param day
         */
        static DaysFromAD(_year, month, day) {
            let year = Math.abs(_year);
            let days_from_Crismas = 0;
            for (let i = 1; i < year; i++) {
                if (DateUtils.leapYear(i)) {
                    days_from_Crismas += 366;
                }
                else {
                    days_from_Crismas += 365;
                }
            }
            if (DateUtils.leapYear(year)) {
                this.dth_leap.slice(0, month - 1).forEach(s => {
                    days_from_Crismas += s;
                });
            }
            else {
                this.dth.slice(0, month - 1).forEach(s => {
                    days_from_Crismas += s;
                });
            }
            return (days_from_Crismas + day) * (year / _year);
        }
        static getCurDate() {
            let dt = new Date();
            return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
        }
        static getDateAgo(date, days) {
            var dateCopy = new Date(date);
            dateCopy.setDate(dateCopy.getDate() + days);
            return dateCopy;
        }
        static formatDate(dt) {
            return stringutils_1.stringUtils.pad(dt.getDate(), 2) + '.' + stringutils_1.stringUtils.pad(dt.getMonth() + 1, 2) + '.' + (dt.getFullYear() + '').substring(2);
        }
        static getMonthFromDate(dt) {
            return (dt.getFullYear() - 1) * 12 + dt.getMonth() + 1;
        }
        static getNumberFromMonth(year, month) {
            let rt;
            let delta = year / Math.abs(year);
            rt = (year - delta) * 12 + (month * delta);
            return rt;
        }
        static getMonthFromNumber(num) {
            let year;
            let month;
            let rt;
            if (num > 0) {
                year = Math.floor(num / 12);
                rt = { year: year + 1, month: num - year * 12 };
            }
            else {
                year = Math.ceil(num / 12);
                rt = { year: year - 1, month: Math.abs(num) - Math.abs(year * 12) };
            }
            return rt;
        }
        static getYearFromDate(dt) {
            return dt.getFullYear();
        }
        static getDecadeFromDate(dt) {
            return Math.floor(dt.getFullYear() / 10) + 1;
        }
        static getCenturyFromDate(dt) {
            return Math.floor(dt.getFullYear() / 100) + 1;
        }
        static getDecade(century, decade) {
            return (century - 1) * 10 + decade + 1;
        }
        static formatMonth(period) {
            let year = Math.floor((period - 1) / 12) + 1;
            let month = period - (year - 1) * 12;
            return this.mth[month - 1] + ' ' + stringutils_1.stringUtils.pad(year, 4);
        }
        static formatYear(period) {
            return period.toString();
        }
        static formatDecade(period) {
            let century = Math.floor((period - 1) / 10) + 1;
            let decade = period - (century - 1) * 10;
            return romanize(century) + ' ' + (decade - 1) * 10 + 'е';
        }
        static formatCentury(num) {
            return romanize(num);
        }
        static getDecadeComponent(decade) {
            let century = Math.floor((decade - 1) / 10) + 1;
            return decade - (century - 1) * 10;
        }
        static leapYear(year) {
            return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
        }
    }
    DateUtils.mth = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'];
    DateUtils.dth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    DateUtils.dth_leap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    DateUtils.makeMonthNumber = function* (_initYear, _initMonth, reverse = false) {
        let delta = reverse ? -1 : 1;
        let absinitYear = Math.abs(_initYear);
        let init = DateUtils.getNumberFromMonth(_initYear, _initMonth);
        while (true) {
            init += delta;
            if (init === 0) {
                init += delta;
            }
            yield DateUtils.getMonthFromNumber(init);
        }
    };
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
});

define(["require", "exports", "./timeline", "./colorutils", "./contextmenu", "./LogonHandlers", "./RegisterHandlers", "./TLEvent"], function (require, exports, timeline_1, colorutils_1, contextmenu_1, LogonHandlers_1, RegisterHandlers_1, TLEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const MIN_GAP = 100;
    let PERIOD_TYPE = TLEvent_1.EnumPeriod.day;
    const HTOP = 56;
    let timeLines = [];
    let ctx;
    (function main() {
        let isDragDrop = false;
        let indLine;
        let menuitems = [
            { id: 'new', text: 'Новая', icon: '<i class="far fa-file"></i>',
                events: { click: OpenNewTLDialog } },
            { id: 'load', text: 'Загрузить', icon: '<i class="far fa-folder-open"></i>',
                events: { click: OpenLoadTLDialog } },
            { id: 'save', text: 'Сохранить', icon: '<i class="far fa-save"></i>',
                enabled: false,
                events: { click: () => timeLines[indLine].save() } },
            { id: 'line', type: contextmenu_1.ContextMenu.DIVIDER },
            { id: 'period', text: 'Периодичность',
                sub: [
                    { id: TLEvent_1.EnumPeriod.day, text: 'День', icon: '<i class="fas fa-angle-down"></i>',
                        events: { click: () => SwitchPeriod(menuCtx, TLEvent_1.EnumPeriod.day) } },
                    { id: TLEvent_1.EnumPeriod.month, text: 'Месяц',
                        events: { click: () => SwitchPeriod(menuCtx, TLEvent_1.EnumPeriod.month) } },
                    { id: TLEvent_1.EnumPeriod.year, text: 'Год',
                        events: { click: () => SwitchPeriod(menuCtx, TLEvent_1.EnumPeriod.year) } },
                    { id: TLEvent_1.EnumPeriod.decade, text: 'Десятилетие',
                        events: { click: () => SwitchPeriod(menuCtx, TLEvent_1.EnumPeriod.decade) } },
                    { id: TLEvent_1.EnumPeriod.century, text: 'Век',
                        events: { click: () => SwitchPeriod(menuCtx, TLEvent_1.EnumPeriod.century) } }
                ]
            }
        ];
        let menuCtx = new contextmenu_1.ContextMenu(menuitems);
        //document.getElementById('cm_' + num)
        let canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        canvas.onmousedown = (ev) => {
            if (ev.button === 0) {
                let pos = getMousePos(canvas, ev);
                indLine = getIndexLine(pos.y);
                if (indLine !== -1) {
                    isDragDrop = true;
                    canvas.style.cursor = 'Pointer';
                }
            }
        };
        canvas.onmouseup = (ev) => {
            isDragDrop = false;
            canvas.style.cursor = 'Default';
        };
        canvas.onmousemove = (ev) => {
            let data;
            if (!isDragDrop) {
                for (let i = 0; i < timeLines.length; i++) {
                    let pos = getMousePos(canvas, ev);
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
        (window.onresize = () => {
            canvas.style.top = HTOP + 'px';
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - HTOP;
            drawAll();
        })();
        $('#canvas').on('contextmenu', (e) => {
            let pos = getMousePos(canvas, e);
            indLine = getIndexLine(pos.y);
            let pMenu = menuCtx.menu.find(el => el.id === 'save');
            if (indLine === -1) {
                pMenu.enabled = false;
            }
            else {
                pMenu.enabled = true;
                pMenu.events = {
                    'click': (e) => {
                        timeLines[indLine].save();
                    }
                };
            }
            menuCtx.reload();
            menuCtx.display(e);
            e.preventDefault();
        });
        $('#newTimeline').click((ev) => {
            OpenNewTLDialog();
        });
        $('#load').click((ev) => {
            LoadTimeLine();
        });
        $('#save').click((ev) => {
            alert('save');
        });
        $('#options').click((ev) => {
            $('#typePeriod').val(TLEvent_1.EnumPeriod.year);
            $('#tmOptionsModal').modal();
        });
        $('#btnNewName').click((ev) => {
            $('#tmNameModal').modal('hide');
            NewTimeLine($('#tmName').val());
        });
        $('.closenamemodal').click((ev) => {
            $('#tmNameModal').modal('hide');
        });
        $('.closeoptionmodal').click((ev) => {
            $('#tmOptionsModal').modal('hide');
        });
        $('.closeregistermodal').click((ev) => {
            $('#tmRegisterModal').modal('hide');
        });
        $('.closeloginmodal').click((ev) => {
            $('#tmLoginModal').modal('hide');
        });
        $('.closeloadmodal').click((ev) => {
            $('#tmLoadModal').modal('hide');
        });
        $('#tmName').keyup((ev) => {
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
        $('#action01').click((ev) => {
            alert('action01');
        });
        $('#regPassword1').focus(ev => {
            $('#passw_not_matches').css('display', 'none');
        });
        $('#regPassword2').focus(ev => {
            $('#passw_not_matches').css('display', 'none');
        });
        $('#logPassword').focus(ev => {
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
    })();
    function LoadTimeLine() {
        $.ajax('api/storage/load', { data: {
                fname: $('#files_list').val()
            }
        })
            .done(data => {
            let tldata = new TLEvent_1.TimeLineData(JSON.parse(data));
            let tl = new timeline_1.TimeLine(ctx);
            tl.name = tldata.Name;
            tl.tldata = tldata;
            NewTimeLine(tldata.Name, tl);
            $('#tmLoadModal').modal('hide');
        })
            .fail(data => {
            alert('Ошибка загрузки\n'
                + data.status.toString() + ' '
                + data.statusText + '\n'
                + data.responseText);
        });
    }
    function OpenLoadTLDialog() {
        timeline_1.TimeLine.getList()
            .then(value => {
            let files_list = $('#files_list');
            files_list.find('option').remove();
            for (let i = 0; i < value.length; i++) {
                files_list.append($('<option></option>', { value: value[i], text: value[i] }));
            }
            $('#tmLoadModal').modal();
        })
            .catch(responseText => {
            alert('Ошибка сервера.\n' + responseText);
        });
        //let tl = TimeLine.load(ctx)
        //NewTimeLine(tl.name, tl)
    }
    function NewTimeLine(name, tl = null) {
        let aY;
        if ((((timeLines.length + 2) * MIN_GAP) + (timeLines.length + 1) * timeline_1.TimeLine.LINE_THICKNESS) > ctx.canvas.clientHeight) {
            alert('Достигнуто максимальное количество линий времени');
            return;
        }
        else {
            aY = splitWorkspace(timeLines.length + 1);
        }
        let dt = timeline_1.TimeLine.getCurPeriod(PERIOD_TYPE);
        let nColor = colorutils_1.makeColor();
        if (tl === null) {
            tl = new timeline_1.TimeLine(ctx, dt, 0, 0, PERIOD_TYPE, name);
        }
        timeLines.push(tl);
        for (let i = 0; i < timeLines.length; i++) {
            timeLines[i].y = aY[i];
            timeLines[i].color = nColor.next().value;
        }
        drawAll();
    }
    function splitWorkspace(n) {
        let rt = [];
        let m = (ctx.canvas.clientHeight - n * timeline_1.TimeLine.LINE_THICKNESS) / (n + 1) + 0.5;
        for (let i = 0, y = m; i < n; i++, y += (m + timeline_1.TimeLine.LINE_THICKNESS)) {
            rt.push(y);
        }
        return rt;
    }
    function getIndexLine(y) {
        for (let i = 0; i < timeLines.length; i++) {
            if (y >= timeLines[i].y && y < timeLines[i].y + timeline_1.TimeLine.LINE_THICKNESS) {
                return i;
            }
        }
        return -1;
    }
    function drawAll() {
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
        for (let i = 0; i < timeLines.length; i++) {
            timeLines[i].Period = PERIOD_TYPE;
            timeLines[i].draw();
        }
    }
    function getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
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
        menuCtx.menu.find(el => el.id === 'period').sub.forEach((el, nd, arr) => {
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
});

define(["require", "exports"], function (require, exports) {
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
});

define(["require", "exports"], function (require, exports) {
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
});

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
