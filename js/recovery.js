window.onload = function() {
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    let email = '';

    $('#form-mail').on('input', function (e) {
        email = e.target.value;
        validateEntries();
    });

    $('#reset-password').on('click', function (e) {
        e.preventDefault();
        
        if (validateEntries()) {
            resetPassword();
        }
    });

    function validateEntries() {
        let result = true;

        $('.form__input-error').remove();

        if (email.length > 0) {
            if (!emailReg.test(email)) {
                $('#form-mail').after('<span class="form__input-error">invalid e-mail</span>');
                $('#form-mail').addClass('input-error');
                result = false;
            } else {
                $('#form-mail').removeClass('input-error');
            }
        } else {
            result = false;
            $('#form-mail').removeClass('input-error');
        }

        if (!result) {
            $('#reset-password').addClass('disabled-btn');
        } else {
            $('#reset-password').removeClass('disabled-btn');
        }

        return result;
    }

    function resetPassword() {
        $('#reset-password').blur();
        $('#reset-password > i').removeClass('d-none');

        $.ajax({
            url: 'https://curate-user-service.herokuapp.com/recover',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                email: email
            }),
            success: function (data, textStatus) {
                // window.location = 'login.html';
                $('#reset-password').addClass('d-none');
                $('#email-sent').removeClass('d-none');
            },
            error: function (jqXhr, textStatus, errorThrown) {
                // console.log(errorThrown);
                // $('#form-email').after('<span class="form__input-error">invalid email</span>');
                $('#reset-password').addClass('d-none');
                $('#email-sent').removeClass('d-none');
            }
        });
    }
}