"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timeline_1 = require("./timeline");
var colorutils_1 = require("./colorutils");
var contextmenu_1 = require("./contextmenu");
var LogonHandlers_1 = require("./LogonHandlers");
var RegisterHandlers_1 = require("./RegisterHandlers");
var TLEvent_1 = require("./TLEvent");
var dateutils_1 = require("./dateutils");
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
    var daysFromAD = dateutils_1.DateUtils.DaysFromAD(1963, 6, 5);
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
//# sourceMappingURL=index.js.map