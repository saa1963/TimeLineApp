"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timeline_1 = require("./timeline");
var colorutils_1 = require("./colorutils");
var contextmenu_1 = require("./contextmenu");
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
            'enabled': false
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
//# sourceMappingURL=index.js.map