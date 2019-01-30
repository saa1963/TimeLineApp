"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Globals_1 = require("./Globals");
const $ = require("jquery");
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
//# sourceMappingURL=LogonHandlers.js.map