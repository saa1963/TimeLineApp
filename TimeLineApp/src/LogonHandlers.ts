import { Globals } from './Globals'
//import * as $ from 'jquery'

export class LogonHandlers {
  // Открытие окна входа пользователя
  static OpenLogonWindow(): boolean {
    if (!Globals.IsAuthentificated) {
      $('#logLogin').val(Globals.getCookie('timelineuser') || '')
      $('#logPassword').val('')
      $('#tmLoginModal').modal()
      $('#log_server_error').css('display', 'none')
    } else {
      $.ajax('api/register/logout')
        .done(data => {
          if (data) {
            Globals.IsAuthentificated = false
            $('#btnLogin').text('Вход')
            $('#lblUser').css('display', 'none')
            $('#lblUser').text('')
          }
        })
    }
    return false
  }

  // Вход пользователя
  static LoginLogout(): void {
    if ((<HTMLInputElement>$('#logLogin')[0]).reportValidity()
      && (<HTMLInputElement>$('#logPassword')[0]).reportValidity()) {
      $.ajax('api/register/log', {
        type: 'POST',
        data: {
          Login: $('#logLogin').val(),
          Password: $('#logPassword').val()
        }
      })
        .done(data => {
          if (data === '') {
            Globals.IsAuthentificated = true
            $('#tmLoginModal').modal('hide')
            $('#btnLogin').text('Выход')
            $('#lblUser').css('display', 'unset')
            $('#lblUser').text(<string>$('#logLogin').val())
          } else {
            $('#log_server_error').text(data)
            $('#log_server_error').css('display', 'unset')
          }
        })
    }
  }
}