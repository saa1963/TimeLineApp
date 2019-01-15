import { TimeLine } from './timeline';
import { makeColor } from './colorutils';
import { ContextMenu } from './contextmenu';
import { LogonHandlers } from './LogonHandlers';
import { RegisterHandlers } from './RegisterHandlers';
import { TimeLineData, EnumPeriod } from './TLEvent';
const MIN_GAP = 100;
let PERIOD_TYPE = EnumPeriod.day;
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
        { id: 'line', type: ContextMenu.DIVIDER },
        { id: 'period', text: 'Периодичность',
            sub: [
                { id: EnumPeriod.day, text: 'День', icon: '<i class="fas fa-angle-down"></i>',
                    events: { click: () => SwitchPeriod(menuCtx, EnumPeriod.day) } },
                { id: EnumPeriod.month, text: 'Месяц',
                    events: { click: () => SwitchPeriod(menuCtx, EnumPeriod.month) } },
                { id: EnumPeriod.year, text: 'Год',
                    events: { click: () => SwitchPeriod(menuCtx, EnumPeriod.year) } },
                { id: EnumPeriod.decade, text: 'Десятилетие',
                    events: { click: () => SwitchPeriod(menuCtx, EnumPeriod.decade) } },
                { id: EnumPeriod.century, text: 'Век',
                    events: { click: () => SwitchPeriod(menuCtx, EnumPeriod.century) } }
            ]
        }
    ];
    let menuCtx = new ContextMenu(menuitems);
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
        $('#typePeriod').val(EnumPeriod.year);
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
    $('#btnReg').click(RegisterHandlers.OpenRegisterWindow);
    // Регистрация пользователя btnRegisterUser
    $('#btnRegisterUser').click(RegisterHandlers.RegisterUser);
    // Открытие окна входа пользователя btnLogin
    $('#btnLogin').click(LogonHandlers.OpenLogonWindow);
    // Вход пользователя btnLoginUser
    $('#btnLoginUser').click(LogonHandlers.LoginLogout);
    // Загрузка TL btnLoadTL
    $('#btnLoadTL').click(LoadTimeLine);
})();
function LoadTimeLine() {
    $.ajax('api/storage/load', { data: {
            fname: $('#files_list').val()
        }
    })
        .done(data => {
        let tldata = new TimeLineData(JSON.parse(data));
        let tl = new TimeLine(ctx);
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
    TimeLine.getList()
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
    if ((((timeLines.length + 2) * MIN_GAP) + (timeLines.length + 1) * TimeLine.LINE_THICKNESS) > ctx.canvas.clientHeight) {
        alert('Достигнуто максимальное количество линий времени');
        return;
    }
    else {
        aY = splitWorkspace(timeLines.length + 1);
    }
    let dt = TimeLine.getCurPeriod(PERIOD_TYPE);
    let nColor = makeColor();
    if (tl === null) {
        tl = new TimeLine(ctx, dt, 0, 0, PERIOD_TYPE, name);
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
    let m = (ctx.canvas.clientHeight - n * TimeLine.LINE_THICKNESS) / (n + 1) + 0.5;
    for (let i = 0, y = m; i < n; i++, y += (m + TimeLine.LINE_THICKNESS)) {
        rt.push(y);
    }
    return rt;
}
function getIndexLine(y) {
    for (let i = 0; i < timeLines.length; i++) {
        if (y >= timeLines[i].y && y < timeLines[i].y + TimeLine.LINE_THICKNESS) {
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
//# sourceMappingURL=index.js.map