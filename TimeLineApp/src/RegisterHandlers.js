import * as $ from 'jquery';
export class RegisterHandlers {
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
//# sourceMappingURL=RegisterHandlers.js.map