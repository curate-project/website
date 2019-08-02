window.onload = function () {
    const nameReg = /^[A-Za-z]+$/;
    const numberReg = /^[0-9]+$/;
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    let passwordHash = '';
    let email = '';
    let rememberMe = false; // TODO: Initialize

    $('#form-pass').on('input', function (e) {
        passwordHash = e.target.value;
        validateEntries();
        // TODO: Hash and store pword
    });

    $('#form-mail').on('input', function (e) {
        email = e.target.value;
        validateEntries();
    });

    $('#form-checkbox').on('change', function (e) {
        rememberMe = $('#form-checkbox').is(':checked');
    });

    $('#login-button').on('click', function (e) {
        e.preventDefault();
        
        if (validateEntries()) {
            login();
        }
    });

    function validateEntries() {
        let result = true;

        $('.form__input-error').remove();

        if (email.length > 0) {
            if (!emailReg.test(email)) {
                $('#form-mail').after('<span class="form__input-error">invalid e-mail</span>');
                result = false;
            }
        } else {
            result = false;
        }

        if (passwordHash.length == 0) 
        {
            result = false;
        }

        if (!result) {
            $('#login-button').addClass('disabled-btn');
        } else {
            $('#login-button').removeClass('disabled-btn');
        }

        return result;
    }

    function login() {
        // console.log('Account creation succeeded!');
        $('#login-button').blur();

        // TODO: Report error or save to storage if rememberMe 
        // if ($('#form-pass').val().length > 0) {
        //     if ($('#form-pass').val().length < 8) {
        //         $('#form-pass').after('<span class="form__input-error">invalid password</span>');
        //         result = false;
        //     }
        // } else {
        //     result = false;
        // }

        window.location = 'userAccount.html';
    }
}
