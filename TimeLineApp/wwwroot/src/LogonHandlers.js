"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Globals_1 = require("./Globals");
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
//# sourceMappingURL=LogonHandlers.js.map